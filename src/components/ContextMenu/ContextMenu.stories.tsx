import { Meta } from '@storybook/react';
import { ContextMenu, ContextMenuButtonType } from './ContextMenu';

export default {
  title: 'Molecules/ContextMenu',
  component: ContextMenu,
  args: {
    show: true,
    actions: [
      {
        icon: ContextMenuButtonType.Edit,
        label: 'Edit',
        // eslint-disable-next-line no-alert
        onClick: () => alert('Edit'),
      },
      {
        icon: ContextMenuButtonType.Delete,
        label: 'Delete',
        // eslint-disable-next-line no-alert
        onClick: () => alert('Delete'),
      },
    ],
  },
  render: (args) => <div
    style={{
      position: 'absolute',
      left: '0px',
      top: '0px',
      transform: 'translate(10%, 10%) translate(16px, 80px)',
      display: 'inline-flex',
    }}
  >
    <ContextMenu {...args} />
  </div>
} satisfies Meta<typeof ContextMenu>;

export const Primary = {
  args: {},
};

export const ManyActions = {
  args: {
    actions: [
      {
        icon: ContextMenuButtonType.Edit,
        label: 'Edit',
        // eslint-disable-next-line no-alert
        onClick: () => alert('Edit'),
      },
      {
        icon: ContextMenuButtonType.ArrowDirectional,
        label: 'Directional arrow',
        // eslint-disable-next-line no-alert
        onClick: () => alert('Directional arrow'),
      },

      {
        icon: ContextMenuButtonType.ArrowBiDirectional,
        label: 'Bi-directional arrow',
        // eslint-disable-next-line no-alert
        onClick: () => alert('Bi-directional arrow'),
      },

      {
        icon: ContextMenuButtonType.ArrowNonDirectional,
        label: 'Arrow without direction',
        // eslint-disable-next-line no-alert
        onClick: () => alert('Arrow without direction'),
      },
      {
        icon: ContextMenuButtonType.Delete,
        label: 'Delete',
        // eslint-disable-next-line no-alert
        onClick: () => alert('Delete'),
      },
    ],
  },
};
