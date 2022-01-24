import { Appearance } from "../Appearance";
import { ArrowItemType } from "../ArrowItemType";
import { TopicMapItemType } from "../TopicMapItemType";

export type Params = {
  topicMapItems?: Array<TopicMapItemType>;
  arrowItems?: Array<ArrowItemType>;
  appearance?: Appearance;
};
