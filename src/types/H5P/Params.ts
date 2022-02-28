import { ArrowItemType } from "../ArrowItemType";
import { ColorTheme } from "../ColorTheme";
import { ClassicArrowItemType } from "../ClassicArrowItemType";
import { TopicMapItemType } from "../TopicMapItemType";
import { Image } from "./Image";

export type Params = {
  topicMapItems?: Array<TopicMapItemType>;
  arrowItems?: Array<ArrowItemType>;
  classicArrowItems?: Array<ClassicArrowItemType>;
  gridBackgroundImage?: Image;
  colorTheme?: ColorTheme;
};
