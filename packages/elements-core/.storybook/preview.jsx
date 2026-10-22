import '../src/styles.css';

import { Box, Provider as MosaicProvider, subscribeTheme } from '@stoplight/mosaic';
import * as React from 'react';

import { MarkdownComponentsProvider, PersistenceContextProvider, Styled } from '../src';

export * from '../../../.storybook/preview';

const ThemeProvider = (Story, context) => {
  const theme = context.globals.theme;
  React.useEffect(() => {
    subscribeTheme({ mode: theme === 'dark' ? 'dark' : 'light' });
  }, [theme]);
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
