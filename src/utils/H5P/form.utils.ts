import { H5PEditor } from "../../h5p/H5P.util";
import { H5PField } from "../../types/h5p/H5PField";

export const getTopicMapField = (semantics: H5PField): H5PField | null => {
  if (!H5PEditor.findSemanticsField) {
    return null;
  }

  const topicMapField = H5PEditor.findSemanticsField(
    "topicMapItems",
    semantics,
  );

  if (!topicMapField) {
    throw new Error("Could not find the `topicMapItems` field");
  }

  if (Array.isArray(topicMapField)) {
    console.error("`topicMapField` is an array", topicMapField);
    return topicMapField[0];
  }

  return topicMapField;
};
