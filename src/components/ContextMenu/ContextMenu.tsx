import * as React from "react";
import styles from "./ContextMenu.module.scss";
import { ContextMenuButton } from "../ContextMenuButton/ContextMenuButton";
import { t } from "../../h5p/H5P.util";

const labelTexts = {
  edit: t("edit"),
  delete: t("delete"),
};

/*
  Name of svg icon should be similar to this,
  specify the svg icon in icons.tsx
*/
export enum ContextMenuButtonType {
  Edit = "context-menu_edit",
  Delete = "context-menu_delete",
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
