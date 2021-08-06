export * from '../../../.storybook/preview';

import * as React from "react";
import {subscribeTheme, Provider as MosaicProvider} from "@stoplight/mosaic";
import {PersistenceContextProvider, Styled} from "../src";
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

const MosaicProviderDecorator = (Story) => (
  <MosaicProvider><Story/></MosaicProvider>
);

const PersistenceBoundaryDecorator = (Story) => (
  <PersistenceContextProvider><Story /></PersistenceContextProvider>
);

const StyledDecorator = (Story) => (
  <Styled><Story/></Styled>
);

export const decorators = [ThemeProvider, MosaicProviderDecorator, PersistenceBoundaryDecorator, StyledDecorator];