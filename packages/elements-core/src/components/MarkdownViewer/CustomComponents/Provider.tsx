import {
  CustomComponentMapping as MDVCustomComponentMapping,
  DefaultSMDComponents,
  MarkdownViewerProvider,
} from '@stoplight/markdown-viewer';
import * as React from 'react';

export type CustomComponentMapping = MDVCustomComponentMapping;

export { DefaultSMDComponents };
interface MarkdownComponentsProviderProps {
  value: Partial<CustomComponentMapping> | undefined;
}

/**
 * Provides components to markdown-viewer.
 */
export const MarkdownComponentsProvider: React.FC<MarkdownComponentsProviderProps> = ({ value, children }) => {
  return <MarkdownViewerProvider components={value}>{children}</MarkdownViewerProvider>;
};
