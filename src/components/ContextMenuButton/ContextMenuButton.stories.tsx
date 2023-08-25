/* eslint-disable no-console */
import { Meta } from '@storybook/react';
import { ContextMenuButtonType } from '../ContextMenu/ContextMenu';

import { ContextMenuButton } from './ContextMenuButton';

export default {
  title: 'Atoms/ContextMenuButton',
  component: ContextMenuButton,
  args: {
    icon: ContextMenuButtonType.Delete,
    onClick: () => console.info('Toolbar button clicked'),
    label: 'Delete',
  },
} satisfies Meta<typeof ContextMenuButton>;

export const Primary = {
  args: {},
};
