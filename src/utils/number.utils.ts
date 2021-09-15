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
  const delta = pointerX % (gapSize + gridIndicatorSize);
  const closestToTheLeft = xPosition - delta;
  const closestToTheRight = xPosition + delta;

  const minimum = 0;
  const maximum = gridWidth - width;

  return clamp(
    minimum,
    pointerX - closestToTheLeft < closestToTheRight - pointerX
      ? closestToTheLeft
      : closestToTheRight,
    maximum,
  );
};

export const calculateClosestValidYPosition = (
  pointerY: number,
  gapSize: number,
  gridIndicatorSize: number,
  yPosition: number,
  gridHeight: number,
  height: number,
): number => {
  const delta = pointerY % (gapSize + gridIndicatorSize);
  const closestAbove = yPosition - delta;
  const closestBelow = yPosition + delta;

  const minimum = 0;
  const maximum = gridHeight - height;

  return clamp(
    minimum,
    pointerY - closestAbove < closestBelow - pointerY
      ? closestAbove
      : closestBelow,
    maximum,
  );
};
