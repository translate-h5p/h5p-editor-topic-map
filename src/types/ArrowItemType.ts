import { ArrowType } from "./ArrowType";
import { CommonItemType } from "./CommonItemType";

export type ArrowItemType = CommonItemType & {
  /**
   * This index is used for manually sort the items' tab order
   * Arrow item indeces will only be set by the program - not the user
   */
  index?: number;

  /** The arrow type */
  arrowType: ArrowType;

  startElementId: string;
  endElementId: string;
};
