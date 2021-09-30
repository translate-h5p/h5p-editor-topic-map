import * as React from "react";
import { OccupiedCell } from "../../types/OccupiedCell";
import { Position } from "../../types/Position";
import { Size } from "../../types/Size";
import {
  calculateClosestValidPositionComponent,
  calculateClosestValidSizeComponent,
  getPointerPositionFromEvent,
  scale,
} from "../../utils/draggable.utils";
import { positionIsFree } from "../../utils/grid.utils";
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
  updateSize: (newSize: Size) => void;
  gapSize: number;
  gridIndicatorSize: number;
  gridSize: Size;
  occupiedCells: Array<OccupiedCell>;
  onMouseDown: (id: string) => void;
};

export const Draggable: React.FC<DraggableProps> = ({
  id,
  initialXPosition,
  initialYPosition,
  updatePosition,
  initialWidth,
  initialHeight,
  updateSize,
  gapSize,
  gridIndicatorSize,
  gridSize,
  occupiedCells,
  onMouseDown,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false);
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

  const elementRef = React.useRef<HTMLButtonElement>(null);

  const startDrag = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      setIsSelected(true);

      const { x, y } = getPointerPositionFromEvent(event);

      setPointerStartPosition({
        x: x - position.x,
        y: y - position.y,
      });

      onMouseDown(id);
      console.log("start drag end");
    },
    [id, onMouseDown, position.x, position.y],
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
    console.log("stop drag");
    const { x, y } = position;

    const closestValidXPosition = getClosestValidXPosition(x);
    const closestValidYPosition = getClosestValidYPosition(y);

    if (closestValidXPosition != null && closestValidYPosition != null) {
      const newPosition: Position = {
        x: closestValidXPosition,
        y: closestValidYPosition,
      };

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

      const newPosition: Position = {
        x: x - pointerStartPosition.x,
        y: y - pointerStartPosition.y,
      };

      setPosition(newPosition);
    },
    [isDragging, pointerStartPosition],
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

  const scaleHorizontal = React.useCallback(
    (pointerX: number, leftWasMoved: boolean) => {
      const [newWidth, newXPosition] = scale(
        pointerX,
        leftWasMoved,
        width,
        position.x,
      );

      const newPosition = {
        ...position,
        y: newXPosition,
      };

      setPosition(newPosition);
      setSize(oldSize => ({ ...oldSize, width: newWidth }));
    },
    [position, width],
  );

  const scaleVertical = React.useCallback(
    (pointerY: number, topWasMoved: boolean) => {
      const [newHeight, newYPosition] = scale(
        pointerY,
        topWasMoved,
        height,
        position.y,
      );

      const newPosition = {
        ...position,
        y: newYPosition,
      };

      setPosition(newPosition);
      setSize(oldSize => ({ ...oldSize, height: newHeight }));
    },
    [height, position],
  );

  const stopScaling = React.useCallback(
    (scaledPosition: "top" | "bottom" | "left" | "right") => {
      stopDrag();

      const topWasMoved = scaledPosition === "top";
      const bottomWasMoved = scaledPosition === "bottom";
      const leftWasMoved = scaledPosition === "left";
      const rightWasMoved = scaledPosition === "right";

      const xWasChanged = leftWasMoved || rightWasMoved;
      const yWasChanged = topWasMoved || bottomWasMoved;

      let newX = position.x;
      let newY = position.y;

      let newWidth = width;
      let newHeight = height;

      let closestValidXPosition;
      let xDifference;
      if (xWasChanged) {
        closestValidXPosition = getClosestValidYPosition(position.x);
        xDifference = position.x - closestValidXPosition;

        if (leftWasMoved) {
          // If the upper side of the Draggable was moved,
          // we need to set the new y position in addition
          // to changing the height.
          newX = position.x - xDifference;
        }

        newWidth = width + xDifference;
      }

      let closestValidYPosition;
      let yDifference;
      if (yWasChanged) {
        closestValidYPosition = getClosestValidYPosition(position.y);
        yDifference = position.y - closestValidYPosition;

        if (topWasMoved) {
          // If the upper side of the Draggable was moved,
          // we need to set the new y position in addition
          // to changing the height.
          newY = position.y - yDifference;
        }

        newHeight = height + yDifference;
      }

      const newPosition = {
        x: newX,
        y: newY,
      };

      setPosition(newPosition);

      setSize({ width: newWidth, height: newHeight });
      updateSize({ width: newWidth, height: newHeight });
    },
    [
      getClosestValidYPosition,
      height,
      position.x,
      position.y,
      stopDrag,
      updateSize,
      width,
    ],
  );

  return (
    <button
      ref={elementRef}
      type="button"
      /* Use draggable="true" to benefit from screen readers' understanding of the property */
      draggable="true"
      /* Prevent default because we implement drag ourselves */
      onDragStart={preventDefault}
      aria-grabbed={isDragging}
      className={styles.draggable}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y}px)`,
        width,
        height,
      }}
      aria-label={labelText}
      onMouseUp={stopDrag}
      onTouchEnd={stopDrag}
    >
      <ScaleHandle
        position="top"
        onScale={newPosition => scaleVertical(newPosition, true)}
        onScaleStop={() => stopScaling("top")}
        labelText={verticalScaleHandleLabelText}
      />
      <ScaleHandle
        position="right"
        onScale={newPosition => scaleHorizontal(newPosition, false)}
        onScaleStop={() => stopScaling("right")}
        labelText={horizontalScaleHandleLabelText}
      />
      <ScaleHandle
        position="bottom"
        onScale={newPosition => scaleVertical(newPosition, false)}
        onScaleStop={() => stopScaling("bottom")}
        labelText={verticalScaleHandleLabelText}
      />
      <ScaleHandle
        position="left"
        onScale={newPosition => scaleHorizontal(newPosition, true)}
        onScaleStop={() => stopScaling("left")}
        labelText={horizontalScaleHandleLabelText}
      />
    </button>
  );
};
