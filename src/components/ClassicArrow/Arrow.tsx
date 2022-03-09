/* eslint-disable no-nested-ternary */
import * as React from "react";
import styles from "./Arrow.module.scss";
import { ClassicArrowItemType } from "../../types/ClassicArrowItemType";
import { ContextMenu, ContextMenuButtonType } from "../ContextMenu/ContextMenu";
import { ContextMenuAction } from "../../types/ContextMenuAction";
import { t } from "../../H5P/H5P.util";
import { Dialog } from "../Dialog/Dialog";
import { ArrowType } from "../../types/ArrowType";
import {
  xAdjustmentEnd,
  xAdjustmentStart,
  yAdjustmentEnd,
  yAdjustmentStart,
} from "../../utils/arrow.utils";

export type ClassicArrowProps = {
  cellSize: number;
  gapSize: number;
  item: ClassicArrowItemType;
  editItem: (itemId: string) => void;
  deleteItem: (itemId: string) => void;
  selectedItemId: string | null;
  setSelectedItemId: (itemId: string) => void;
  updateArrowType: (type: ArrowType, itemId: string) => void;
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
  updateArrowType,
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

  const isHorizontal =
    item.startPosition != null && item.endPosition != null
      ? Math.abs(item.startPosition.x - item.endPosition.x) >
        Math.abs(item.startPosition.y - item.endPosition.y)
      : true;

  const transform = isHorizontal
    ? `translateY(-${gapSize / 2}px)`
    : `translateX(-${gapSize / 2}px)`;

  let startPos = { x: 0, y: 0 };
  let endPos = { x: 0, y: 0 };

  if (item.startGridPosition != null && item.endGridPosition != null) {
    const xAdjustStart = xAdjustmentStart(item, isHorizontal);
    const yAdjustStart = yAdjustmentStart(item, isHorizontal);

    const xAdjust = xAdjustmentEnd(item, isHorizontal);
    const yAdjust = yAdjustmentEnd(item, isHorizontal);

    startPos = {
      x: (item.startGridPosition.x + xAdjustStart) * (cellSize + gapSize),
      y: (item.startGridPosition.y + yAdjustStart) * (cellSize + gapSize),
    };

    endPos = {
      x: (item.endGridPosition.x + xAdjust) * (cellSize + gapSize),
      y: (item.endGridPosition.y + yAdjust) * (cellSize + gapSize),
    };
  }

  const pathDef = `M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`;
  // Apply shadow around arrow
  return (
    <div className={styles.arrow}>
      <svg className={styles.arrowSvg}>
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
          <marker
            id="arrowtail"
            markerWidth="10"
            markerHeight="10"
            refX="0.7"
            refY="1"
            orient="auto-start-reverse"
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
          markerEnd={
            item.arrowType === ArrowType.BiDirectional ||
            item.arrowType === ArrowType.Directional
              ? "url(#arrowhead)"
              : ""
          }
          markerStart={
            item.arrowType === ArrowType.BiDirectional ? "url(#arrowtail)" : ""
          }
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
