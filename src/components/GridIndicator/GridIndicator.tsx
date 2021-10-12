import * as React from "react";
import styles from "./GridIndicator.module.scss";

export type GridIndicatorProps = {
  onMouseDown: (index: number) => void;
  onMouseEnter: (index: number) => void;
  label: string;
  index: number;
  active: boolean;
};

export const GridIndicator: React.FC<GridIndicatorProps> = ({
  onMouseDown,
  onMouseEnter,
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
      onMouseDown={() => onMouseDown(index)}
      onMouseEnter={() => onMouseEnter(index)}
      onTouchStart={() => onMouseDown(index)}
      onTouchMove={() => onMouseEnter(index)}
      aria-label={label}
    />
  );
};
