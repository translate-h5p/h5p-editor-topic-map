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
} from "../ArrowParts/ArrowParts";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowType } from "../../types/ArrowType";
import { Size } from "../../types/Size";

export type ArrowProps = {
  start: Position;
  end: Position;
  type: ArrowType;
  direction: ArrowDirection;
  cellSize: number;
  gapSize: number;
};

const directionClassNames = {
  [ArrowDirection.Up]: styles.pointUp,
  [ArrowDirection.Down]: styles.pointDown,
  [ArrowDirection.Left]: styles.pointLeft,
  [ArrowDirection.Right]: styles.pointRight,
} as const;

// TODO: Share code with h5p-topic-map instead of duplicating
export const Arrow: React.FC<ArrowProps> = ({
  start,
  end,
  type,
  direction,
  cellSize,
  gapSize,
}) => {
  const isHorizontal =
    direction === ArrowDirection.Left || direction === ArrowDirection.Right;

  const classNames = `${styles.arrow} ${directionClassNames[direction]}`;

  const transform = isHorizontal
    ? `translateY(-${gapSize / 2}px)`
    : `translateX(-${gapSize / 2}px)`;

  const style: Size = isHorizontal
    ? {
        width: Math.abs(end.x - start.x),
        height: cellSize + gapSize,
      }
    : {
        height: Math.abs(end.y - start.y),
        width: cellSize + gapSize,
      };

  let arrow: JSX.Element;
  switch (type) {
    case ArrowType.NonDirectional:
      arrow = (
        <div data-testid="ndArrow" className={classNames} style={style}>
          {isHorizontal ? <ArrowBody /> : <ArrowBodyVertical />}
        </div>
      );
      break;

    case ArrowType.BiDirectional:
      arrow = (
        <div data-testid="bdArrow" className={classNames} style={style}>
          {isHorizontal ? (
            <>
              <MirroredArrowHead />
              <ArrowBody />
              <ArrowHead />
            </>
          ) : (
            <>
              <MirroredArrowHeadVertical />
              <ArrowBodyVertical />
              <ArrowHeadVertical />
            </>
          )}
        </div>
      );
      break;

    case ArrowType.Directional:
      arrow = (
        <div data-testid="dArrow" className={classNames} style={style}>
          {isHorizontal ? (
            <>
              <ArrowBody />
              <ArrowHead />
            </>
          ) : (
            <>
              <ArrowBodyVertical />
              <ArrowHeadVertical />
            </>
          )}
        </div>
      );
  }

  // Apply shadow around arrow
  return (
    <div className={styles.shadow} style={{ transform }}>
      {arrow}
    </div>
  );
};
