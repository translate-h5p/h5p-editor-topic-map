import * as React from "react";
import { Position } from "../../types/Position";
import { Size } from "../../types/Size";
import { isMouseEvent } from "../../utils/event.utils";
import { clamp } from "../../utils/number.utils";
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
  const [position, setPosition] = React.useState<Position>({
    x: initialXPosition,
    y: initialYPosition,
  });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false);
  const [labelText, setLabelText] = React.useState(labelTexts.notSelected);
  const [pointerStartPosition, setPointerStartPosition] =
    React.useState<Position | null>(null);
  const [{ width, height }, setSize] = React.useState<Size>({
    width: initialWidth,
    height: initialHeight,
  });
  const elementRef = React.useRef<HTMLButtonElement>(null);

  const startDrag = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      setIsSelected(true);

      let x: number;
      let y: number;

      if (isMouseEvent(event)) {
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
    x => {
      const closestToTheLeft = x - (x % (gapSize + gridIndicatorSize));
      const closestToTheRight = x + (x % (gapSize + gridIndicatorSize));

      const minimum = 0;
      const maximum = gridSize.width - width;

      return clamp(
        minimum,
        x - closestToTheLeft < closestToTheRight - x
          ? closestToTheLeft
          : closestToTheRight,
        maximum,
      );
    },
    [gapSize, gridIndicatorSize, gridSize.width, width],
  );

  const getClosestValidYosition = React.useCallback(
    y => {
      const closestAbove = y - (y % (gapSize + gridIndicatorSize));
      const closestBelow = y + (y % (gapSize + gridIndicatorSize));

      const minimum = 0;
      const maximum = gridSize.height - height;

      return clamp(
        minimum,
        y - closestAbove < closestBelow - y ? closestAbove : closestBelow,
        maximum,
      );
    },
    [gapSize, gridIndicatorSize, gridSize.height, height],
  );

  const stopDrag = React.useCallback(() => {
    if (!isDragging || !pointerStartPosition) {
      return;
    }

    const { x, y } = position;

    const closestValidXPosition = getClosestValidXPosition(x);
    const closestValidYPosition = getClosestValidYosition(y);

    if (closestValidXPosition != null && closestValidYPosition != null) {
      const newPosition = getNewPosition(
        closestValidXPosition,
        closestValidYPosition,
      );
      setPosition(newPosition);
    }

    setPointerStartPosition(null);
    setIsDragging(false);
  }, [
    isDragging,
    pointerStartPosition,
    position,
    getClosestValidXPosition,
    getClosestValidYosition,
    getNewPosition,
  ]);

  const drag = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
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

    return () => {
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [stopDrag]);

  const scaleHorizontal = React.useCallback(
    (pointerX: number, isLeft: boolean) => {
      let newWidth: number = width;
      let newX: number = position.x;

      const closestValidXPosition = getClosestValidXPosition(pointerX);
      const xDifference = position.x - closestValidXPosition;

      if (isLeft) {
        // If the left side of the Draggable was moved,
        // we need to set the new x position in addition
        // to changing the width.
        newX = xDifference;
      }
      newWidth = width - xDifference;

      const newPosition = {
        ...position,
        x: newX,
      };
      setPosition(newPosition);

      setSize(oldSize => ({ ...oldSize, width: newWidth }));
    },
    [getClosestValidXPosition, position, width],
  );

  const scaleVertical = React.useCallback(
    (pointerY: number, isTop: boolean) => {
      let newHeight: number = height;
      let newY: number = position.y;

      const closestValidYPosition = getClosestValidYosition(pointerY);
      const yDifference = position.y - closestValidYPosition;

      if (isTop) {
        // If the upper side of the Draggable was moved,
        // we need to set the new y position in addition
        // to changing the height.
        newY = position.y - yDifference;
      }
      newHeight = height + yDifference;

      const newPosition = {
        ...position,
        y: newY,
      };
      setPosition(newPosition);

      setSize(oldSize => ({ ...oldSize, height: newHeight }));
    },
    [getClosestValidYosition, height, position],
  );

  React.useEffect(() => {
    updateSize({ width, height });
  }, [updateSize, width, height]);

  React.useEffect(() => {
    updatePosition(position);
  }, [updatePosition, position]);

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
      onMouseMove={drag}
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y}px)`,
        width,
        height,
        zIndex: isDragging ? 1 : undefined,
      }}
      aria-label={labelText}
    >
      <ScaleHandle
        position="top"
        onScale={scaleVertical}
        labelText={verticalScaleHandleLabelText}
      />

      <ScaleHandle
        position="right"
        onScale={scaleHorizontal}
        labelText={horizontalScaleHandleLabelText}
      />

      <ScaleHandle
        position="bottom"
        onScale={scaleVertical}
        labelText={verticalScaleHandleLabelText}
      />

      <ScaleHandle
        position="left"
        onScale={scaleHorizontal}
        labelText={horizontalScaleHandleLabelText}
      />
    </button>
  );
};
