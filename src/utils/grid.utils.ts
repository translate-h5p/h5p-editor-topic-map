import { Position } from "../types/Position";
import { Size } from "../types/Size";
import { TopicMapItem } from "../types/TopicMapItem";

export const resizeItem = (
  item: TopicMapItem,
  scaleFactor: number,
): TopicMapItem => {
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
  items: Array<TopicMapItem>,
  scaleFactor: number,
): Array<TopicMapItem> => items.map(item => resizeItem(item, scaleFactor));

export const calculateXPercentage = (xPx: number, width: number): number => {
  return (xPx / width) * 100;
};

export const calculateYPercentage = (yPx: number, height: number): number => {
  return (yPx / height) * 100;
};

export const updateItem = (
  items: Array<TopicMapItem>,
  updatedItem: TopicMapItem,
  width: number,
  height: number,
  { newPosition, newSize }: { newPosition?: Position; newSize?: Size },
): Array<TopicMapItem> => {
  const newItems = items.map((item: TopicMapItem) => {
    const isCorrectItem = item.id === updatedItem.id;

    if (!isCorrectItem) {
      return item;
    }

    const newItem: TopicMapItem = {
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
