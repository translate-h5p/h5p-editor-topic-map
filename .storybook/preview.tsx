import { Decorator } from '@storybook/react';
import * as React from 'react';
import language from '../language/en.json';
import '../src/styles.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
    },
  },
  themes: {
    default: 'Blue',
    list: [
      { name: 'Blue', class: 'theme-1', color: '#40586f' },
      { name: 'Green', class: 'theme-2', color: '#3d6060' },
      { name: 'Red', class: 'theme-3', color: '#981b1e' },
      { name: 'Grey', class: 'theme-4', color: '#373d3f' },
    ],
    target:
      '.h5p-editor-topic-map .h5p-editor-topic-map, .h5p-editor-topic-map',
    clearable: false,
  },
};

(window as any).H5PEditor.language['H5PEditor.TopicMap'] = language;

export const decorators: Array<Decorator> = [
  (Story) => (
    <div className="h5p-editor-topic-map theme-1">
      <Story />
    </div>
  ),
];
