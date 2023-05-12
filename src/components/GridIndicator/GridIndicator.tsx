import * as React from 'react';
import { Position } from '../../types/Position';
import styles from './GridIndicator.module.scss';

export type GridIndicatorProps = {
  onMouseDown: () => void;
  onMouseEnter: () => void;
  label: string;
  position: Position;
};

export const GridIndicator: React.FC<GridIndicatorProps> = React.memo(
  ({ onMouseDown, onMouseEnter, label, position }) => {
    return (
      <button
        type="button"
        className={`grid-indicator ${styles.gridIndicator}`}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onTouchStart={onMouseDown}
        onTouchMove={onMouseEnter}
        aria-label={label}
        data-grid-indicator="true"
        data-x={position.x}
        data-y={position.y}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.onMouseDown === nextProps.onMouseDown &&
    prevProps.onMouseEnter === nextProps.onMouseEnter,
);
