import * as React from "react";
import styles from "./ToolbarButton.module.scss";
import { Icons } from "../../icons";

export type ToolbarButtonProps = {
  label: string;
  onClick: any;
  showActive: boolean;
  activeButton: string | null | undefined;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  label,
  onClick,
  showActive,
  activeButton,
}) => {
  const id = label.toLowerCase().replace(" ", "");
  const active = activeButton === id;

  return (
    <button
      type="button"
      className={
        active && showActive
          ? `${styles.toolbarButton} ${styles.active}`
          : styles.toolbarButton
      }
      onClick={() => onClick(id)}
      aria-label={label}
    >
      <Icons icon={id} className={styles.icon} />
      <div className={styles.tooltip}>{label}</div>
    </button>
  );
};
