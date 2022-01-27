import * as React from "react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useXarrow } from "react-xarrows";
import { t } from "../../H5P/H5P.util";
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
import { checkIfRightSideOfGrid, positionIsFree } from "../../utils/grid.utils";
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
  onPointerDown: () => void;
};

export const Draggable: FC<DraggableProps> = ({
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
  onPointerDown,
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

  const updateXarrow = useXarrow();

  // Update Draggable's size whenever the container's size changes
  useEffect(
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
  useEffect(() => {
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

  const elementRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      onPointerDown();

      setIsDragging(true);
      setIsSelected(true);
      setSelectedItem(id);

      const { x, y } = getPointerPositionFromEvent(event);

      setPointerStartPosition({
        x: x - position.x,
        y: y - position.y,
      });
    },
    [onPointerDown, setSelectedItem, id, position.x, position.y],
  );

  const getNewPosition = useCallback((x: number, y: number) => ({ x, y }), []);

  const getClosestValidXPosition = useCallback(
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

  const getClosestValidYPosition = useCallback(
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

  const checkIfPositionIsFree = useCallback(
    (newPosition: Position): boolean =>
      positionIsFree(
        newPosition,
        id,
        { width, height },
        gridSize,
        gapSize,
        cellSize,
        occupiedCells,
      ),
    [gapSize, cellSize, gridSize, height, id, occupiedCells, width],
  );

  const stopDrag = useCallback(() => {
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

  const drag = useCallback(
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
      window.requestAnimationFrame(() => updateXarrow());
    },
    // Do not add `updateXarrow` to this list, as it generates maximum update errors
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      showDeleteConfirmationDialog,
      isDragging,
      pointerStartPosition,
      mouseOutsideGrid,
      getNewPosition,
      stopDrag,
    ],
  );

  const preventDefault = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    setLabelText(
      isSelected ? t(labelTextKeys.selected) : t(labelTextKeys.notSelected),
    );
  }, [isSelected]);

  const horizontalScaleHandleLabelText = "";
  const verticalScaleHandleLabelText = "";

  useEffect(() => {
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

  const stopResize = useCallback(() => {
    stopDrag();
    setIsResizing(false);
  }, [stopDrag]);

  const confirmDeletion = useCallback(() => {
    deleteItem(id);
    setShowDeleteConfirmationDialog(false);
  }, [deleteItem, id]);

  const denyDeletion = useCallback(() => {
    setShowDeleteConfirmationDialog(false);
  }, []);

  const contextMenuActions: Array<ContextMenuAction> = useMemo(() => {
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

    return [editAction, deleteAction];
  }, [editItem, id]);

  /**
   * This offset is used to fix some of the floating point errors
   * that are placing items a few pixels off the grid.
   */
  const offset = 2;

  return (
    <div
      id={id}
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
      onTransitionEnd={() => updateXarrow()}
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
        turnLeft={checkIfRightSideOfGrid(position.x, gridSize.width)}
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
