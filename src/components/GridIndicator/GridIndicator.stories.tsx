import { ComponentStory, ComponentMeta } from '@storybook/react';

import { GridIndicator } from './GridIndicator';

export default {
  title: 'Atoms/GridIndicator',
  component: GridIndicator,
} as ComponentMeta<typeof GridIndicator>;

const Template: ComponentStory<typeof GridIndicator> = (args) => (
  <GridIndicator {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
