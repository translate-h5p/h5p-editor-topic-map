export const isMouseEvent = (
  event: MouseEvent | TouchEvent,
): event is MouseEvent => (event as MouseEvent).clientX != null;

export const isTouchEvent = (
  event: MouseEvent | TouchEvent,
): event is TouchEvent => (event as TouchEvent).touches != null;

export const isReactMouseEvent = (
  event: React.MouseEvent | React.TouchEvent,
): event is React.MouseEvent => (event as React.MouseEvent).clientX != null;

export const isReactTouchEvent = (
  event: React.MouseEvent | React.TouchEvent,
): event is React.TouchEvent => (event as React.TouchEvent).touches != null;
