import { ArrowItemType } from "../types/ArrowItemType";
import { ArrowType } from "../types/ArrowType";
import { TopicMapItemType } from "../types/TopicMapItemType";
import { findItem } from "./grid.utils";

const arrowLabelJoins: Record<ArrowType, string> = {
  [ArrowType.BiDirectional]: "↔",
  [ArrowType.Directional]: "⟶",
  [ArrowType.NonDirectional]: "―",
} as const;

export const getLabel = (
  startItemId: string,
  endItemId: string,
  arrowType: ArrowType,
  items: Array<TopicMapItemType>,
): string => {
  const startItem = findItem(startItemId, items);
  const endItem = findItem(endItemId, items);

  if (!startItem) {
    throw new Error("Start item not found");
  }
  if (!endItem) {
    throw new Error("End item not found");
  }

  return `${startItem.label} ${arrowLabelJoins[arrowType]} ${endItem.label}`;
};

export const updateArrowType = (
  items: Array<ArrowItemType>,
  updatedItem: ArrowItemType,
  arrowType: ArrowType,
  topicMapItems: Array<TopicMapItemType>,
): Array<ArrowItemType> => {
  const newItems = items.map((item: ArrowItemType) => {
    const isCorrectItem = item.id === updatedItem.id;

    if (!isCorrectItem) {
      return item;
    }

    const label = getLabel(
      item.startElementId,
      item.endElementId,
      arrowType,
      topicMapItems,
    );

    const newItem: ArrowItemType = {
      ...item,
      arrowType,
      label,
    };

    return newItem;
  });

  return newItems;
};
