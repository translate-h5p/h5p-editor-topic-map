export enum ArrowType {
  Directional,
  BiDirectional,
  NonDirectional,
}

export enum ArrowDirection {
  Up,
  Down,
  Left,
  Right,
}

export const findDirection = (angle: number): ArrowDirection => {
  const pointsUp = angle > 45 && angle < 135;
  const pointsDown = angle > 225 && angle < 315;
  const pointsLeft = angle >= 135 && angle <= 225;

  if (pointsUp) return ArrowDirection.Up;
  if (pointsDown) return ArrowDirection.Down;
  if (pointsLeft) return ArrowDirection.Left;
  return ArrowDirection.Right;
};
