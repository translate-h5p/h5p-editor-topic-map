import * as React from "react";
import { H5PEditor } from "../../h5p/H5P.util";
import { H5PField } from "../../types/h5p/H5PField";
import { Params } from "../../types/h5p/Params";

export type SemanticsFormProps = {
  field: Array<H5PField>;
  params: Params;
  parent: H5PField;
};

export const SemanticsForm: React.FC<SemanticsFormProps> = ({
  field,
  params,
  parent,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const $wrapper = H5PEditor.$(wrapperRef.current);
    H5PEditor.processSemanticsChunk(field, params, $wrapper, parent);
  }, [field, params, parent, wrapperRef]);

  return <div ref={wrapperRef} />;
};
