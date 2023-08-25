/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dialog } from './Dialog';

const componentMeta: ComponentMeta<typeof Dialog> = {
  title: 'Molecules/Dialog',
  component: Dialog,
  args: {
    onOpenChange: console.info,
    title: 'Title',
    isOpen: true,
    description:
      'When things happen - enjoy them. They\'re little gifts. Just let this happen. We just let this flow right out of our minds. This is a fantastic little painting. A tree needs to be your friend if you\'re going to paint him.',
  },
};

export default componentMeta;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const SizeMedium = Template.bind({});
SizeMedium.args = {
  size: 'medium',
};

export const SizeLarge = Template.bind({});
SizeLarge.args = {
  size: 'large',
};
