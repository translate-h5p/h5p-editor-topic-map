import fc from "fast-check";
import { findClosest } from "./array.utils";
import {
  calculateClosestValidSizeComponent,
  calculateClosestValidPositionComponent,
  scale,
} from "./draggable.utils";
import { coordinateSizeToPx, coordinatePosToPx } from "./grid.utils";

describe("draggable utils", () => {
  describe(calculateClosestValidSizeComponent.name, () => {
    /*
      With these values, valid widths are
      10, 25, 40, and 55.

      The grid looks like this:
      ([ ] = grid indicator)

      [ ] [ ] [ ] [ ]
      [ ] [ ] [ ] [ ]
      [ ] [ ] [ ] [ ]
      [ ] [ ] [ ] [ ]
    */

    const validWidths: ReadonlyArray<number> = [10, 25, 40, 55];

    const gapSize = 5;
    const gridIndicatorSize = 10;
    const gridWidth = 55;

    it("should handle any number value", () =>
      fc.assert(
        fc.property(fc.double(), attemptedWidth => {
          const newWidth = calculateClosestValidSizeComponent(
            attemptedWidth,
            gapSize,
            gridIndicatorSize,
            gridWidth,
          );

          return newWidth === findClosest(attemptedWidth, validWidths);
        }),
      ));

    it("should find the closest valid width if it's larger than the value", () => {
      const width = 26;

      const expectedWidth = 25;
      const actualWidth = calculateClosestValidSizeComponent(
        width,
        gapSize,
        gridIndicatorSize,
        gridWidth,
      );

      expect(actualWidth).toBe(expectedWidth);
    });

    it("should find the closest valid width if it's smaller than the value (floor)", () => {
      const width = 32;

      const expectedWidth = 25;
      const actualWidth = calculateClosestValidSizeComponent(
        width,
        gapSize,
        gridIndicatorSize,
        gridWidth,
      );

      expect(actualWidth).toBe(expectedWidth);
    });

    it("should find the closest valid width if it's smaller than the value (ceil)", () => {
      const width = 33;

      const expectedWidth = 40;
      const actualWidth = calculateClosestValidSizeComponent(
        width,
        gapSize,
        gridIndicatorSize,
        gridWidth,
      );

      expect(actualWidth).toBe(expectedWidth);
    });

    it("should find the closest valid width even if it's really close to the middle point", () => {
      const width = 26;

      const expectedWidth = 25;
      const actualWidth = calculateClosestValidSizeComponent(
        width,
        gapSize,
        gridIndicatorSize,
        gridWidth,
      );

      expect(actualWidth).toBe(expectedWidth);
    });

    it("should handle negative numbers", () => {
      const width = -1;

      const expectedWidth = 10;
      const actualWidth = calculateClosestValidSizeComponent(
        width,
        gapSize,
        gridIndicatorSize,
        gridWidth,
      );

      expect(actualWidth).toBe(expectedWidth);
    });
    it("should handle far too big numbers", () => {
      const width = Number.MAX_VALUE;

      const expectedWidth = 55;
      const actualWidth = calculateClosestValidSizeComponent(
        width,
        gapSize,
        gridIndicatorSize,
        gridWidth,
      );

      expect(actualWidth).toBe(expectedWidth);
    });
  });

  describe(calculateClosestValidPositionComponent.name, () => {
    /*
      With these values, valid x positions are
      0, 15, 30, and 45 if the element is exactly
      one gridIndicatorSize wide (1).

      The grid looks like this:
      ([ ] = grid indicator)

      [ ] [ ] [ ] [ ]
      [ ] [ ] [ ] [ ]
      [ ] [ ] [ ] [ ]
      [ ] [ ] [ ] [ ]
    */

    const validXPositions: ReadonlyArray<number> = [0, 15, 30, 45];

    const gapSize = 5;
    const gridIndicatorSize = 10;
    const width = gridIndicatorSize;
    const gridWidth = 55;

    it("should handle all number values", () =>
      fc.assert(
        fc.property(fc.double(), attemptedXPosition => {
          const xPosition = calculateClosestValidPositionComponent(
            attemptedXPosition,
            gapSize,
            gridIndicatorSize,
            gridWidth,
            width,
          );

          return xPosition === findClosest(attemptedXPosition, validXPositions);
        }),
      ));

    it("should place the element on the first valid position if it's placed to the left of the grid", () => {
      const attemptedXPosition = -100;

      const expectedXPos = 0;
      const actualXPos = calculateClosestValidPositionComponent(
        attemptedXPosition,
        gapSize,
        gridIndicatorSize,
        gridWidth,
        width,
      );

      expect(actualXPos).toBe(expectedXPos);
    });

    it("should place the element on the last valid position if it's placed to the right of the grid", () => {
      const attemptedXPosition = Number.MAX_VALUE;

      const expectedXPos = 45;
      const actualXPos = calculateClosestValidPositionComponent(
        attemptedXPosition,
        gapSize,
        gridIndicatorSize,
        gridWidth,
        width,
      );

      expect(actualXPos).toBe(expectedXPos);
    });

    it("should place the element on the closest position, even if it's close to the middle point (floor)", () => {
      const attemptedXPosition = 7;

      const expectedXPos = 0;
      const actualXPos = calculateClosestValidPositionComponent(
        attemptedXPosition,
        gapSize,
        gridIndicatorSize,
        gridWidth,
        width,
      );

      expect(actualXPos).toBe(expectedXPos);
    });

    it("should place the element on the closest position, even if it's close to the middle point (ceil)", () => {
      const attemptedXPosition = 8;

      const expectedXPos = 15;
      const actualXPos = calculateClosestValidPositionComponent(
        attemptedXPosition,
        gapSize,
        gridIndicatorSize,
        gridWidth,
        width,
      );

      expect(actualXPos).toBe(expectedXPos);
    });
  });

  describe(scale.name, () => {
    /*
      We have placed an element in (15, 15) with the dimensions w: 25, h: 25.
      Possible widths are 10, 25, 40, and 55.
      
      The grid looks like this:
      ([ ] = grid indicator)
      ([x] = our 2*2 element)

          0  15  30  45
       0 [ ] [ ] [ ] [ ]
      15 [ ] [x] [x] [ ]
      30 [ ] [x] [x] [ ]
      45 [ ] [ ] [ ] [ ]
    */

    const gapSize = 5;
    const gridIndicatorSize = 10;

    const pos = (coordinate: number): number =>
      coordinatePosToPx(coordinate, gapSize, gridIndicatorSize);
    const size = (coordinate: number): number =>
      coordinateSizeToPx(coordinate, gapSize, gridIndicatorSize);

    const width = size(2);
    const xPosition = pos(1);

    it("should add the difference in size when moving the right edge to the right", () => {
      const attemptedPosition = size(3);
      const negativeSideWasMoved = false;

      const expectedWidth = size(3);
      const expectedXPosition = pos(1);

      const [actualWidth, actualXPosition] = scale(
        attemptedPosition,
        negativeSideWasMoved,
        width,
        xPosition,
        gapSize,
        gridIndicatorSize,
      );

      expect(actualWidth).toBe(expectedWidth);
      expect(actualXPosition).toBe(expectedXPosition);
    });

    it("should add the difference in size, and move the position to the left when scaling to the left", () => {
      const attemptedPosition = pos(0);
      const negativeSideWasMoved = true;

      const expectedWidth = size(3);
      const expectedXPosition = pos(0);

      const [actualWidth, actualXPosition] = scale(
        attemptedPosition,
        negativeSideWasMoved,
        width,
        xPosition,
        gapSize,
        gridIndicatorSize,
      );

      expect(actualWidth).toBe(expectedWidth);
      expect(actualXPosition).toBe(expectedXPosition);
    });

    it("should make the element smaller if we move the right edge to the left", () => {
      const attemptedPosition = size(2);
      const negativeSideWasMoved = false;

      const expectedWidth = size(1);
      const expectedXPosition = pos(1);

      const [actualWidth, actualXPosition] = scale(
        attemptedPosition,
        negativeSideWasMoved,
        width,
        xPosition,
        gapSize,
        gridIndicatorSize,
      );

      expect(actualWidth).toBe(expectedWidth);
      expect(actualXPosition).toBe(expectedXPosition);
    });

    it("should make the element smaller, and move the left edge to the right if we move the left edge to the right", () => {
      const attemptedPosition = pos(2);
      const negativeSideWasMoved = true;

      const expectedWidth = size(1);
      const expectedXPosition = pos(2);

      const [actualWidth, actualXPosition] = scale(
        attemptedPosition,
        negativeSideWasMoved,
        width,
        xPosition,
        gapSize,
        gridIndicatorSize,
      );

      expect(actualWidth).toBe(expectedWidth);
      expect(actualXPosition).toBe(expectedXPosition);
    });
  });
});
