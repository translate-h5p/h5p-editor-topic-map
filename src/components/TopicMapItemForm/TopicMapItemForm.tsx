import * as React from "react";
import { H5PField } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";
import { getTopicMapField } from "../../utils/H5P/form.utils";
import { SemanticsForm } from "../SemanticsForm/SemanticsForm";

export type TopicMapItemFormProps = {
  semantics: H5PField;
  params: Params;
  parent: H5PForm;
};

export const TopicMapItemForm: React.FC<TopicMapItemFormProps> = ({
  semantics,
  params,
  parent,
}) => {
  const [topicMapField, setTopicMapField] = React.useState<H5PField | null>();

  React.useEffect(() => {
    setTopicMapField(getTopicMapField(semantics));
  }, [semantics]);

  return topicMapField ? (
    <SemanticsForm field={[topicMapField]} params={params} parent={parent} />
  ) : null;
};
