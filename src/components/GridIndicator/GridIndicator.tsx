import * as React from "react";
import { t } from "../../h5p/H5P.util";
import styles from "./GridIndicator.module.scss";

export type GridIndicatorProps = {
  onMouseDown: (index: number) => void;
  onMouseEnter: (index: number) => void;
  index: number;
  active: boolean;
};

export const GridIndicator: React.FC<GridIndicatorProps> = ({
  onMouseDown,
  onMouseEnter,
  index,
  active,
}) => {
  const label = t("grid-indicator_label");
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
