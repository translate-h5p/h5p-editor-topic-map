/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Draggable } from './Draggable';

export default {
  title: 'Molecules/Draggable',
  component: Draggable,
  args: {
    updatePosition: (newPos) => console.info('New position', newPos),
    initialXPosition: 200,
    initialYPosition: 200,
    height: 100,
    width: 100,
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
    backgroundImage:
      'https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80',
    editItem: (id: string) => console.info('Edit item', id),
    deleteItem: (id: string) => console.info('Delete item', id),
  },
} as ComponentMeta<typeof Draggable>;

const Template: ComponentStory<typeof Draggable> = (args) => (
  <Draggable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
