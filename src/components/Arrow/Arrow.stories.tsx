import { Meta } from '@storybook/react';
import { ArrowItemType } from '../../types/ArrowItemType';
import { ArrowType } from '../../types/ArrowType';
import { Arrow } from './Arrow';

export default {
  title: 'Molecules/Arrow',
  component: Arrow,
  argTypes: {
    updateArrowType: {
      options: {
        Directional: ArrowType.Directional,
        'Bi-directional': ArrowType.BiDirectional,
        'Non-directional': ArrowType.NonDirectional,
      },
      control: { type: 'radio' },
    },
  },
  args: {
    cellSize: 30,
    gapSize: 15,
    gridWidth: 1000,
  },
} satisfies Meta<typeof Arrow>;

export const RightDirectionalEmptyArrow = {
  args: {
    item: {
      startPosition: { x: 100, y: 0 },
      endPosition: { x: 0, y: 0 },
    } as ArrowItemType,
  },
};

export const LeftDirectionalCompletedArrow = {
  args: {
    item: {
      startPosition: { x: 100, y: 0 },
      endPosition: { x: 0, y: 0 },
    } as ArrowItemType,
  },
};

export const BidirectionalHorizontalEmptyArrow = {
  args: {
    item: {
      startPosition: { x: 100, y: 0 },
      endPosition: { x: 0, y: 0 },
    } as ArrowItemType,
  },
};

export const UpDirectionalEditedArrow = {
  args: {
    item: {
      startPosition: { x: 0, y: 100 },
      endPosition: { x: 0, y: 0 },
    } as ArrowItemType,
  },
};

export const NonDirectionalVerticalEmptyArrow = {
  args: {
    item: {
      startPosition: { x: 0, y: 0 },
      endPosition: { x: 0, y: 100 },
    } as ArrowItemType,
  },
};
