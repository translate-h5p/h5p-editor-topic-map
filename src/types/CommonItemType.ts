import { Image } from "./h5p/Image";

export type CommonItemType = {
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
  description?: string | undefined;
  backgroundImage?: Image | undefined;
  dialog?: {
    links?: Array<string> | undefined;
    text?: string;
    video?: unknown;
  };
};
