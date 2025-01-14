import * as React from "react";
import { capitalize } from "../../utils/string.utils";
import styles from "./ScaleHandle.module.scss";

export type ScaleHandleProps = {
  labelText: string;
  position:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-right"
    | "bottom-right"
    | "bottom-left"
    | "top-left";
  onScaleStop: () => void;
  onScaleStart: () => void;
};

export const ScaleHandle: React.FC<ScaleHandleProps> = ({
  labelText,
  position,
  onScaleStop,
  onScaleStart,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const className =
    styles[`scaleHandle${position.split("-").map(capitalize).join("")}`];

  const startDrag = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      onScaleStart();

      event.stopPropagation();
    },
    [onScaleStart],
  );

  const stopDrag = React.useCallback(() => {
    if (!isDragging) {
      return;
    }

    setIsDragging(false);
    onScaleStop();
  }, [isDragging, onScaleStop]);

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
    />
  );
};
