import * as React from 'react';
import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs/blocks';
import customTheme from './theme';

import '../../elements-core/src/styles/styles.scss';

import cn from 'classnames';
import { PersistenceContextProvider } from '@stoplight/elements-core';

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

const ThemeProvider = (Story, context) => {
  const theme = context.globals.theme;
  return (
    <div className={cn({ 'bp3-dark bg-gray-8': theme === 'dark' })}>
      <Story {...context} />
    </div>
  );
};

const PersistenceBoundaryDecorator = (Story) => (
  <PersistenceContextProvider><Story /></PersistenceContextProvider>
);

const MosaicProviderDecorator = Story => (
  <MosaicProvider>
    <Story />
  </MosaicProvider>
);

export const decorators = [ThemeProvider, MosaicProviderDecorator, PersistenceBoundaryDecorator];

export const parameters = {
  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
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
