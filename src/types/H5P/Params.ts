import { ArrowItemType } from "../ArrowItemType";
import { ColorTheme } from "../ColorTheme";
import { TopicMapItemType } from "../TopicMapItemType";
import { Image } from "./Image";

export type Params = {
  topicMapItems?: Array<TopicMapItemType>;
  arrowItems?: Array<ArrowItemType>;
  gridBackgroundImage?: Image;
  colorTheme?: ColorTheme;
};
