import * as React from "react";
import { useState } from "react";
import { Position } from "../../types/Position";
import styles from "./Arrow.module.scss";
import {
  ArrowBody,
  ArrowHead,
  ArrowBodyVertical,
  MirroredArrowHead,
  ArrowHeadVertical,
  MirroredArrowHeadVertical,
} from "./ArrowParts";
import {
  ArrowDirection,
  ArrowType,
  ButtonIconState,
  getButtonIconState,
} from "./Utils";

export type ArrowProps = {
  start: Position;
  end: Position;
  arrowColor: string;
  circleColor: string;
  iconColor: string;
  type: ArrowType;
  notes: string;
  completed: boolean;
  direction: ArrowDirection;
};

export const Arrow: React.FC<ArrowProps> = ({
  start,
  end,
  arrowColor,
  type,
  notes,
  completed,
  direction,
}) => {
  let classNames = `${styles.arrow} `;
  let length;

  switch (direction) {
    case ArrowDirection.Up:
      length = { height: Math.abs(end.y - start.y) };
      classNames += styles.pointUp;
      break;
    case ArrowDirection.Down:
      length = { height: Math.abs(end.y - start.y) };
      classNames += styles.pointDown;
      break;
    case ArrowDirection.Left:
      length = { width: Math.abs(end.x - start.x) };
      classNames += styles.pointLeft;
      break;
    case ArrowDirection.Right:
      length = { width: Math.abs(end.x - start.x) };
      classNames += styles.pointRight;
      break;
  }

  const [buttonState, setButtonState] = useState(
    getButtonIconState(completed, notes),
  );

  React.useEffect(() => {
    setButtonState(getButtonIconState(completed, notes));
  }, [completed, notes]);

  if (buttonState === ButtonIconState.Empty)
    classNames += ` ${styles.emptyArrow}`;
  else classNames += ` ${styles.filledArrow}`;

  const UpOrDown =
    direction === ArrowDirection.Up || direction === ArrowDirection.Down;
  const leftOrRight =
    direction === ArrowDirection.Left || direction === ArrowDirection.Right;

  let arrow;
  switch (type) {
    case ArrowType.NonDirectional:
      arrow = (
        <div data-testid="ndArrow" className={classNames} style={length}>
          {UpOrDown && <ArrowBodyVertical arrowColor={arrowColor} />}
          {leftOrRight && <ArrowBody arrowColor={arrowColor} />}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div data-testid="bdArrow" className={classNames} style={length}>
          {UpOrDown && (
            <>
              <MirroredArrowHeadVertical arrowColor={arrowColor} />
              <ArrowBodyVertical arrowColor={arrowColor} />
              <ArrowHeadVertical arrowColor={arrowColor} />
            </>
          )}
          {leftOrRight && (
            <>
              <MirroredArrowHead arrowColor={arrowColor} />
              <ArrowBody arrowColor={arrowColor} />
              <ArrowHead arrowColor={arrowColor} />
            </>
          )}
        </div>
      );
      break;
    case ArrowType.Directional:
      arrow = (
        <div data-testid="dArrow" className={classNames} style={length}>
          {UpOrDown && (
            <>
              <ArrowBodyVertical arrowColor={arrowColor} />
              <ArrowHeadVertical arrowColor={arrowColor} />
            </>
          )}
          {leftOrRight && (
            <>
              <ArrowBody arrowColor={arrowColor} />
              <ArrowHead arrowColor={arrowColor} />
            </>
          )}
        </div>
      );
  }

  // apply shadow around arrow
  arrow = <div className={styles.shadow}>{arrow}</div>;

  return arrow;
};
