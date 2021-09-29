import * as React from "react";
import styles from "./GridIndicator.module.scss";

export type GridIndicatorProps = {
  onClick: React.MouseEventHandler;
  onMouseDown: (index: number) => void;
  onMouseUp: (index: number) => void;
  label: string;
  index: number;
  active: boolean;
};

export const GridIndicator: React.FC<GridIndicatorProps> = ({
  onClick,
  onMouseDown,
  onMouseUp,
  label,
  index,
  active,
}) => {
  return (
    <button
      type="button"
      className={`grid-indicator ${styles.gridIndicator} ${
        active && styles.active
      }`}
      onClick={onClick}
      onMouseDown={() => onMouseDown(index)}
      onMouseUp={() => onMouseUp(index)}
      onTouchStart={() => onMouseDown(index)}
      onTouchEnd={() => onMouseUp(index)}
      aria-label={label}
    />
  );
};
