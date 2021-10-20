import * as React from "react";
import styles from "./ContextMenu.module.scss";
import { ContextMenuButton } from "../ContextMenuButton/ContextMenuButton";
import { t } from "../../h5p/H5P.util";

const labelTexts = {
  edit: t("context-menu_edit"),
  delete: t("context-menu_delete"),
  directional: t("context-menu_arrow-directional"),
  biDirectional: t("context-menu_arrow-bi-directional"),
  nonDirectional: t("context-menu_arrow-non-directional"),
};

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
  onEdit: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
  onChangeToDirectional?: React.MouseEventHandler;
  onChangeToBiDirectional?: React.MouseEventHandler;
  onChangeToNonDirectional?: React.MouseEventHandler;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  show,
  turnLeft,
  onEdit,
  onDelete,
  onChangeToDirectional,
  onChangeToBiDirectional,
  onChangeToNonDirectional,
}) => {
  const className = turnLeft ? styles.contextMenuLeft : styles.contextMenu;

  return (
    <div className={`${className} ${show && styles.show}`}>
      <ContextMenuButton
        icon={ContextMenuButtonType.Edit}
        label={labelTexts.edit}
        onClick={onEdit}
      />
      {onChangeToDirectional && (
        <ContextMenuButton
          icon={ContextMenuButtonType.ArrowDirectional}
          label={labelTexts.directional}
          onClick={onChangeToDirectional}
        />
      )}
      {onChangeToBiDirectional && (
        <ContextMenuButton
          icon={ContextMenuButtonType.ArrowBiDirectional}
          label={labelTexts.biDirectional}
          onClick={onChangeToBiDirectional}
        />
      )}
      {onChangeToNonDirectional && (
        <ContextMenuButton
          icon={ContextMenuButtonType.ArrowNonDirectional}
          label={labelTexts.nonDirectional}
          onClick={onChangeToNonDirectional}
        />
      )}
      <ContextMenuButton
        icon={ContextMenuButtonType.Delete}
        label={labelTexts.delete}
        onClick={onDelete}
      />
    </div>
  );
};
