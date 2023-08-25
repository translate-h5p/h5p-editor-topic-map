/* eslint-disable no-console */
import { Meta } from '@storybook/react';
import { Toolbar } from './Toolbar';

export default {
  title: 'Organisms/Toolbar',
  component: Toolbar,
  args: {
    setActiveTool: () => console.info('new active tool'),
  },
} satisfies Meta<typeof Toolbar>;

export const Primary = {
  args: {},
};
