import * as React from "react";
import styles from "./SemanticsForm.module.scss";
import { H5PEditor, t } from "../../h5p/H5P.util";
import { H5PField } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";

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
