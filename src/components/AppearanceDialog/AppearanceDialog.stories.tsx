/* eslint-disable no-console */
import { Meta } from '@storybook/react';
import { params, parent, semantics } from '../../../.storybook/helpers/h5p.utils';
import { getBackgroundImageField } from '../../utils/H5P/form.utils';
import { AppearanceDialog } from './AppearanceDialog';

export default {
  title: 'Organisms/Appearance dialog',
  component: AppearanceDialog,
  args: {
    isOpen: true,
    setIsOpen: (isOpen) => console.info({ isOpen }),
    backgroundImageField: getBackgroundImageField(semantics)!,
    onSave: (newParams) => console.info({ params: newParams }),
    parent,
    params,
  },
} satisfies Meta<typeof AppearanceDialog>;

export const Primary = {
  args: {},
};
