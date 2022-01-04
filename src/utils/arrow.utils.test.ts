import { ArrowDirection } from "../types/ArrowDirection";
import { findDirection, normalizeAngle } from "./arrow.utils";

describe("Arrow utils", () => {
  describe(findDirection.name, () => {
    it("should return the closest direction of the given angle: top", () => {
      expect(findDirection(45.01)).toBe(ArrowDirection.Up);
      expect(findDirection(90)).toBe(ArrowDirection.Up);
      expect(findDirection(134.9)).toBe(ArrowDirection.Up);
    });

    it("should return the closest direction of the given angle: right", () => {
      expect(findDirection(315)).toBe(ArrowDirection.Right);
      expect(findDirection(0)).toBe(ArrowDirection.Right);
      expect(findDirection(45)).toBe(ArrowDirection.Right);
    });

    it("should return the closest direction of the given angle: down", () => {
      expect(findDirection(314.9)).toBe(ArrowDirection.Down);
      expect(findDirection(270)).toBe(ArrowDirection.Down);
      expect(findDirection(225.1)).toBe(ArrowDirection.Down);
    });

    it("should return the closest direction of the given angle: left", () => {
      expect(findDirection(135)).toBe(ArrowDirection.Left);
      expect(findDirection(180)).toBe(ArrowDirection.Left);
      expect(findDirection(225)).toBe(ArrowDirection.Left);
    });

    it("should handle negative values", () => {
      expect(findDirection(-90)).toBe(ArrowDirection.Down);
      expect(findDirection(-450)).toBe(ArrowDirection.Down);
    });

    it("should handle values larger than 360", () => {
      expect(findDirection(450)).toBe(ArrowDirection.Up);
    });
  });

  describe(normalizeAngle.name, () => {
    it("should normalize the angle if it's larger than 360", () => {
      const angle = 450;

      const expected = 90;
      const actual = normalizeAngle(angle);

      expect(actual).toBe(expected);
    });

    it("should normalize the angle if it's smaller than 360 and larger than 0", () => {
      const angle = 90;

      const expected = 90;
      const actual = normalizeAngle(angle);

      expect(actual).toBe(expected);
    });

    it("should normalize the angle if it's smaller than 0", () => {
      const angle = -450;

      const expected = 270;
      const actual = normalizeAngle(angle);

      expect(actual).toBe(expected);
    });
  });
});
