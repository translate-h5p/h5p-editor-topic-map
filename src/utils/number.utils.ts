export const clamp = (min: number, value: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const calculateClosestValidWidth = (
  width: number,
  gapSize: number,
  gridIndicatorSize: number,
  gridWidth: number,
): number => {
  const delta = width % (gapSize + gridIndicatorSize);
  const largerWidth = width + delta;
  const smallerWidth = width - delta;

  const widthWithSmallestDiff =
    largerWidth - width < width - smallerWidth ? largerWidth : smallerWidth;
  return clamp(gridIndicatorSize, widthWithSmallestDiff - gapSize, gridWidth);
};

export const calculateClosestValidHeight = (
  height: number,
  gapSize: number,
  gridIndicatorSize: number,
  gridHeight: number,
): number => {
  const delta = height % (gapSize + gridIndicatorSize);
  const largerHeight = height + delta;
  const smallerHeight = height - delta;

  const heightWithSmallestDiff =
    largerHeight - height < height - smallerHeight
      ? largerHeight
      : smallerHeight;
  return clamp(gridIndicatorSize, heightWithSmallestDiff - gapSize, gridHeight);
};

export const calculateClosestValidXPosition = (
  pointerX: number,
  gapSize: number,
  gridIndicatorSize: number,
  xPosition: number,
  gridWidth: number,
  width: number,
): number => {
  const closestToTheLeft =
    Math.floor(xPosition / (gridIndicatorSize + gapSize)) *
    (gridIndicatorSize + gapSize);

  const closestToTheRight =
    Math.ceil(xPosition / (gridIndicatorSize + gapSize)) *
    (gridIndicatorSize + gapSize);

  let closestValue;
  const leftIsClosest =
    Math.abs(pointerX - closestToTheLeft) <
    Math.abs(pointerX - closestToTheRight);

  if (leftIsClosest) {
    closestValue = closestToTheLeft;
  } else {
    closestValue = closestToTheRight;
  }

  const minimum = 0;
  const maximum = gridWidth - width;
  return clamp(minimum, closestValue, maximum);
};

export const calculateClosestValidYPosition = (
  pointerY: number,
  gapSize: number,
  gridIndicatorSize: number,
  yPosition: number,
  gridHeight: number,
  height: number,
): number => {
  const closestAbove =
    Math.floor(yPosition / (gridIndicatorSize + gapSize)) *
    (gridIndicatorSize + gapSize);
  const closestBelow =
    Math.ceil(yPosition / (gridIndicatorSize + gapSize)) *
    (gridIndicatorSize + gapSize);

  let closestValue;
  const belowIsClosest =
    Math.abs(pointerY - closestAbove) > Math.abs(pointerY - closestBelow);

  if (belowIsClosest) {
    closestValue = closestBelow;
  } else {
    closestValue = closestAbove;
  }

  const minimum = 0;
  const maximum = gridHeight - height;
  return clamp(minimum, closestValue, maximum);
};
