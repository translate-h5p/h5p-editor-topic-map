import { Meta } from '@storybook/react';
import { params, parent, semantics } from '../../../.storybook/helpers/h5p.utils';
import { ArrowItemForm, ArrowItemFormProps } from './ArrowItemForm';

export default {
  title: 'Organisms/Arrow Item Form',
  component: ArrowItemForm,
} satisfies Meta<typeof ArrowItemForm>;

export const Primary = {
  args: {
    itemId: '1',
    params,
    semantics,
    parent,
  } as ArrowItemFormProps,
};
