import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs/blocks';
import customTheme from './theme';

import '../src/styles/elements-core-scoped.scss';

import cn from 'classnames';
import { Provider } from '../src/containers/Provider';
import { PersistenceContextProvider } from '../src/context/Persistence';

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

const ProviderDecorator = (Story) => (
  <Provider host="http://stoplight-local.com:8080" workspace="elements" project="public-apis">
    <Story />
  </Provider>
);

const PersistenceBoundaryDecorator = (Story) => (
  <PersistenceContextProvider><Story /></PersistenceContextProvider>
);

const MosaicProviderDecorator = (Story) => (
  <MosaicProvider><Story/></MosaicProvider>
);

const RouterProviderDecorator = (Story) => (
  <BrowserRouter><Story/></BrowserRouter>
);

export const decorators = [ThemeProvider, ProviderDecorator, MosaicProviderDecorator, PersistenceBoundaryDecorator, RouterProviderDecorator];

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
