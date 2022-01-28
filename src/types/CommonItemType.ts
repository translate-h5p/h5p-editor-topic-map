import { DialogContent } from "./DialogContent";
import { Image } from "./H5P/Image";

export type CommonItemType = {
  id: string;
  label: string;

  description?: string;
  topicImage?: Image;

  dialog?: DialogContent;
};
