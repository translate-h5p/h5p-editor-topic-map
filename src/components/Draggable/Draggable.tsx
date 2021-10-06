import * as React from "react";
import { OccupiedCell } from "../../types/OccupiedCell";
import { Position } from "../../types/Position";
import { Size } from "../../types/Size";
import {
  calculateClosestValidPositionComponent,
  calculateClosestValidSizeComponent,
  getPointerPositionFromEvent,
} from "../../utils/draggable.utils";
import { positionIsFree } from "../../utils/grid.utils";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { ScaleHandle } from "../ScaleHandle/ScaleHandle";
import styles from "./Draggable.module.scss";

/* TODO: Translate */
const labelTexts = {
  selected: "Press arrow keys to move. Press escape to unselect.",
  notSelected: "Press enter to select",
};

export type DraggableProps = {
  id: string;
  initialXPosition: number;
  initialYPosition: number;
  updatePosition: (newPosition: Position) => void;
  initialWidth: number;
  initialHeight: number;
  gapSize: number;
  gridIndicatorSize: number;
  gridSize: Size;
  occupiedCells: Array<OccupiedCell>;
  isPreview: boolean;
  deleteItem: (item: string) => void;
  setSelectedItem: (newItem: string | null) => void;
  selectedItem: string | null;
  startResize: (directionLock: "horizontal" | "vertical" | null) => void;
  backgroundImage: string | undefined;
};

export const Draggable: React.FC<DraggableProps> = ({
  id,
  initialXPosition,
  initialYPosition,
  updatePosition,
  initialWidth,
  initialHeight,
  gapSize,
  gridIndicatorSize,
  gridSize,
  occupiedCells,
  isPreview,
  deleteItem,
  setSelectedItem,
  selectedItem,
  startResize,
  backgroundImage,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(selectedItem === id);
  const [labelText, setLabelText] = React.useState(labelTexts.notSelected);
  const [pointerStartPosition, setPointerStartPosition] =
    React.useState<Position | null>(null);
  const [{ width, height }, setSize] = React.useState<Size>({
    width: calculateClosestValidSizeComponent(
      initialWidth,
      gapSize,
      gridIndicatorSize,
      gridSize.width,
    ),
    height: calculateClosestValidSizeComponent(
      initialHeight,
      gapSize,
      gridIndicatorSize,
      gridSize.height,
    ),
  });
  const [position, setPosition] = React.useState<Position>({
    x: calculateClosestValidPositionComponent(
      initialXPosition,
      gapSize,
      gridIndicatorSize,
      gridSize.width,
      width,
    ),
    y: calculateClosestValidPositionComponent(
      initialYPosition,
      gapSize,
      gridIndicatorSize,
      gridSize.height,
      height,
    ),
  });
  const [previousPosition, setPreviousPosition] = React.useState<Position>({
    ...position,
  });
  const [isResizing, setIsResizing] = React.useState<boolean>();

  // Update Draggable's size whenever the container's size changes
  React.useEffect(
    () =>
      setSize({
        width: calculateClosestValidSizeComponent(
          initialWidth,
          gapSize,
          gridIndicatorSize,
          gridSize.width,
        ),
        height: calculateClosestValidSizeComponent(
          initialHeight,
          gapSize,
          gridIndicatorSize,
          gridSize.height,
        ),
      }),
    [
      gapSize,
      gridIndicatorSize,
      gridSize.height,
      gridSize.width,
      initialHeight,
      initialWidth,
    ],
  );

  // Update Draggable's position whenever the container's size changes
  React.useEffect(() => {
    setPosition({
      x: calculateClosestValidPositionComponent(
        initialXPosition,
        gapSize,
        gridIndicatorSize,
        gridSize.width,
        width,
      ),
      y: calculateClosestValidPositionComponent(
        initialYPosition,
        gapSize,
        gridIndicatorSize,
        gridSize.height,
        height,
      ),
    });
  }, [
    gapSize,
    gridIndicatorSize,
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
        gridIndicatorSize,
        gridSize.width,
        width,
      ),
    [gapSize, gridIndicatorSize, gridSize.width, width],
  );

  const getClosestValidYPosition = React.useCallback(
    (pointerY: number) =>
      calculateClosestValidPositionComponent(
        pointerY,
        gapSize,
        gridIndicatorSize,
        gridSize.height,
        height,
      ),
    [gapSize, gridIndicatorSize, gridSize.height, height],
  );

  const checkIfPositionIsFree = React.useCallback(
    (newPosition: Position): boolean => {
      return positionIsFree(
        newPosition,
        id,
        { width, height },
        gridSize,
        gapSize,
        gridIndicatorSize,
        occupiedCells,
      );
    },
    [gapSize, gridIndicatorSize, gridSize, height, id, occupiedCells, width],
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
      if (!isDragging || !pointerStartPosition) {
        return;
      }

      const { x, y } = getPointerPositionFromEvent(event);

      const newPosition = getNewPosition(
        x - pointerStartPosition.x,
        y - pointerStartPosition.y,
      );

      setPosition(newPosition);
    },
    [getNewPosition, isDragging, pointerStartPosition],
  );

  const preventDefault = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  React.useEffect(() => {
    setLabelText(isSelected ? labelTexts.selected : labelTexts.notSelected);
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

  const stopScaling = React.useCallback(
    (
      scaledPosition:
        | "top"
        | "bottom"
        | "left"
        | "right"
        | "top-right"
        | "bottom-right"
        | "bottom-left"
        | "top-left",
    ) => {
      stopDrag();
      setIsResizing(false);
    },
    [stopDrag],
  );

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
      className={`${styles.draggable} ${isPreview && styles.preview}`}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      style={{
        backgroundImage: backgroundImage
          ? `url('${backgroundImage}')`
          : undefined,
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
      <ScaleHandle
        position="top"
        onScaleStart={() => {
          setIsResizing(true);
          startResize("horizontal");
        }}
        onScaleStop={() => stopScaling("top")}
        labelText={verticalScaleHandleLabelText}
      />

      <ScaleHandle
        position="top-right"
        onScaleStart={() => {
          setIsResizing(true);
          startResize(null);
        }}
        onScaleStop={() => stopScaling("top-right")}
        labelText={verticalScaleHandleLabelText}
      />
      <ScaleHandle
        position="right"
        onScaleStart={() => {
          setIsResizing(true);
          startResize("vertical");
        }}
        onScaleStop={() => stopScaling("right")}
        labelText={horizontalScaleHandleLabelText}
      />
      <ScaleHandle
        position="bottom-right"
        onScaleStart={() => {
          setIsResizing(true);
          startResize(null);
        }}
        onScaleStop={() => stopScaling("bottom-right")}
        labelText={horizontalScaleHandleLabelText}
      />

      <ScaleHandle
        position="bottom"
        onScaleStart={() => {
          setIsResizing(true);
          startResize("horizontal");
        }}
        onScaleStop={() => stopScaling("bottom")}
        labelText={verticalScaleHandleLabelText}
      />

      <ScaleHandle
        position="bottom-left"
        onScaleStart={() => {
          setIsResizing(true);
          startResize(null);
        }}
        onScaleStop={() => stopScaling("bottom-left")}
        labelText={verticalScaleHandleLabelText}
      />

      <ScaleHandle
        position="left"
        onScaleStart={() => {
          setIsResizing(true);
          startResize("vertical");
        }}
        onScaleStop={() => stopScaling("left")}
        labelText={horizontalScaleHandleLabelText}
      />

      <ScaleHandle
        position="top-left"
        onScaleStart={() => {
          setIsResizing(true);
          startResize(null);
        }}
        onScaleStop={() => stopScaling("top-left")}
        labelText={horizontalScaleHandleLabelText}
      />

      <ContextMenu
        onEdit={() => console.info("edit clicked")}
        onDelete={() => deleteItem(id)}
        show={selectedItem === id}
      />
    </div>
  );
};
