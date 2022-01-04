import { ArrowType } from "./ArrowType";
import { ArrowDirection } from "./ArrowDirection";
import { CommonItemType } from "./CommonItemType";

export type ArrowItemType = CommonItemType & {
  /** The direction of the arrow's head */
  arrowDirection: ArrowDirection;

  /** The arrow type */
  arrowType: ArrowType;
};
