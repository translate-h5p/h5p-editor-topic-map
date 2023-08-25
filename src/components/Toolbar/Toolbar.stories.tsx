/* eslint-disable no-console */
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Toolbar } from './Toolbar';

export default {
  title: 'Organisms/Toolbar',
  component: Toolbar,
  args: {
    setActiveTool: () => console.info('new active tool'),
  },
} as ComponentMeta<typeof Toolbar>;

const Template: ComponentStory<typeof Toolbar> = (args) => <Toolbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
