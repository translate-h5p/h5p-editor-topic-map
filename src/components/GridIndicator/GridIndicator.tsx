import * as React from "react";
import styles from "./GridIndicator.module.scss";

export type GridIndicatorProps = {
  onClick: React.MouseEventHandler;
  label: string;
};

export const GridIndicator: React.FC<GridIndicatorProps> = ({
  onClick,
  label,
}) => {
  return (
    <button
      type="button"
      className={`grid-indicator ${styles.gridIndicator}`}
      onClick={onClick}
      aria-label={label}
    />
  );
};
