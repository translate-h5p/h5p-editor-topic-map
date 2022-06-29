import type { H5PField, H5PForm } from "h5p-types";
import { H5PEditor } from "h5p-utils";
import * as React from "react";
import { t } from "../../H5P/H5P.util";
import { Params } from "../../types/Params";
import styles from "./SemanticsForm.module.scss";

export type SemanticsFormProps = {
  fields: Array<H5PField>;
  params: Params;
  parent: H5PForm;
  onSave: (params: Params) => void;
  formClassName?: string;
};

export const SemanticsForm: React.FC<SemanticsFormProps> = ({
  fields,
  params,
  parent,
  formClassName,
  onSave,
}) => {
  const generatedFormRef = React.useRef<HTMLDivElement>(null);
  const saveLabel = t("semantics-form_save");
  const [hasRendered, setHasRendered] = React.useState(false);

  React.useEffect(() => {
    setHasRendered(true);
  }, []);

  React.useEffect(() => {
    if (!generatedFormRef.current || hasRendered) {
      return;
    }

    const $wrapper = H5PEditor.$(generatedFormRef.current);
    H5PEditor.processSemanticsChunk(fields, params, $wrapper, parent);
  }, [fields, params, parent, generatedFormRef, hasRendered]);

  return (
    <form
      className={`${formClassName} h5peditor`}
      onSubmit={event => event.preventDefault()}
    >
      <div ref={generatedFormRef} />
      <button
        type="button"
        className={styles.saveButton}
        onClick={() => onSave(params)}
      >
        {saveLabel}
      </button>
    </form>
  );
};
