import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import {
  params,
  parent,
  semantics,
} from '../../../.storybook/helpers/h5p.utils';
import { ArrowItemForm, ArrowItemFormProps } from './ArrowItemForm';

export default {
  title: 'Organisms/Arrow Item Form',
  component: ArrowItemForm,
} as ComponentMeta<typeof ArrowItemForm>;

const Template: ComponentStory<typeof ArrowItemForm> = (args) => (
  <ArrowItemForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  itemId: '1',
  params,
  semantics,
  parent,
} as ArrowItemFormProps;
