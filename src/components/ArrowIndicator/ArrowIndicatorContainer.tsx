import * as React from "react";
import { Position } from "../../types/Position";
import styles from "./ArrowIndicator.module.scss";

export type ArrowIndicatorProps = {
  arrowIndicators: JSX.Element[];
  breakpoints: Position[];
  cellSize: number;
  gapSize: number;
};

// TODO: Share code with h5p-topic-map instead of duplicating
export const ArrowIndicatorContainer: React.FC<ArrowIndicatorProps> = ({
  arrowIndicators,
  breakpoints,
  cellSize,
  gapSize,
}) => {
  const toPathElement = (position: Position): string => {
    return `${(position.x - 0.5) * (cellSize + gapSize)} ${
      (position.y - 0.5) * (cellSize + gapSize)
    }`;
  };
  const pathDef = breakpoints && breakpoints.length > 0 ? `M ${toPathElement(breakpoints[0])} ${breakpoints
    .map((pos) => `L ${toPathElement(pos)}`)
    .join(" ")}` : "";
  return (
    <svg className={styles.arrowSvg}>
      {arrowIndicators}
      <path
        d={pathDef}
        fill="transparent"
        stroke="var(--theme-color-4)"
        strokeOpacity={0.5}
        strokeWidth={cellSize * 0.66}
      />
    </svg>
  );
};
