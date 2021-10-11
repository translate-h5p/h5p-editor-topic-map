import * as React from "react";
import { H5PEditor } from "../../h5p/H5P.util";
import { H5PField } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";
import styles from "./SemanticsForm.module.scss";

export type SemanticsFormProps = {
  fields: Array<H5PField>;
  params: Params;
  parent: H5PForm;
};

export const SemanticsForm: React.FC<SemanticsFormProps> = ({
  fields,
  params,
  parent,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const $wrapper = H5PEditor.$(wrapperRef.current);
    H5PEditor.processSemanticsChunk(fields, params, $wrapper, parent);
  }, [fields, params, parent, wrapperRef]);

  return <div className={styles.wrapper} ref={wrapperRef} />;
};
