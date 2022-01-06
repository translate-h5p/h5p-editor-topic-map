import * as React from "react";
import { Position } from "../../types/Position";
import styles from "./Arrow.module.scss";
import {
  ArrowBody,
  ArrowHead,
  ArrowBodyVertical,
  MirroredArrowHead,
  ArrowHeadVertical,
  MirroredArrowHeadVertical,
} from "./ArrowParts";
import { ArrowDirection, ArrowType } from "./Utils";

export type ArrowProps = {
  start: Position;
  end: Position;
  type: ArrowType;
  direction: ArrowDirection;
};

// TODO: Share code with h5p-topic-map instead of duplicating
export const Arrow: React.FC<ArrowProps> = ({
  start,
  end,
  type,
  direction,
}) => {
  let classNames = `${styles.arrow} `;
  let length;

  switch (direction) {
    case ArrowDirection.Up:
      length = { height: Math.abs(end.y - start.y) };
      classNames += styles.pointUp;
      break;
    case ArrowDirection.Down:
      length = { height: Math.abs(end.y - start.y) };
      classNames += styles.pointDown;
      break;
    case ArrowDirection.Left:
      length = { width: Math.abs(end.x - start.x) };
      classNames += styles.pointLeft;
      break;
    case ArrowDirection.Right:
      length = { width: Math.abs(end.x - start.x) };
      classNames += styles.pointRight;
      break;
  }

  const isVertical =
    direction === ArrowDirection.Up || direction === ArrowDirection.Down;
  const isHorizontal =
    direction === ArrowDirection.Left || direction === ArrowDirection.Right;

  let arrow;
  switch (type) {
    case ArrowType.NonDirectional:
      arrow = (
        <div data-testid="ndArrow" className={classNames} style={length}>
          {isVertical && <ArrowBodyVertical />}
          {isHorizontal && <ArrowBody />}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div data-testid="bdArrow" className={classNames} style={length}>
          {isVertical && (
            <>
              <MirroredArrowHeadVertical />
              <ArrowBodyVertical />
              <ArrowHeadVertical />
            </>
          )}
          {isHorizontal && (
            <>
              <MirroredArrowHead />
              <ArrowBody />
              <ArrowHead />
            </>
          )}
        </div>
      );
      break;
    case ArrowType.Directional:
      arrow = (
        <div data-testid="dArrow" className={classNames} style={length}>
          {isVertical && (
            <>
              <ArrowBodyVertical />
              <ArrowHeadVertical />
            </>
          )}
          {isHorizontal && (
            <>
              <ArrowBody />
              <ArrowHead />
            </>
          )}
        </div>
      );
  }

  // apply shadow around arrow
  arrow = <div className={styles.shadow}>{arrow}</div>;

  return arrow;
};
