/* eslint-disable no-nested-ternary */
import * as React from "react";
import styles from "./Arrow.module.scss";
import { ClassicArrowItemType } from "../../types/ClassicArrowItemType";
import { ContextMenu, ContextMenuButtonType } from "../ContextMenu/ContextMenu";
import { ContextMenuAction } from "../../types/ContextMenuAction";
import { t } from "../../H5P/H5P.util";
import { Dialog } from "../Dialog/Dialog";

export type ClassicArrowProps = {
  cellSize: number;
  gapSize: number;
  item: ClassicArrowItemType;
  editItem: (itemId: string) => void;
  deleteItem: (itemId: string) => void;
  selectedItemId: string | null;
  setSelectedItemId: (itemId: string) => void;
};

// TODO: Share code with h5p-topic-map instead of duplicating
export const ClassicArrow: React.FC<ClassicArrowProps> = ({
  item,
  cellSize,
  gapSize,
  editItem,
  deleteItem,
  selectedItemId,
  setSelectedItemId,
}) => {
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    React.useState(false);

  const confirmDeletion = React.useCallback(() => {
    deleteItem(item.id);
    setShowDeleteConfirmationDialog(false);
  }, [deleteItem, item.id]);

  const denyDeletion = React.useCallback(() => {
    setShowDeleteConfirmationDialog(false);
  }, []);
  const contextMenuActions: Array<ContextMenuAction> = React.useMemo(() => {
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

    // const changeToDirectionalArrowAction: ContextMenuAction = {
    //   icon: ContextMenuButtonType.ArrowDirectional,
    //   label: t("context-menu_arrow-directional"),
    //   onClick: () => updateArrowType(ArrowType.Directional, item.id),
    // };

    // const changeToBiDirectionalArrowAction: ContextMenuAction = {
    //   icon: ContextMenuButtonType.ArrowBiDirectional,
    //   label: t("context-menu_arrow-bi-directional"),
    //   onClick: () => updateArrowType(ArrowType.BiDirectional, item.id),
    // };

    // const changeToNonDirectionalArrowAction: ContextMenuAction = {
    //   icon: ContextMenuButtonType.ArrowNonDirectional,
    //   label: t("context-menu_arrow-non-directional"),
    //   onClick: () => updateArrowType(ArrowType.NonDirectional, item.id),
    // };

    return [
      editAction,
      // changeToDirectionalArrowAction,
      // changeToBiDirectionalArrowAction,
      // changeToNonDirectionalArrowAction,
      deleteAction,
    ];
  }, [editItem, item.id]);

  const isHorizontal =
    Math.abs(item.startPosition.x - item.endPosition.x) >
    Math.abs(item.startPosition.y - item.endPosition.y);

  const transform = isHorizontal
    ? `translateY(-${gapSize / 2}px)`
    : `translateX(-${gapSize / 2}px)`;

  const startPos = {
    x: (item.startGridPosition.x - 0.5) * (cellSize + gapSize),
    y: (item.startGridPosition.y - 0.5) * (cellSize + gapSize),
  };

  const xAdjust =
    isHorizontal && item.startGridPosition.x <= item.endGridPosition.x
      ? -1.75
      : isHorizontal
      ? 0.5
      : -0.5;

  const yAdjust = isHorizontal
    ? -0.5
    : item.startGridPosition.y <= item.endGridPosition.y
    ? -1.75
    : 0.5;
  const endPos = {
    x: (item.endGridPosition.x + xAdjust) * (cellSize + gapSize),
    y: (item.endGridPosition.y + yAdjust) * (cellSize + gapSize),
  };

  const pathDef = `M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`;
  // Apply shadow around arrow
  return (
    <div className={styles.arrow} style={{ transform }}>
      <svg className={styles.arrow}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="0.7"
            refY="1"
            orient="auto"
          >
            <path
              d="M0,0 L0,2 L1.5,1 z"
              fill="var(--theme-color-4)"
              onClick={() => setSelectedItemId(item.id)}
            />
          </marker>
        </defs>
        <path
          className={
            selectedItemId === null ? styles.path : styles.pathSelected
          }
          d={pathDef}
          fill="transparent"
          stroke="var(--theme-color-4)"
          strokeWidth={cellSize}
          markerEnd="url(#arrowhead)"
          onClick={() => setSelectedItemId(item.id)}
        />
      </svg>

      <ContextMenu
        actions={contextMenuActions}
        show={selectedItemId === item.id}
        turnLeft={false} // TODO: {checkIfRightSideOfGrid(position.x, gridSize.width)}
        x={
          isHorizontal
            ? endPos.x - 1.5 * (cellSize + gapSize)
            : endPos.x - 2 * (cellSize + gapSize)
        }
        y={
          isHorizontal
            ? endPos.y - 1 * (cellSize + gapSize)
            : endPos.y + 2 * (cellSize + gapSize)
        }
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
