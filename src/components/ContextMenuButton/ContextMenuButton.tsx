import * as React from "react";
import styles from "./ContextMenuButton.module.scss";
import { Icon } from "../../icons";
import { ContextMenuButtonType } from "../ContextMenu/ContextMenu";

export type ContextMenuButtonProps = {
  icon: ContextMenuButtonType;
  label: string;
  onClick: React.MouseEventHandler;
};

export const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={styles.contextMenuButton}
      onClick={onClick}
      aria-label={label}
    >
      <Icon icon={icon} className={styles.icon} />
      <div className={styles.tooltip}>{label}</div>
    </button>
  );
};
