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
  pointerPos: number,
  gapSize: number,
  gridIndicatorSize: number,
  position: number,
  gridSizeComponent: number,
  elementSizeComponent: number,
): number => {
  const stepSize = gridIndicatorSize + gapSize;

  const closestInNegativeDirection = Math.floor(position / stepSize) * stepSize;
  const closestInPositiveDirection = Math.ceil(position / stepSize) * stepSize;

  const negativeIsClosest =
    Math.abs(pointerPos - closestInNegativeDirection) <
    Math.abs(pointerPos - closestInPositiveDirection);

  const closestValue = negativeIsClosest
    ? closestInNegativeDirection
    : closestInPositiveDirection;

  const minimum = 0;
  const maximum = gridSizeComponent - elementSizeComponent;

  return clamp(minimum, closestValue, maximum);
};
