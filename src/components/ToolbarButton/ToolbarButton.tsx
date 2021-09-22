import * as React from "react";
import styles from "./ToolbarButton.module.scss";
import { Icons } from "../../icons";

export type ToolbarButtonProps = {
  icon: string;
  label: string;
  onClick: React.MouseEventHandler;
  showActive: boolean;
  active: boolean;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  onClick,
  showActive,
  active,
}) => {
  return (
    <button
      type="button"
      className={
        active && showActive
          ? `${styles.toolbarButton} ${styles.active}`
          : styles.toolbarButton
      }
      onClick={onClick}
      aria-label={label}
    >
      <Icons icon={icon} className={styles.icon} />
      <div className={styles.tooltip}>{label}</div>
    </button>
  );
};
