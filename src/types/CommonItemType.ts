import { DialogContent } from "./DialogContent";
import { Image } from "./h5p/Image";

export type CommonItemType = {
  id: string;

  description?: string;
  topicImage?: Image;

  /** The x position as a percentage of the container's width */
  xPercentagePosition: number;

  /** The y position as a percentage of the container's height */
  yPercentagePosition: number;

  /** The width as a percentage of the container's width */
  widthPercentage: number;

  /** The height as a percentage of the container's height */
  heightPercentage: number;

  dialog?: DialogContent;
};
