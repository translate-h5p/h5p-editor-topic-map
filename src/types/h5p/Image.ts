import { Media } from "./Media";

export type Image = Media & {
  height?: number;
  width?: number;
};
