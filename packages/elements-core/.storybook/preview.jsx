export * from '../../../.storybook/preview';

import * as React from 'react';
import { subscribeTheme, Provider as MosaicProvider, Box } from '@stoplight/mosaic';
import { PersistenceContextProvider, Styled, MarkdownComponentsProvider } from '../src';
import '../src/styles.css';

const ThemeProvider = (Story, context) => {
  const theme = context.globals.theme;
  React.useEffect(() => {
    subscribeTheme({ mode: theme === 'dark' ? 'dark' : 'light' });
  }, [subscribeTheme, theme]);
  return (
    <Box style={{ maxWidth: 1200 }} mx="auto" py={10}>
      <Story {...context} />
    </Box>
  );
};

const MosaicProviderDecorator = Story => (
  <MosaicProvider>
    <Story />
  </MosaicProvider>
);

const PersistenceBoundaryDecorator = Story => (
  <PersistenceContextProvider>
    <Story />
  </PersistenceContextProvider>
);

const MarkdownComponentsProviderDecorator = Story => (
  <MarkdownComponentsProvider>
    <Story />
  </MarkdownComponentsProvider>
);

const StyledDecorator = Story => (
  <Styled>
    <Story />
  </Styled>
);

export const decorators = [
  ThemeProvider,
  MosaicProviderDecorator,
  PersistenceBoundaryDecorator,
  StyledDecorator,
  MarkdownComponentsProviderDecorator,
];
