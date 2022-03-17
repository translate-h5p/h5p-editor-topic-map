import * as React from "react";
import styles from "./ContextMenu.module.scss";
import { ContextMenuButton } from "../ContextMenuButton/ContextMenuButton";
import { ContextMenuAction } from "../../types/ContextMenuAction";

/*
  Name of svg icon should be similar to this,
  specify the svg icon in icons.tsx
*/
export enum ContextMenuButtonType {
  Edit = "edit",
  Delete = "delete",
  ArrowDirectional = "directional",
  ArrowBiDirectional = "biDirectional",
  ArrowNonDirectional = "nonDirectional",
}

export type ContextMenuProps = {
  show: boolean;
  turnLeft: boolean;
  actions: Array<ContextMenuAction>;
  x?: number;
  y?: number;
  gridWidth?: number;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  show,
  turnLeft,
  actions,
  x,
  y,
  gridWidth,
}) => {
  const className = turnLeft ? styles.left : styles.right;

  const leftPosition = x && !turnLeft ? x : undefined;
  const rightPosition =
    x && gridWidth && turnLeft ? gridWidth - x - gridWidth / 20 : undefined;

  return (
    <div
      className={`${styles.contextMenu} ${className} ${
        show && styles.show
      } context-menu-button`}
      style={
        x && y
          ? { left: leftPosition, right: rightPosition, top: y }
          : undefined
      }
    >
      {actions.map(({ icon, label, onClick }) => (
        <ContextMenuButton
          key={label}
          icon={icon}
          label={label}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
