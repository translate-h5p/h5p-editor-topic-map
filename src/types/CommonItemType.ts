import type { Image } from "h5p-types";
import { DialogContent } from "./DialogContent";

export type CommonItemType = {
  id: string;
  label: string;

  description?: string;
  topicImage?: Image;
  topicImageAltText?: string;

  dialog?: DialogContent;
};
