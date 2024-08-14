import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls } from '@storybook/blocks';
import { Preview } from '@storybook/react';

import customTheme from './theme';

import './google-fonts.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
};

export const parameters = {
  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <Controls />
      </>
    ),
    theme: customTheme,
    toc: true, // Enables the table of contents
  },

  options: {
    storySort: {
      order: ['Public', 'Internal'],
    },
  },
};

const preview: Preview = {
  parameters,
  globalTypes,
  tags: ['autodocs'],

}
export default preview