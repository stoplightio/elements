import * as React from 'react';

import type { DocsProps } from '../components/Docs';

const DEFAULT_CONTEXT: ElementsOptionsContextProps = {};

export type ElementsOptionsContextProps = Pick<DocsProps, 'nodeHasChanged'>;

export const ElementsOptionsContext = React.createContext<ElementsOptionsContextProps>(DEFAULT_CONTEXT);

export const useOptionsCtx = () => {
  return React.useContext(ElementsOptionsContext) || DEFAULT_CONTEXT;
};

export type ProviderProps = Partial<ElementsOptionsContextProps> & {
  children: React.ReactNode;
};

export function ElementsOptionsProvider({ children, nodeHasChanged }: ProviderProps) {
  return (
    <ElementsOptionsContext.Provider value={Object.assign({}, DEFAULT_CONTEXT, { nodeHasChanged })}>
      {children}
    </ElementsOptionsContext.Provider>
  );
}
