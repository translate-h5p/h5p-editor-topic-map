import { Meta } from '@storybook/react';
import { params, parent, semantics } from '../../../.storybook/helpers/h5p.utils';
import { TopicMapItemForm, TopicMapItemFormProps } from './TopicMapItemForm';

export default {
  title: 'Organisms/Topic Map Item Form',
  component: TopicMapItemForm,
} satisfies Meta<typeof TopicMapItemForm>;

export const Primary = {
  args: {
    itemId: '1',
    params,
    semantics,
    parent,
    // eslint-disable-next-line no-console
    onSave: console.info,
  } satisfies TopicMapItemFormProps,
};
