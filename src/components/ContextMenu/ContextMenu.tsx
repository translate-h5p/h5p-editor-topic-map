import * as React from "react";
import styles from "./ContextMenu.module.scss";
import { ContextMenuButton } from "../ContextMenuButton/ContextMenuButton";

/* TODO: Translate */
const labelTexts = {
  edit: "Edit",
  delete: "Delete",
};

/*
  Name of svg icon should be similar to this,
  specify the svg icon in icons.tsx
*/
export enum ContextMenuButtonType {
  Edit = "edit",
  Delete = "delete",
}

export type ContextMenuProps = {
  show: boolean;
  onEdit: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  show,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`${styles.contextMenu} ${show && styles.show}`}>
      <ContextMenuButton
        icon={ContextMenuButtonType.Edit}
        label={labelTexts.edit}
        onClick={onEdit}
      />
      <ContextMenuButton
        icon={ContextMenuButtonType.Delete}
        label={labelTexts.delete}
        onClick={onDelete}
      />
    </div>
  );
};
