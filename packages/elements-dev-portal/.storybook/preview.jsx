import * as React from 'react';
import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs/blocks';
import customTheme from './theme';

import '../../elements-core/src/styles/styles.scss';

import cn from 'classnames';

import { Provider as ElementsProvider } from '@stoplight/elements-core/containers/Provider';
import { PersistenceContextProvider } from '@stoplight/elements-core/context/Persistence';
import { Styled } from '@stoplight/elements-core/styled';
import { DevPortalProvider } from '../src/components/DevPortalProvider';

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

const ElementsProviderDecorator = (Story) => (
  <ElementsProvider host="http://stoplight-local.com:8080" workspace="elements" project="public-apis">
    <Story />
  </ElementsProvider>
);

const PersistenceBoundaryDecorator = (Story) => (
  <PersistenceContextProvider><Story /></PersistenceContextProvider>
);

const MosaicProviderDecorator = (Story) => (
  <MosaicProvider><Story/></MosaicProvider>
);

const DevPortalProviderDecorator = (Story, context) => {
  return (<DevPortalProvider platformUrl={context.args.platformUrl}><Story/></DevPortalProvider>);
}

const StyledDecorator = (Story) => (
  <Styled><Story/></Styled>
);

export const decorators = [ThemeProvider, ElementsProviderDecorator, MosaicProviderDecorator, PersistenceBoundaryDecorator, DevPortalProviderDecorator, StyledDecorator];

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
