import * as React from "react";
import { useState } from "react";
import { t } from "../../h5p/H5P.util";
import { ArrowType } from "../../types/ArrowType";
import { ContextMenuAction } from "../../types/ContextMenuAction";
import { OccupiedCell } from "../../types/OccupiedCell";
import { Position } from "../../types/Position";
import { ResizeDirection } from "../../types/ResizeDirection";
import { Size } from "../../types/Size";
import { TranslationKey } from "../../types/TranslationKey";
import {
  calculateClosestValidPositionComponent,
  calculateClosestValidSizeComponent,
  getPointerPositionFromEvent,
} from "../../utils/draggable.utils";
import { positionIsFree } from "../../utils/grid.utils";
import { ContextMenu, ContextMenuButtonType } from "../ContextMenu/ContextMenu";
import { Dialog } from "../Dialog/Dialog";
import { ScaleHandles } from "../ScaleHandles/ScaleHandles";
import styles from "./Draggable.module.scss";

const labelTextKeys: Record<string, TranslationKey> = {
  selected: "draggable_selected",
  notSelected: "draggable_not-selected",
};

export type DraggableProps = {
  id: string;
  initialXPosition: number;
  initialYPosition: number;
  updatePosition: (newPosition: Position) => void;
  initialWidth: number;
  initialHeight: number;
  gapSize: number;
  cellSize: number;
  gridSize: Size;
  occupiedCells: Array<OccupiedCell>;
  isPreview: boolean;
  deleteItem: (item: string) => void;
  setSelectedItem: (newItem: string | null) => void;
  selectedItem: string | null;
  startResize: (directionLock: ResizeDirection) => void;
  mouseOutsideGrid: boolean;
  editItem: (id: string) => void;
  showScaleHandles: boolean;
  isArrow: boolean;
  updateArrowType?: (type: ArrowType, item: string) => void;
};

export const Draggable: React.FC<DraggableProps> = ({
  id,
  initialXPosition,
  initialYPosition,
  updatePosition,
  initialWidth,
  initialHeight,
  gapSize,
  cellSize,
  gridSize,
  occupiedCells,
  isPreview,
  deleteItem,
  setSelectedItem,
  selectedItem,
  startResize,
  children,
  mouseOutsideGrid,
  editItem,
  showScaleHandles,
  isArrow,
  updateArrowType,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isSelected, setIsSelected] = useState(selectedItem === id);
  const [labelText, setLabelText] = useState(t(labelTextKeys.notSelected));
  const [pointerStartPosition, setPointerStartPosition] =
    useState<Position | null>();
  const [{ width, height }, setSize] = useState<Size>({
    // prettier-ignore
    width: calculateClosestValidSizeComponent(initialWidth, gapSize, cellSize, gridSize.width),
    // prettier-ignore
    height: calculateClosestValidSizeComponent(initialHeight, gapSize, cellSize, gridSize.height),
  });
  const [position, setPosition] = useState<Position>({
    // prettier-ignore
    x: calculateClosestValidPositionComponent(initialXPosition, gapSize, cellSize, gridSize.width, width),
    // prettier-ignore
    y: calculateClosestValidPositionComponent(initialYPosition, gapSize, cellSize, gridSize.height, height),
  });
  const [previousPosition, setPreviousPosition] = useState(position);
  const [isResizing, setIsResizing] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  // Update Draggable's size whenever the container's size changes
  React.useEffect(
    () =>
      setSize({
        // prettier-ignore
        width: calculateClosestValidSizeComponent(initialWidth, gapSize, cellSize, gridSize.width),
        // prettier-ignore
        height: calculateClosestValidSizeComponent(initialHeight, gapSize, cellSize, gridSize.height),
      }),
    [
      gapSize,
      cellSize,
      gridSize.height,
      gridSize.width,
      initialHeight,
      initialWidth,
    ],
  );

  // Update Draggable's position whenever the container's size changes
  React.useEffect(() => {
    setPosition({
      // prettier-ignore
      x: calculateClosestValidPositionComponent(initialXPosition, gapSize, cellSize, gridSize.width, width),
      // prettier-ignore
      y: calculateClosestValidPositionComponent(initialYPosition, gapSize, cellSize, gridSize.height, height),
    });
  }, [
    gapSize,
    cellSize,
    gridSize.height,
    gridSize.width,
    height,
    initialXPosition,
    initialYPosition,
    width,
  ]);

  const elementRef = React.useRef<HTMLDivElement>(null);

  const startDrag = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      setIsSelected(true);
      setSelectedItem(id);

      const { x, y } = getPointerPositionFromEvent(event);

      setPointerStartPosition({
        x: x - position.x,
        y: y - position.y,
      });
    },
    [setSelectedItem, id, position],
  );

  const getNewPosition = React.useCallback(
    (x: number, y: number) => ({ x, y }),
    [],
  );

  const getClosestValidXPosition = React.useCallback(
    (pointerX: number) =>
      calculateClosestValidPositionComponent(
        pointerX,
        gapSize,
        cellSize,
        gridSize.width,
        width,
      ),
    [gapSize, cellSize, gridSize.width, width],
  );

  const getClosestValidYPosition = React.useCallback(
    (pointerY: number) =>
      calculateClosestValidPositionComponent(
        pointerY,
        gapSize,
        cellSize,
        gridSize.height,
        height,
      ),
    [gapSize, cellSize, gridSize.height, height],
  );

  const checkIfPositionIsFree = React.useCallback(
    (newPosition: Position): boolean => {
      return positionIsFree(
        newPosition,
        id,
        { width, height },
        gridSize,
        gapSize,
        cellSize,
        occupiedCells,
      );
    },
    [gapSize, cellSize, gridSize, height, id, occupiedCells, width],
  );

  const stopDrag = React.useCallback(() => {
    const { x, y } = position;

    const closestValidXPosition = getClosestValidXPosition(x);
    const closestValidYPosition = getClosestValidYPosition(y);

    if (closestValidXPosition != null && closestValidYPosition != null) {
      const newPosition = getNewPosition(
        closestValidXPosition,
        closestValidYPosition,
      );

      if (checkIfPositionIsFree(newPosition)) {
        setPosition(newPosition);
        updatePosition(newPosition);
        setPreviousPosition(newPosition);
      } else {
        setPosition(previousPosition);
      }
    }

    setPointerStartPosition(null);
    setIsDragging(false);
  }, [
    position,
    getClosestValidXPosition,
    getClosestValidYPosition,
    getNewPosition,
    checkIfPositionIsFree,
    updatePosition,
    previousPosition,
  ]);

  const drag = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (showDeleteConfirmationDialog) {
        return;
      }

      if (!isDragging || !pointerStartPosition) {
        return;
      }

      if (mouseOutsideGrid) {
        stopDrag();
        return;
      }

      const { x, y } = getPointerPositionFromEvent(event);

      const newPosition = getNewPosition(
        x - pointerStartPosition.x,
        y - pointerStartPosition.y,
      );

      setPosition(newPosition);
    },
    [
      showDeleteConfirmationDialog,
      isDragging,
      pointerStartPosition,
      mouseOutsideGrid,
      getNewPosition,
      stopDrag,
    ],
  );

  const preventDefault = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  React.useEffect(() => {
    setLabelText(
      isSelected ? t(labelTextKeys.selected) : t(labelTextKeys.notSelected),
    );
  }, [isSelected]);

  const horizontalScaleHandleLabelText = "";
  const verticalScaleHandleLabelText = "";

  React.useEffect(() => {
    /* 
      These are tied to `window`, because the
      cursor might not be on top of the element
      when the drag action ends.
    */
    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag);

    return () => {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("touchmove", drag);
    };
  }, [drag]);

  const stopResize = React.useCallback(() => {
    stopDrag();
    setIsResizing(false);
  }, [stopDrag]);

  const checkIfRightSideOfGrid = React.useCallback(() => {
    return position.x > gridSize.width / 2;
  }, [gridSize.width, position.x]);

  const confirmDeletion = React.useCallback(() => {
    deleteItem(id);
    setShowDeleteConfirmationDialog(false);
  }, [deleteItem, id]);

  const denyDeletion = React.useCallback(() => {
    setShowDeleteConfirmationDialog(false);
  }, []);

  const contextMenuActions: Array<ContextMenuAction> = React.useMemo(() => {
    const editAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Edit,
      label: t("context-menu_edit"),
      onClick: () => editItem(id),
    };

    const deleteAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Delete,
      label: t("context-menu_delete"),
      onClick: () => setShowDeleteConfirmationDialog(true),
    };

    let actions: Array<ContextMenuAction>;
    if (isArrow && updateArrowType) {
      const changeToDirectionalArrowAction: ContextMenuAction = {
        icon: ContextMenuButtonType.ArrowDirectional,
        label: t("context-menu_arrow-directional"),
        onClick: () => updateArrowType(ArrowType.Directional, id),
      };

      const changeToBiDirectionalArrowAction: ContextMenuAction = {
        icon: ContextMenuButtonType.ArrowBiDirectional,
        label: t("context-menu_arrow-bi-directional"),
        onClick: () => updateArrowType(ArrowType.BiDirectional, id),
      };

      const changeToNonDirectionalArrowAction: ContextMenuAction = {
        icon: ContextMenuButtonType.ArrowNonDirectional,
        label: t("context-menu_arrow-non-directional"),
        onClick: () => updateArrowType(ArrowType.NonDirectional, id),
      };

      actions = [
        editAction,
        changeToDirectionalArrowAction,
        changeToBiDirectionalArrowAction,
        changeToNonDirectionalArrowAction,
        deleteAction,
      ];
    } else {
      actions = [editAction, deleteAction];
    }

    return actions;
  }, [editItem, id, isArrow, updateArrowType]);

  /**
   * This offset is used to fix some of the floating point errors
   * that are placing items a few pixels off the grid.
   */
  const offset = 2;

  return (
    <div
      ref={elementRef}
      role="button"
      tabIndex={0}
      /* Use draggable="true" to benefit from screen readers' understanding of the property */
      draggable="true"
      /* Prevent default because we implement drag ourselves */
      onDragStart={preventDefault}
      aria-grabbed={isDragging}
      className={`${styles.draggable} ${isPreview && styles.preview} draggable`}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y}px)`,
        width: width + offset,
        height: height + offset,
        zIndex: isDragging || selectedItem === id ? 2 : undefined,
        pointerEvents: isPreview || isResizing ? "none" : undefined,
        transition: isPreview || isResizing ? "none" : undefined,
      }}
      aria-label={labelText}
      onMouseUp={stopDrag}
      onTouchEnd={stopDrag}
    >
      <div className={styles.inner} tabIndex={-1}>
        {children}
      </div>

      {showScaleHandles && (
        <ScaleHandles
          setIsResizing={setIsResizing}
          startResize={startResize}
          stopResize={stopResize}
          verticalScaleHandleLabelText={verticalScaleHandleLabelText}
          horizontalScaleHandleLabelText={horizontalScaleHandleLabelText}
        />
      )}
      <ContextMenu
        actions={contextMenuActions}
        show={selectedItem === id}
        turnLeft={checkIfRightSideOfGrid()}
      />
      <Dialog
        isOpen={showDeleteConfirmationDialog}
        title={t("draggable_delete-confirmation")}
        onOpenChange={setShowDeleteConfirmationDialog}
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
