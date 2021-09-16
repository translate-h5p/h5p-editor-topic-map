export const isMouseEvent = (
  event: React.MouseEvent | React.TouchEvent,
): event is React.MouseEvent => (event as React.MouseEvent).clientX != null;

export const isTouchEvent = (
  event: React.MouseEvent | React.TouchEvent,
): event is React.TouchEvent => (event as React.TouchEvent).touches != null;
