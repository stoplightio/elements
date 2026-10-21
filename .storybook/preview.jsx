import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, PRIMARY_STORY } from '@storybook/addon-docs/blocks';
import customTheme from './theme';

import './google-fonts.css';

export const tags = ['autodocs'];

export const initialGlobals = { theme: 'light' };

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
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
        <Controls of={PRIMARY_STORY} />
      </>
    ),
    theme: customTheme,
  },
  options: {
    storySort: {
      order: ['Public', 'Internal'],
    },
  },
};
