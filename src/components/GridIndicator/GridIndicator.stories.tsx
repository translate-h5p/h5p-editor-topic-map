import { Meta, StoryObj } from '@storybook/react';
import { GridIndicator } from './GridIndicator';

export default {
  title: 'Atoms/GridIndicator',
  component: GridIndicator,
} satisfies Meta<typeof GridIndicator>;

type Story = StoryObj<typeof GridIndicator>;

export const Primary: Story = {
  args: {
    position: { x: 0, y: 0 },
  },
};
