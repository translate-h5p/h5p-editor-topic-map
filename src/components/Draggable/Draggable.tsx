import * as React from "react";
import { Position } from "../../types/Position";
import { Size } from "../../types/Size";
import { isMouseEvent, isReactMouseEvent } from "../../utils/event.utils";
import {
  calculateClosestValidSizeComponent,
  calculateClosestValidPositionComponent,
  scale,
} from "../../utils/draggable.utils";
import { ScaleHandle } from "../ScaleHandle/ScaleHandle";
import styles from "./Draggable.module.scss";

/* TODO: Translate */
const labelTexts = {
  selected: "Press arrow keys to move. Press escape to unselect.",
  notSelected: "Press enter to select",
};

export type DraggableProps = {
  initialXPosition: number;
  initialYPosition: number;
  updatePosition: (newPosition: Position) => void;
  initialWidth: number;
  initialHeight: number;
  updateSize: (newSize: Size) => void;
  gapSize: number;
  gridIndicatorSize: number;
  gridSize: Size;
};

export const Draggable: React.FC<DraggableProps> = ({
  initialXPosition,
  initialYPosition,
  updatePosition,
  initialWidth,
  initialHeight,
  updateSize,
  gapSize,
  gridIndicatorSize,
  gridSize,
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

  React.useEffect(
    () =>
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
      }),
    [
      gapSize,
      gridIndicatorSize,
      gridSize.height,
      gridSize.width,
      height,
      initialXPosition,
      initialYPosition,
      width,
    ],
  );

  const elementRef = React.useRef<HTMLButtonElement>(null);

  const startDrag = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      setIsSelected(true);

      let x: number;
      let y: number;

      if (isReactMouseEvent(event)) {
        x = event.clientX;
        y = event.clientY;
      } else {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      }

      setPointerStartPosition({
        x: x - position.x,
        y: y - position.y,
      });
    },
    [position],
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
  const stopDrag = React.useCallback(() => {
    console.log("stopping drag", isDragging);
    const { x, y } = position;

    const closestValidXPosition = getClosestValidXPosition(x);
    const closestValidYPosition = getClosestValidYPosition(y);

    if (closestValidXPosition != null && closestValidYPosition != null) {
      const newPosition = getNewPosition(
        closestValidXPosition,
        closestValidYPosition,
      );
      setPosition(newPosition);

      updatePosition(newPosition);
    }

    setPointerStartPosition(null);
    setIsDragging(false);
  }, [
    position,
    getClosestValidXPosition,
    getClosestValidYPosition,
    getNewPosition,
    updatePosition,
  ]);

  const drag = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDragging || !pointerStartPosition) {
        return;
      }

      let pos: Position;
      if (isMouseEvent(event)) {
        const { clientX, clientY } = event;
        pos = { x: clientX, y: clientY };
      } else {
        const { clientX, clientY } = event.touches[0];
        pos = { x: clientX, y: clientY };
      }

      const newPosition = getNewPosition(
        pos.x - pointerStartPosition.x,
        pos.y - pointerStartPosition.y,
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
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);

    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag);

    return () => {
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);

      window.removeEventListener("mousemove", drag);
      window.removeEventListener("touchmove", drag);
    };
  }, [drag, stopDrag]);

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
        zIndex: isDragging ? 1 : undefined,
      }}
      aria-label={labelText}
    >
      ({(position.x / (gridIndicatorSize + gapSize)).toFixed(2)},{" "}
      {(position.y / (gridIndicatorSize + gapSize)).toFixed(2)})
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
