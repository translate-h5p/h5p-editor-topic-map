import { ArrowDirection } from "../types/ArrowDirection";

export const normalizeAngle = (angle: number): number => {
  return ((angle % 360) + 360) % 360;
};

export const findDirection = (unnormalizedAngle: number): ArrowDirection => {
  const angle = normalizeAngle(unnormalizedAngle);

  const pointsUp = angle > 45 && angle < 135;
  const pointsDown = angle > 225 && angle < 315;
  const pointsLeft = angle >= 135 && angle <= 225;

  if (pointsUp) return ArrowDirection.Up;
  if (pointsDown) return ArrowDirection.Down;
  if (pointsLeft) return ArrowDirection.Left;
  return ArrowDirection.Right;
};
