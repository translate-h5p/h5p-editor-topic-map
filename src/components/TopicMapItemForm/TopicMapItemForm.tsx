import * as React from "react";
import { H5PField } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";
import { getTopicMapField } from "../../utils/H5P/form.utils";
import { SemanticsForm } from "../SemanticsForm/SemanticsForm";
import "./TopicMapItemForm.scss";

export type TopicMapItemFormProps = {
  semantics: H5PField;
  params: Params;
  parent: H5PForm;
  itemId: string;
  onSave: (params: Params) => void;
};

export const TopicMapItemForm: React.FC<TopicMapItemFormProps> = ({
  semantics,
  params,
  parent,
  itemId,
  onSave,
}) => {
  const [topicMapField, setTopicMapField] = React.useState<H5PField | null>();
  const [formParams, setFormParams] = React.useState<Params>();

  React.useEffect(() => {
    const field = getTopicMapField(semantics);
    setTopicMapField(field);

    setFormParams({
      ...params,
      topicMapItems: params.topicMapItems.filter(item => item.id === itemId),
    });
  }, [itemId, params, semantics]);

  const onUpdate = React.useCallback(
    (newParams: Params) => {
      const updatedItem = newParams.topicMapItems[0];
      onSave({
        ...newParams,
        topicMapItems: params.topicMapItems.map(item => {
          const isUpdatedItem = item.id === updatedItem.id;
          if (isUpdatedItem) {
            return updatedItem;
          }

          return item;
        }),
      });
    },
    [onSave, params.topicMapItems],
  );

  return formParams && topicMapField ? (
    <SemanticsForm
      fields={[topicMapField]}
      params={formParams}
      parent={parent}
      onSave={onUpdate}
      formClassName="topic-map-item-form"
    />
  ) : null;
};
