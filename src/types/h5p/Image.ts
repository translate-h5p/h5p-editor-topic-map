import { Copyright } from "./Copyright";

export type Image = {
  path: string;
  alt?: string | undefined;
  copyright?: Copyright;
  height?: number;
  width?: number;
  mime?: string;
};
