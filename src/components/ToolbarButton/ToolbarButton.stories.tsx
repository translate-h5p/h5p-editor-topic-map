/* eslint-disable no-console */
import { Meta } from '@storybook/react';
import { ToolbarButtonType } from '../Toolbar/Toolbar';

import { ToolbarButton } from './ToolbarButton';

export default {
  title: 'Atoms/ToolbarButton',
  component: ToolbarButton,
  args: {
    icon: ToolbarButtonType.MapAppearance,
    onClick: () => console.info('Toolbar button clicked'),
    label: 'Map Appearance',
    showActive: false,
    active: false,
  },
} satisfies Meta<typeof ToolbarButton>;

export const Primary = {
  args: {},
};

export const Active = {
  args: {
    showActive: true,
    active: true,
  },
};
