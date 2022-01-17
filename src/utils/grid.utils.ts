import { v4 as uuidV4 } from "uuid";
import { ArrowDirection } from "../types/ArrowDirection";
import { ArrowItemType } from "../types/ArrowItemType";
import { ArrowType } from "../types/ArrowType";
import { Cell } from "../types/Cell";
import { Element } from "../types/Element";
import { OccupiedCell } from "../types/OccupiedCell";
import { Position } from "../types/Position";
import { Size } from "../types/Size";
import { TopicMapItemType } from "../types/TopicMapItemType";
import { arraysHaveSomeOverlap } from "./array.utils";

export const resizeItem = (
  item: TopicMapItemType,
  scaleFactor: number,
): TopicMapItemType => {
  const resizedItem = {
    ...item,
    heightPercentage: item.heightPercentage * scaleFactor,
    widthPercentage: item.widthPercentage * scaleFactor,
    xPercentagePosition: item.xPercentagePosition * scaleFactor,
    yPercentagePosition: item.yPercentagePosition * scaleFactor,
  };

  return resizedItem;
};

export const resizeItems = (
  items: Array<TopicMapItemType>,
  scaleFactor: number,
): Array<TopicMapItemType> => items.map(item => resizeItem(item, scaleFactor));

export const calculateXPercentage = (xPx: number, width: number): number => {
  return (xPx / width) * 100;
};

export const calculateYPercentage = (yPx: number, height: number): number => {
  return (yPx / height) * 100;
};

export const updateItem = (
  items: Array<TopicMapItemType>,
  updatedItem: TopicMapItemType,
  width: number,
  height: number,
  { newPosition, newSize }: { newPosition?: Position; newSize?: Size },
): Array<TopicMapItemType> => {
  const newItems = items.map((item: TopicMapItemType) => {
    const isCorrectItem = item.id === updatedItem.id;

    if (!isCorrectItem) {
      return item;
    }

    const newItem: TopicMapItemType = {
      ...item,
    };

    if (newPosition) {
      newItem.xPercentagePosition = calculateXPercentage(newPosition.x, width);
      newItem.yPercentagePosition = calculateYPercentage(newPosition.y, height);
    }

    if (newSize) {
      newItem.widthPercentage = calculateXPercentage(newSize.width, width);
      newItem.heightPercentage = calculateYPercentage(newSize.height, height);
    }

    return newItem;
  });

  return newItems;
};

export const updateArrowItem = (
  items: Array<ArrowItemType>,
  updatedItem: ArrowItemType,
  width: number,
  height: number,
  { newPosition, newSize }: { newPosition?: Position; newSize?: Size },
  type?: ArrowType,
): Array<ArrowItemType> => {
  const newItems = items.map((item: ArrowItemType) => {
    const isCorrectItem = item.id === updatedItem.id;

    if (!isCorrectItem) {
      return item;
    }

    const newItem: ArrowItemType = {
      ...item,
    };

    if (type != null) {
      newItem.arrowType = type;
    }

    if (newPosition) {
      newItem.xPercentagePosition = calculateXPercentage(newPosition.x, width);
      newItem.yPercentagePosition = calculateYPercentage(newPosition.y, height);
    }

    if (newSize) {
      newItem.widthPercentage = calculateXPercentage(newSize.width, width);
      newItem.heightPercentage = calculateYPercentage(newSize.height, height);
    }

    return newItem;
  });

  return newItems;
};

export const getAllCells = (
  gridWidth: number,
  gridHeight: number,
  gapSize: number,
  cellSize: number,
): Array<Cell> => {
  const cells: Array<Cell> = [];

  const stepSize = gapSize + cellSize;
  let currentIndex = 0;

  for (let y = 0; y < gridHeight; y += stepSize) {
    for (let x = 0; x < gridWidth; x += stepSize) {
      cells.push({
        x,
        y,
        index: currentIndex,
      });

      currentIndex += 1;
    }
  }

  return cells;
};

export const cellIsOccupiedByElement = (
  elementPosition: Position,
  elementSize: Size,
  cellPosition: Position,
): boolean =>
  cellPosition.x >= elementPosition.x &&
  cellPosition.x <= elementPosition.x + elementSize.width &&
  cellPosition.y >= elementPosition.y &&
  cellPosition.y <= elementPosition.y + elementSize.height;

export const findCellsElementOccupies = (
  { id, type, position, size }: Element,
  gridWidth: number,
  gridHeight: number,
  gapSize: number,
  cellSize: number,
): Array<OccupiedCell> => {
  const allCells = getAllCells(gridWidth, gridHeight, gapSize, cellSize);

  const occupiedCells = allCells
    .filter(cell => cellIsOccupiedByElement(position, size, cell))
    .map(({ x, y, index }) => ({
      occupiedById: id,
      occupiedByType: type,
      x,
      y,
      index,
    }));

  return occupiedCells;
};

export const findOccupiedCells = (
  elements: Array<Element>,
  gridWidth: number,
  gridHeight: number,
  gapSize: number,
  cellSize: number,
): Array<OccupiedCell> => {
  const occupiedCells: Array<OccupiedCell> = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const element of elements) {
    occupiedCells.push(
      ...findCellsElementOccupies(
        element,
        gridWidth,
        gridHeight,
        gapSize,
        cellSize,
      ),
    );
  }

  return occupiedCells;
};

export const scaleX = (xPercentage: number, gridWidth: number): number =>
  (gridWidth * xPercentage) / 100;

export const scaleY = (yPercentage: number, height: number): number =>
  (height * yPercentage) / 100;

export const mapTopicMapItemToElement = (
  item: TopicMapItemType,
  gridSize: Size,
): Element => ({
  id: item.id,
  type: "item",
  position: {
    x: scaleX(item.xPercentagePosition, gridSize.width),
    y: scaleY(item.yPercentagePosition, gridSize.height),
  },
  size: {
    width: scaleX(item.widthPercentage, gridSize.width),
    height: scaleY(item.heightPercentage, gridSize.height),
  },
});

export const positionIsFree = (
  newPosition: Position,
  elementId: string,
  elementSize: Size,
  gridSize: Size,
  gapSize: number,
  cellSize: number,
  occupiedCells: Array<OccupiedCell>,
): boolean => {
  const cellsThisElementWillOccupy = findCellsElementOccupies(
    {
      id: elementId,
      type: "item",
      position: newPosition,
      size: elementSize,
    },
    gridSize.width,
    gridSize.height,
    gapSize,
    cellSize,
  );

  const cellsOccupiedByOtherElements = occupiedCells.filter(
    cell => cell.occupiedById !== elementId,
  );

  const posIsFree = !arraysHaveSomeOverlap(
    cellsOccupiedByOtherElements,
    cellsThisElementWillOccupy,
  );

  return posIsFree;
};

export const coordinatePosToPx = (
  coordinate: number,
  gapSize: number,
  cellSize: number,
): number => {
  const stepSize = gapSize + cellSize;

  return coordinate * stepSize;
};

export const coordinateSizeToPx = (
  coordinate: number,
  gapSize: number,
  cellSize: number,
): number => {
  return coordinate * cellSize + (coordinate - 1) * gapSize;
};

export const isDraggingLeft = (
  indicatorIndex: number,
  boxStartPosition: number,
  numberOfColumns: number,
): boolean =>
  boxStartPosition % numberOfColumns >= indicatorIndex % numberOfColumns;

export const isDraggingUp = (
  indicatorIndex: number,
  boxStartPosition: number,
  numberOfColumns: number,
  numberOfRows: number,
): boolean =>
  (Math.floor(boxStartPosition / numberOfColumns) / numberOfRows) * 100 >=
  (Math.floor(indicatorIndex / numberOfColumns) / numberOfRows) * 100;

export const findWidthPercentage = (
  onlyScaleVertically: boolean,
  leftHandle: boolean,
  dragLeft: boolean,
  existingItem: TopicMapItemType,
  xPercentagePosition: number,
  xEndPercentagePosition: number,
): number => {
  if (onlyScaleVertically) {
    return existingItem.widthPercentage;
  }
  if (leftHandle && !dragLeft) {
    return (
      existingItem.widthPercentage -
      (xPercentagePosition - existingItem.xPercentagePosition)
    );
  }
  if (leftHandle && dragLeft) {
    return (
      existingItem.widthPercentage +
      (existingItem.xPercentagePosition - xPercentagePosition)
    );
  }
  return xEndPercentagePosition - xPercentagePosition;
};

export const findHeightPercentage = (
  onlyScaleHorizontally: boolean,
  topHandle: boolean,
  dragUp: boolean,
  existingItem: TopicMapItemType,
  yPercentagePosition: number,
  yEndPercentagePosition: number,
): number => {
  if (onlyScaleHorizontally) {
    return existingItem.heightPercentage;
  }
  if (topHandle && dragUp) {
    return (
      existingItem.heightPercentage +
      (existingItem.yPercentagePosition - yPercentagePosition)
    );
  }
  if (topHandle && !dragUp) {
    return (
      existingItem.heightPercentage -
      (yPercentagePosition - existingItem.yPercentagePosition)
    );
  }
  return yEndPercentagePosition - yPercentagePosition;
};

export const createTopicMapItem = (): TopicMapItemType => {
  const id = uuidV4();

  // backgroundImage is intentionally set to undefined here
  // to correctly make the image field empty on item creation
  const item: TopicMapItemType = {
    id,
    xPercentagePosition: 0,
    yPercentagePosition: 0,
    widthPercentage: 0,
    heightPercentage: 0,
    backgroundImage: undefined,
    label: "",
    description: "",
  };

  return item;
};

export const createArrowItem = (
  arrowHeadDirection: ArrowDirection,
): ArrowItemType => {
  const id = uuidV4();

  const item: ArrowItemType = {
    id,
    xPercentagePosition: 0,
    yPercentagePosition: 0,
    widthPercentage: 0,
    heightPercentage: 0,
    arrowDirection: arrowHeadDirection,
    arrowType: ArrowType.Directional,
  };

  return item;
};

export const getArrowDirection = (
  dragLeft: boolean,
  dragUp: boolean,
  horizontal: boolean,
): ArrowDirection => {
  if (dragLeft && horizontal) {
    return ArrowDirection.Left;
  }
  if (dragUp && !horizontal) {
    return ArrowDirection.Up;
  }
  if (!dragUp && !horizontal) {
    return ArrowDirection.Down;
  }
  return ArrowDirection.Right;
};

export const findItem = (
  id: string,
  items: Array<TopicMapItemType>,
): TopicMapItemType | null => {
  if (!id) {
    return null;
  }

  return items.find(item => item.id === id) ?? null;
};
