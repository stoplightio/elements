import { CustomComponentMapping as MDVCustomComponentMapping } from '@stoplight/markdown-viewer';
import { defaults } from 'lodash';
import * as React from 'react';

import { CodeComponent } from './CodeComponent';

export type CustomComponentMapping = MDVCustomComponentMapping;

const MarkdownComponentsContext = React.createContext<CustomComponentMapping | undefined>(undefined);
MarkdownComponentsContext.displayName = 'MarkdownComponentsContext';

export const useMarkdownComponents = () => React.useContext(MarkdownComponentsContext) ?? defaultComponents;

interface MarkdownComponentsProviderProps {
  value: Partial<CustomComponentMapping> | undefined;
}

const defaultComponents: CustomComponentMapping = {
  code: CodeComponent,
};

/**
 * Provides components to markdown-viewer.
 * Unlike a traditional context object, components not explicitly specified in `value` will inherit from the closest parent ComponentsProvider (if any).
 */
export const MarkdownComponentsProvider: React.FC<MarkdownComponentsProviderProps> = ({ value, children }) => {
  const currentComponents = useMarkdownComponents();
  const newComponents = defaults({}, value, currentComponents);
  return <MarkdownComponentsContext.Provider value={newComponents}>{children}</MarkdownComponentsContext.Provider>;
};
