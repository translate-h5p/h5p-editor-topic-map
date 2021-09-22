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
