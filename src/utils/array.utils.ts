export const findClosest = (
  value: number,
  arr: Array<number> | ReadonlyArray<number>,
): number => {
  const noValuesInArray = arr.length === 0;
  if (noValuesInArray) {
    throw new Error("No values in array");
  }

  let closestNumber: number = arr[0];
  let currentDiff: number = Number.MAX_VALUE;

  // eslint-disable-next-line no-restricted-syntax
  for (const num of arr) {
    const diff = Math.abs(value - num);

    const isCloserThanCurrent = diff < currentDiff;
    if (isCloserThanCurrent) {
      closestNumber = num;
      currentDiff = diff;
    }
  }

  return closestNumber;
};
