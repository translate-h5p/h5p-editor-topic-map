import * as React from "react";
import { FC, useCallback, useMemo, useState } from "react";
import Xarrow from "react-xarrows";
import { t } from "../../H5P/H5P.util";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { ContextMenuAction } from "../../types/ContextMenuAction";
import { ContextMenu, ContextMenuButtonType } from "../ContextMenu/ContextMenu";
import { Dialog } from "../Dialog/Dialog";
import styles from "./Arrow.module.scss";

export type ArrowProps = {
  cellSize: number;
  item: ArrowItemType;
  editItem: (itemId: string) => void;
  deleteItem: (itemId: string) => void;
  selectedItemId: string | null;
  setSelectedItemId: (itemId: string) => void;
  updateArrowType: (type: ArrowType, itemId: string) => void;
};

export const Arrow: FC<ArrowProps> = ({
  cellSize,
  editItem,
  deleteItem,
  item,
  selectedItemId,
  setSelectedItemId,
  updateArrowType,
}) => {
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  const contextMenuActions: Array<ContextMenuAction> = useMemo(() => {
    const editAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Edit,
      label: t("context-menu_edit"),
      onClick: () => editItem(item.id),
    };

    const deleteAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Delete,
      label: t("context-menu_delete"),
      onClick: () => setShowDeleteConfirmationDialog(true),
    };

    const changeToDirectionalArrowAction: ContextMenuAction = {
      icon: ContextMenuButtonType.ArrowDirectional,
      label: t("context-menu_arrow-directional"),
      onClick: () => updateArrowType(ArrowType.Directional, item.id),
    };

    const changeToBiDirectionalArrowAction: ContextMenuAction = {
      icon: ContextMenuButtonType.ArrowBiDirectional,
      label: t("context-menu_arrow-bi-directional"),
      onClick: () => updateArrowType(ArrowType.BiDirectional, item.id),
    };

    const changeToNonDirectionalArrowAction: ContextMenuAction = {
      icon: ContextMenuButtonType.ArrowNonDirectional,
      label: t("context-menu_arrow-non-directional"),
      onClick: () => updateArrowType(ArrowType.NonDirectional, item.id),
    };

    return [
      editAction,
      changeToDirectionalArrowAction,
      changeToBiDirectionalArrowAction,
      changeToNonDirectionalArrowAction,
      deleteAction,
    ];
  }, [editItem, item.id, updateArrowType]);

  const confirmDeletion = useCallback(() => {
    deleteItem(item.id);
    setShowDeleteConfirmationDialog(false);
  }, [deleteItem, item.id]);

  const denyDeletion = useCallback(() => {
    setShowDeleteConfirmationDialog(false);
  }, []);

  return (
    <div aria-label={item.label} className={`arrow-item ${styles.arrow}`}>
      <Xarrow
        start={item.startElementId}
        end={item.endElementId}
        path="grid"
        showHead={[ArrowType.BiDirectional, ArrowType.Directional].includes(
          item.arrowType,
        )}
        showTail={[ArrowType.BiDirectional].includes(item.arrowType)}
        lineColor="var(--theme-color-2)"
        headColor="var(--theme-color-2)"
        tailColor="var(--theme-color-2)"
        strokeWidth={cellSize / 2.5}
        headSize={cellSize / 10}
        tailSize={cellSize / 10}
        zIndex={1}
        divContainerStyle={{
          pointerEvents: "auto",
        }}
        arrowBodyProps={{
          tabIndex: -1,
          onClick: () => setSelectedItemId(item.id),
          role: "button",
        }}
      />
      <ContextMenu
        actions={contextMenuActions}
        show={selectedItemId === item.id}
        turnLeft={false} // TODO: {checkIfRightSideOfGrid(position.x, gridSize.width)}
      />
      <Dialog
        isOpen={showDeleteConfirmationDialog}
        title={t("draggable_delete-confirmation")}
        onOpenChange={setShowDeleteConfirmationDialog}
        size="medium"
      >
        <div className={styles.deleteConfirmationButtons}>
          <button
            type="button"
            className={styles.deleteConfirmationPositive}
            onClick={confirmDeletion}
          >
            {t("draggable_delete-positive")}
          </button>
          <button
            type="button"
            className={styles.deleteConfirmationNegative}
            onClick={denyDeletion}
          >
            {t("draggable_delete-negative")}
          </button>
        </div>
      </Dialog>
    </div>
  );
};
