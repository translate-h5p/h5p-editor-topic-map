import * as React from "react";
import styles from "./ToolbarButton.module.scss";
import { Icon } from "../../icons";
import { ToolbarButtonType } from "../Toolbar/Toolbar";

export type ToolbarButtonProps = {
  icon: ToolbarButtonType;
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
      <Icon icon={icon} className={styles.icon} />
      <div className={styles.tooltip}>{label}</div>
    </button>
  );
};
