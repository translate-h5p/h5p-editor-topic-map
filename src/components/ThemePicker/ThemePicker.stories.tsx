import { Meta } from '@storybook/react';
import { ColorTheme } from '../../types/ColorTheme';
import { ThemePicker } from './ThemePicker';

export default {
  title: 'Atoms/ThemePicker',
  component: ThemePicker,
  args: {
    setTheme: (theme: ColorTheme) =>
      // eslint-disable-next-line no-console
      console.info(
        `Set theme to ${Object.entries(ColorTheme).find(([, value]) => theme === value)?.[0]}`
      ),
    activeTheme: ColorTheme.Red,
  },
} satisfies Meta<typeof ThemePicker>;

export const Primary = {
  args: {},
};
