import * as React from "react";
import { Position } from "../../types/Position";

export type ArrowIndicatorProps = {
  position: Position;
  cellSize: number;
  gapSize: number;
};

// TODO: Share code with h5p-topic-map instead of duplicating
export const ArrowIndicator: React.FC<ArrowIndicatorProps> = ({
  position,
  cellSize,
  gapSize,
}) => {
  const placement = {
    x: (position.x - 0.5) * (cellSize + gapSize),
    y: (position.y - 0.5) * (cellSize + gapSize),
  };

  return (
    <circle
      cx={placement.x}
      cy={placement.y}
      r={cellSize / 2}
      strokeWidth="3"
      stroke="black"
      fill="red"
    />
  );
};
