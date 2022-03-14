import { GridDimensions } from "../../components/Grid/Grid";
import { ArrowItemType } from "../ArrowItemType";
import { ColorTheme } from "../ColorTheme";
import { TopicMapItemType } from "../TopicMapItemType";
import { Image } from "./Image";

export type Params = {
  topicMapItems?: Array<TopicMapItemType>;
  arrowItems?: Array<ArrowItemType>;
  ArrowItems?: Array<ArrowItemType>;
  gridBackgroundImage?: Image;
  colorTheme?: ColorTheme;
  grid?: GridDimensions;
};
