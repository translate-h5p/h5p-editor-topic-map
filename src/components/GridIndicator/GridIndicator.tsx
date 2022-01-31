import * as React from "react";
import styles from "./GridIndicator.module.scss";

export type GridIndicatorProps = {
  onMouseDown: (index: number) => void;
  onMouseEnter: (index: number) => void;
  index: number;
  label: string;
};

export const GridIndicator: React.FC<GridIndicatorProps> = React.memo(
  ({ onMouseDown, onMouseEnter, index, label }) => {
    return (
      <button
        type="button"
        className={`grid-indicator ${styles.gridIndicator}`}
        onMouseDown={() => onMouseDown(index)}
        onMouseEnter={() => onMouseEnter(index)}
        onTouchStart={() => onMouseDown(index)}
        onTouchMove={() => onMouseEnter(index)}
        aria-label={label}
        data-grid-indicator="true"
      />
    );
  },
  () => false,
);
