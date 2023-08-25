/* eslint-disable no-console */
import { Meta } from '@storybook/react';
import { Draggable } from './Draggable';

export default {
  title: 'Molecules/Draggable',
  component: Draggable,
  args: {
    updatePosition: (newPos) => console.info('New position', newPos),
    initialXPosition: 200,
    initialYPosition: 200,
    gapSize: 10,
    cellSize: 10,
    gridSize: {
      width: 200,
      height: 100,
    },
    initialHeight: 45,
    initialWidth: 95,
    id: '1',
    occupiedCells: [],
    editItem: (id: string) => console.info('Edit item', id),
  },
} satisfies Meta<typeof Draggable>;

export const Primary = {
  args: {},
};
