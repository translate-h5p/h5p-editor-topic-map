import React from "react";
import { Position } from "../types/Position";
import { isMouseEvent } from "./event.utils";
import { clamp } from "./number.utils";

export const calculateClosestValidSizeComponent = (
  attemptedSize: number,
  gapSize: number,
  gridIndicatorSize: number,
  gridSize: number,
): number => {
  const stepSize = gridIndicatorSize + gapSize;
  const stepNumber = attemptedSize / stepSize;

  const smallerWidth = Math.floor(stepNumber) * stepSize - gapSize;
  const largerWidth = Math.ceil(stepNumber) * stepSize - gapSize;

  const smallerIsClosest =
    attemptedSize - smallerWidth < largerWidth - attemptedSize;
  const closestValidWidth = smallerIsClosest ? smallerWidth : largerWidth;

  const minimum = gridIndicatorSize;
  const maximum = gridSize;

  return clamp(minimum, closestValidWidth, maximum);
};

export const calculateClosestValidPositionComponent = (
  position: number,
  gapSize: number,
  gridIndicatorSize: number,
  gridSizeComponent: number,
  elementSizeComponent: number,
): number => {
  const stepSize = gridIndicatorSize + gapSize;

  const closestInNegativeDirection = Math.floor(position / stepSize) * stepSize;
  const closestInPositiveDirection = Math.ceil(position / stepSize) * stepSize;

  const negativeIsClosest =
    Math.abs(position - closestInNegativeDirection) <
    Math.abs(position - closestInPositiveDirection);

  const closestValue = negativeIsClosest
    ? closestInNegativeDirection
    : closestInPositiveDirection;

  const minimum = 0;
  const maximum = gridSizeComponent - elementSizeComponent;

  return clamp(minimum, closestValue, maximum);
};

/**
 * @returns {[number, number]} [the new size (width or height), the new position (x or y)]
 */
export const scale = (
  attemptedPosition: number,
  negativeSideWasMoved: boolean,
  currentSize: number,
  currentPosition: number,
  gapSize: number,
  gridIndicatorSize: number,
): [number, number] => {
  let newSize: number = currentSize;
  let newPosition: number = currentPosition;

  let difference;

  const scaleDown =
    attemptedPosition <
    currentPosition + (negativeSideWasMoved ? 0 : currentSize);

  if (negativeSideWasMoved) {
    // If the negative side (left or top) was moved,
    // we need to set a new position in addition
    // to changing the size.
    newPosition = attemptedPosition;

    difference = currentPosition - attemptedPosition;
  } else {
    difference = attemptedPosition - currentPosition;
    // -      (scaleDown ? 2 * gridIndicatorSize + gapSize : gridIndicatorSize);
  }

  newSize = currentSize + difference;

  console.log("scale", {
    difference,
    negativeSideWasMoved,
    attemptedPosition,
    currentPosition,
    newPosition,
    currentSize,
    newSize,
  });

  return [newSize, newPosition];
};

export const getPointerPositionFromEvent = (
  event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
): Position => {
  let pos: Position;
  if (isMouseEvent(event)) {
    const { clientX, clientY } = event;
    pos = { x: clientX, y: clientY };
  } else {
    const { clientX, clientY } = event.touches[0];
    pos = { x: clientX, y: clientY };
  }

  return pos;
};
