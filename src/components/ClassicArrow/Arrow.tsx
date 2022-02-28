/* eslint-disable no-nested-ternary */
import * as React from "react";
import styles from "./Arrow.module.scss";
import { ClassicArrowItemType } from "../../types/ClassicArrowItemType";

export type ClassicArrowProps = {
  cellSize: number;
  gapSize: number;
  item: ClassicArrowItemType;
};

// TODO: Share code with h5p-topic-map instead of duplicating
export const ClassicArrow: React.FC<ClassicArrowProps> = ({
  item,
  cellSize,
  gapSize,
}) => {
  const isHorizontal =
    Math.abs(item.startPosition.x - item.endPosition.x) >
    Math.abs(item.startPosition.y - item.endPosition.y);

  const transform = isHorizontal
    ? `translateY(-${gapSize / 2}px)`
    : `translateX(-${gapSize / 2}px)`;

  const startPos = {
    x: (item.startGridPosition.x - 0.5) * (cellSize + gapSize),
    y: (item.startGridPosition.y - 0.5) * (cellSize + gapSize),
  };

  const xAdjust =
    isHorizontal && item.startGridPosition.x <= item.endGridPosition.x
      ? -1.75
      : isHorizontal
      ? 0.5
      : -0.5;

  const yAdjust = isHorizontal
    ? -0.5
    : item.startGridPosition.y <= item.endGridPosition.y
    ? -1.75
    : 0.5;
  const endPos = {
    x: (item.endGridPosition.x + xAdjust) * (cellSize + gapSize),
    y: (item.endGridPosition.y + yAdjust) * (cellSize + gapSize),
  };

  // eslint-disable-next-line no-console
  console.log(
    item.startGridPosition,
    startPos,
    item.endGridPosition,
    endPos,
    isHorizontal,
  );
  const pathDef = `M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`;
  // Apply shadow around arrow
  return (
    <div className={styles.arrow} style={{ transform }}>
      <svg className={styles.arrow}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="0.7"
            refY="1"
            orient="auto"
          >
            <path d="M0,0 L0,2 L1.5,1 z" fill="var(--theme-color-4)" />
          </marker>
        </defs>
        <path
          className={styles.path}
          d={pathDef}
          fill="transparent"
          stroke="var(--theme-color-4)"
          strokeWidth={cellSize}
          markerEnd="url(#arrowhead)"
        />
      </svg>
    </div>
  );
};
