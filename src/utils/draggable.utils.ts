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
): [number, number] => {
  let newSize: number = currentSize;
  let newPosition: number = currentPosition;

  const difference =
    currentPosition -
    (negativeSideWasMoved ? 0 : currentSize) -
    attemptedPosition;

  if (negativeSideWasMoved) {
    // If the negative side (left or top) was moved,
    // we need to set a new position in addition
    // to changing the size.
    newPosition = attemptedPosition;
  }

  newSize = currentSize + difference;

  return [newSize, newPosition];
};
