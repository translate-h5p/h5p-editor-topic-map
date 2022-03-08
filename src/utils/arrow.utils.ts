/* eslint-disable no-debugger */
import { ArrowItemType } from "../types/ArrowItemType";
import { ArrowType } from "../types/ArrowType";
import { ClassicArrowItemType } from "../types/ClassicArrowItemType";
import { Position } from "../types/Position";
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

export const updateArrowLabels = (
  items: Array<ArrowItemType>,
  topicMapItems: Array<TopicMapItemType>,
): Array<ArrowItemType> => {
  const newItems = items.map((item: ArrowItemType) => {
    const startItem = findItem(item.startElementId, topicMapItems);
    const endItem = findItem(item.endElementId, topicMapItems);

    if (!startItem || !endItem) {
      return item;
    }

    const label = getLabel(
      startItem.id,
      endItem.id,
      item.arrowType,
      topicMapItems,
    );

    const newItem: ArrowItemType = {
      ...item,
      label,
    };

    return newItem;
  });

  return newItems;
};

export const calculateIsHorizontal = (
  startPosition: Position,
  endPosition: Position,
): boolean => {
  return (
    Math.abs(startPosition.x - endPosition.x) >
    Math.abs(startPosition.y - endPosition.y)
  );
};

export const xAdjustmentStart = (
  item: {
    arrowType: ArrowType;
    startGridPosition: Position;
    endGridPosition: Position;
  },
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
  item: {
    arrowType: ArrowType;
    startGridPosition: Position;
    endGridPosition: Position;
  },
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
  item: {
    arrowType: ArrowType;
    startGridPosition: Position;
    endGridPosition: Position;
  },
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
  item: {
    arrowType: ArrowType;
    startGridPosition: Position;
    endGridPosition: Position;
  },
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

export const adjustArrowStartPosition = (
  startPosition: Position,
  endPosition: Position,
  arrowType: ArrowType,
): Position => {
  const isHorizontal = calculateIsHorizontal(startPosition, endPosition);

  return {
    x:
      startPosition.x +
      xAdjustmentStart(
        {
          arrowType,
          startGridPosition: startPosition,
          endGridPosition: endPosition,
        },
        isHorizontal,
      ),
    y:
      startPosition.y +
      yAdjustmentStart(
        {
          arrowType,
          startGridPosition: startPosition,
          endGridPosition: endPosition,
        },
        isHorizontal,
      ),
  } as Position;
};

export const adjustArrowEndPosition = (
  startPosition: Position,
  endPosition: Position,
  arrowType: ArrowType,
): Position => {
  const isHorizontal = calculateIsHorizontal(startPosition, endPosition);

  return {
    x:
      endPosition.x +
      xAdjustmentEnd(
        {
          arrowType,
          startGridPosition: startPosition,
          endGridPosition: endPosition,
        },
        isHorizontal,
      ),
    y:
      endPosition.y +
      yAdjustmentEnd(
        {
          arrowType,
          startGridPosition: startPosition,
          endGridPosition: endPosition,
        },
        isHorizontal,
      ),
  } as Position;
};
