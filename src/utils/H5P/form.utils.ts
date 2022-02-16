import { H5PEditor } from "../../H5P/H5P.util";
import {
  H5PField,
  H5PFieldGroup,
  H5PFieldImage,
} from "../../types/H5P/H5PField";
import { Params } from "../../types/H5P/Params";

const getSingleField = <Type extends H5PField>(
  fieldName: string,
  semantics: H5PFieldGroup,
): Type | null => {
  if (!H5PEditor.findSemanticsField) {
    return null;
  }

  const field = H5PEditor.findSemanticsField(
    fieldName,
    semantics,
  ) as Type | null;

  if (!field) {
    throw new Error(`Could not find the \`${fieldName}\` field`);
  }

  if (Array.isArray(field)) {
    console.error(
      `\`${fieldName}\` is an array, which means that more than one field with the name was found.`,
      field,
    );
    return field[0];
  }

  return field;
};

export const getTopicMapItemsField = (
  semantics: H5PFieldGroup,
): H5PField | null => getSingleField("topicMapItems", semantics);

export const getArrowItemsField = (semantics: H5PFieldGroup): H5PField | null =>
  getSingleField("arrowItems", semantics);

export const getBackgroundImageField = (
  semantics: H5PFieldGroup,
): H5PFieldImage | null =>
  getSingleField<H5PFieldImage>("gridBackgroundImage", semantics);

export const getEmptyParams = (): Params => {
  return {
    topicMapItems: [],
    arrowItems: [],
  };
};

export const fillInMissingParamsProperties = (
  partialParams: Partial<Params>,
): Params => {
  return {
    ...getEmptyParams(),
    ...partialParams,
  };
};
