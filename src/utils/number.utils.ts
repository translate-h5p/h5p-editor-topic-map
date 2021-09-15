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
  
  gapSize = (gapSize / 2) - 6;
  const closestToTheLeft = Math.floor(xPosition / (gridIndicatorSize + gapSize)) * (gridIndicatorSize + gapSize);
  const closestToTheRight = Math.ceil(xPosition / (gridIndicatorSize + gapSize)) * (gridIndicatorSize + gapSize);

  if(Math.abs(pointerX - closestToTheRight) > Math.abs(pointerX - closestToTheLeft))
  {
    return closestToTheLeft;
  } else {
    return closestToTheRight;
  }

};

export const calculateClosestValidYPosition = (
  pointerY: number,
  gapSize: number,
  gridIndicatorSize: number,
  yPosition: number,
  gridHeight: number,
  height: number,
): number => {
  gapSize = (gapSize / 2) - 6;
  const closestAbove = Math.floor(yPosition / (gridIndicatorSize + gapSize)) * (gridIndicatorSize + gapSize);
  const closestBelow = Math.ceil(yPosition / (gridIndicatorSize + gapSize)) * (gridIndicatorSize + gapSize);

  if(Math.abs(pointerY - closestAbove) > Math.abs(pointerY - closestBelow))
  {
    return closestBelow;
  } else {
    return closestAbove;
  }

  // const delta = pointerY % (gapSize + gridIndicatorSize);
  // const closestAbove = yPosition - delta;
  // const closestBelow = yPosition + delta;

  // const minimum = 0;
  // const maximum = gridHeight - height;

  // return clamp(
  //   minimum,
  //   pointerY - closestAbove < closestBelow - pointerY
  //     ? closestAbove
  //     : closestBelow,
  //   maximum,
  // );
};
