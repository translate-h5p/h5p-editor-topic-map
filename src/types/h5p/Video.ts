import { Copyright } from "./Copyright";

export type Video = {
  path: string;
  mime?: string;
  copyright?: Copyright;
};
