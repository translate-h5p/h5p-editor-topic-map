import * as React from "react";
import { getPointerPositionFromEvent } from "../../utils/draggable.utils";
import { capitalize } from "../../utils/string.utils";
import styles from "./ScaleHandle.module.scss";

export type ScaleHandleProps = {
  labelText: string;
  position: "top" | "bottom" | "left" | "right";
  onScale: (newValue: number) => void;
  onScaleStop: () => void;
};

export const ScaleHandle: React.FC<ScaleHandleProps> = ({
  labelText,
  position,
  onScale,
  onScaleStop,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const isVerticalScaleHandle = ["top", "bottom"].includes(position);
  const className = styles[`scaleHandle${capitalize(position)}`];

  const startDrag = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);

      event.stopPropagation();
    },
    [],
  );

  const stopDrag = React.useCallback(() => {
    if (!isDragging) {
      return;
    }

    setIsDragging(false);
    onScaleStop();
  }, [isDragging, onScaleStop]);

  const dragHorizontal = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) {
        return;
      }

      event.stopPropagation();

      const { x } = getPointerPositionFromEvent(event);
      onScale(x);
    },
    [isDragging, onScale],
  );

  const dragVertical = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) {
        return;
      }

      event.stopPropagation();

      const { y } = getPointerPositionFromEvent(event);
      onScale(y);
    },
    [isDragging, onScale],
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
