import * as React from "react";
import { isMouseEvent } from "../../utils/event.utils";
import styles from "./ScaleHandle.module.scss";

export type ScaleHandleProps = {
  labelText: string;
  position: "top" | "bottom" | "left" | "right";
  onScale: (newValue: number, wasMovedInPositiveDirection: boolean) => void;
};

export const ScaleHandle: React.FC<ScaleHandleProps> = ({
  labelText,
  position,
  onScale,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const isVerticalScaleHandle = ["top", "bottom"].includes(position);
  const className = styles[`scaleHandle${position.toUpperCase()}`];

  const startDrag = React.useCallback(() => {
    setIsDragging(true);
  }, []);

  const stopDrag = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const dragHorizontal = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) {
        return;
      }

      const pointerX = isMouseEvent(event)
        ? event.clientX
        : event.touches[0].clientX;

      const wasMovedInPositiveDirection = position === "right";
      onScale(pointerX, wasMovedInPositiveDirection);
    },
    [isDragging, onScale, position],
  );

  const dragVertical = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) {
        return;
      }

      const pointerY = isMouseEvent(event)
        ? event.clientY
        : event.touches[0].clientY;

      const wasMovedInPositiveDirection = position === "bottom";
      onScale(pointerY, wasMovedInPositiveDirection);
    },
    [isDragging, onScale, position],
  );

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

  return (
    <div
      ref={elementRef}
      role="button"
      tabIndex={0}
      className={`${styles.scaleHandle} ${className}`}
      aria-label={labelText}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onMouseMove={isVerticalScaleHandle ? dragVertical : dragHorizontal}
      onTouchMove={isVerticalScaleHandle ? dragVertical : dragHorizontal}
    />
  );
};
