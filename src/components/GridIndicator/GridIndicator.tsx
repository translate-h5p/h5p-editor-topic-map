import * as React from "react";
import styles from "./GridIndicator.module.scss";

export type GridIndicatorProps = {
  onClick: React.MouseEventHandler;
  onMouseDown: (index: number) => void;
  onMouseUp: (index: number) => void;
  label: string;
  index: number;
};

export const GridIndicator: React.FC<GridIndicatorProps> = ({
  onClick,
  onMouseDown,
  onMouseUp,
  label,
  index,
}) => {
  return (
    <button
      type="button"
      className={`grid-indicator ${styles.gridIndicator}`}
      onClick={onClick}
      onMouseDown={() => onMouseDown(index)}
      onMouseUp={() => onMouseUp(index)}
      aria-label={label}
    />
  );
};
