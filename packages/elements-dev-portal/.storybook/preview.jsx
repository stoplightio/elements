import * as React from 'react';
import { Provider as MosaicProvider, subscribeTheme } from '@stoplight/mosaic';

import { PersistenceContextProvider, Styled } from '@stoplight/elements-core';
import { DevPortalProvider } from '../src/components/DevPortalProvider';

export * from '../../../.storybook/preview';

import '../src/styles.css';


const ThemeProvider = (Story, context) => {
  const theme = context.globals.theme;
  React.useEffect(() => {
    subscribeTheme({ mode: theme === 'dark' ? 'dark' : 'light' });
  }, [subscribeTheme, theme]);
  return (
    <Story {...context} />
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

const DevPortalProviderDecorator = (Story, context) => {
  return (
    <DevPortalProvider platformUrl={context.args.platformUrl}>
      <Story />
    </DevPortalProvider>
  );
};

const StyledDecorator = Story => (
  <Styled>
    <Story />
  </Styled>
);

export const decorators = [ThemeProvider, MosaicProviderDecorator, PersistenceBoundaryDecorator, DevPortalProviderDecorator, StyledDecorator];
