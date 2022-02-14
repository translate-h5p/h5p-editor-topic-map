import { Appearance } from "../Appearance";
import { ArrowItemType } from "../ArrowItemType";
import { TopicMapItemType } from "../TopicMapItemType";
import { Image } from "./Image";

export type Params = {
  topicMapItems?: Array<TopicMapItemType>;
  arrowItems?: Array<ArrowItemType>;
  gridBackgroundImage?: Image;
  appearance?: Appearance;
};
