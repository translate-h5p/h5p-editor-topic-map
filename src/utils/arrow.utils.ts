import { ArrowItemType } from "../types/ArrowItemType";
import { ArrowType } from "../types/ArrowType";
import { ClassicArrowItemType } from "../types/ClassicArrowItemType";
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

export const updateClassicArrowType = (
  items: Array<ClassicArrowItemType>,
  updatedItem: ClassicArrowItemType,
  arrowType: ArrowType,
  topicMapItems: Array<TopicMapItemType>,
): Array<ClassicArrowItemType> => {
  const newItems = items.map((item: ClassicArrowItemType) => {
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

    const newItem: ClassicArrowItemType = {
      ...item,
      arrowType,
      label,
    };

    return newItem;
  });

  return newItems;
};

export const xAdjustmentStart = (
  item: ClassicArrowItemType,
  isHorizontal: boolean,
): number => {
  if (item.arrowType === ArrowType.BiDirectional) {
    if (isHorizontal && item.startGridPosition.x <= item.endGridPosition.x) {
      return 0.5;
    }

    if (isHorizontal) {
      return -1.5;
    }
  }
  return -0.5;
};

export const yAdjustmentStart = (
  item: ClassicArrowItemType,
  isHorizontal: boolean,
): number => {
  if (item.arrowType === ArrowType.BiDirectional) {
    if (!isHorizontal && item.startGridPosition.y <= item.endGridPosition.y) {
      return 0.5;
    }
    if (!isHorizontal) {
      return -1.75;
    }
  }
  return -0.5;
};

export const xAdjustmentEnd = (
  item: ClassicArrowItemType,
  isHorizontal: boolean,
): number => {
  if (
    item.arrowType === ArrowType.Directional ||
    item.arrowType === ArrowType.BiDirectional
  ) {
    if (isHorizontal && item.startGridPosition.x <= item.endGridPosition.x) {
      return -1.75;
    }

    if (isHorizontal) {
      return 0.5;
    }

    return -0.5;
  }

  if (item.arrowType === ArrowType.NonDirectional) {
    if (isHorizontal && item.startGridPosition.x <= item.endGridPosition.x) {
      return -0.5;
    }

    if (isHorizontal) {
      return -0.5;
    }

    return -0.5;
  }
  return 0;
};

export const yAdjustmentEnd = (
  item: ClassicArrowItemType,
  isHorizontal: boolean,
): number => {
  if (
    item.arrowType === ArrowType.Directional ||
    item.arrowType === ArrowType.BiDirectional
  ) {
    if (isHorizontal) {
      return -0.5;
    }
    if (item.startGridPosition.y <= item.endGridPosition.y) {
      return -1.75;
    }
    return 0.5;
  }

  if (item.arrowType === ArrowType.NonDirectional) {
    if (!isHorizontal && item.startGridPosition.y <= item.endGridPosition.y) {
      return -0.5;
    }

    if (!isHorizontal) {
      return -0.5;
    }

    return -0.5;
  }
  return 0;
};
