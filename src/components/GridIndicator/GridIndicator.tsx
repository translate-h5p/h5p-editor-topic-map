import * as React from "react";
import styles from "./GridIndicator.module.scss";

export type GridIndicatorProps = {
  onMouseDown: () => void;
  onMouseEnter: () => void;
  label: string;
};

export const GridIndicator: React.FC<GridIndicatorProps> = React.memo(
  ({ onMouseDown, onMouseEnter, label }) => {
    return (
      <button
        type="button"
        className={`grid-indicator ${styles.gridIndicator}`}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onTouchStart={onMouseDown}
        onTouchMove={onMouseEnter}
        aria-label={label}
        data-grid-indicator="true"
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.onMouseDown === nextProps.onMouseDown &&
    prevProps.onMouseEnter === nextProps.onMouseEnter,
);
