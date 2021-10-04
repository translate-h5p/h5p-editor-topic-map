import * as React from "react";
import styles from "./GridIndicator.module.scss";

export type GridIndicatorProps = {
  onClick: React.MouseEventHandler;
  onMouseDown: (index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseUp: () => void;
  label: string;
  index: number;
  active: boolean;
};

export const GridIndicator: React.FC<GridIndicatorProps> = ({
  onClick,
  onMouseDown,
  onMouseEnter,
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
      onMouseEnter={() => onMouseEnter(index)}
      onMouseUp={() => onMouseUp()}
      onTouchStart={() => onMouseDown(index)}
      onTouchMove={() => onMouseEnter(index)}
      onTouchEnd={() => onMouseUp()}
      aria-label={label}
    />
  );
};
