import * as React from "react";
import styles from "./ContextMenuButton.module.scss";
import { Icons } from "../../icons";

export type ContextMenuButtonProps = {
  icon: string;
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
      <Icons icon={icon} className={styles.icon} />
      <div className={styles.tooltip}>{label}</div>
    </button>
  );
};
