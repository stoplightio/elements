import '../process-shim';
import './google-fonts.css';

import { Controls, Description, Primary, PRIMARY_STORY, Subtitle, Title } from '@storybook/addon-docs/blocks';
import * as React from 'react';

import customTheme from './theme';

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
