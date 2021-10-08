import { Image } from "./h5p/Image";

export type TopicMapItemType = {
  id: string;

  /** The x position as a percentage of the container's width */
  xPercentagePosition: number;

  /** The y position as a percentage of the container's height */
  yPercentagePosition: number;

  /** The width as a percentage of the container's width */
  widthPercentage: number;

  /** The height as a percentage of the container's height */
  heightPercentage: number;

  label: string;
  backgroundImage?: Image | undefined;
  links: Array<string>;
};
