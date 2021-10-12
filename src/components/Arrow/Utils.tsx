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

export enum ButtonIconState {
  Empty,
  Edit,
  Notes,
  Completed,
}

export const getButtonIconState = (
  completed: boolean,
  notes: string,
): ButtonIconState => {
  let tempState;
  if (completed) tempState = ButtonIconState.Completed;
  else if (notes.length !== 0) tempState = ButtonIconState.Notes;
  else tempState = ButtonIconState.Empty;
  return tempState;
};

export const findDirection = (angle: number): ArrowDirection => {
  const pointsUp = angle > 45 && angle < 135;
  const pointsDown = angle > 225 && angle < 315;
  const pointsLeft = angle >= 135 && angle <= 225;

  if (pointsUp) return ArrowDirection.Up;
  if (pointsDown) return ArrowDirection.Down;
  if (pointsLeft) return ArrowDirection.Left;
  return ArrowDirection.Right;
};

export const mouseHover = (
  buttonState: ButtonIconState,
  state: ButtonIconState,
  setButtonState: (value: ButtonIconState) => void,
): void => {
  switch (buttonState) {
    case ButtonIconState.Empty:
    case ButtonIconState.Edit:
      setButtonState(state);
      break;
  }
};
