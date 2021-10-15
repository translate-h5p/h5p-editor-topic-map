import * as React from "react";
import { H5PEditor, t } from "../../h5p/H5P.util";
import { H5PField } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";

export type SemanticsFormProps = {
  fields: Array<H5PField>;
  params: Params;
  parent: H5PForm;
  formClassName?: string;
  onSave: (params: Params) => void;
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

  React.useEffect(() => {
    if (!generatedFormRef.current) {
      return;
    }

    const $wrapper = H5PEditor.$(generatedFormRef.current);
    H5PEditor.processSemanticsChunk(fields, params, $wrapper, parent);
  }, [fields, params, parent, generatedFormRef]);

  return (
    <form className={formClassName}>
      <div ref={generatedFormRef} />
      <button type="button" onClick={() => onSave(params)}>
        {saveLabel}
      </button>
    </form>
  );
};
