import { IMarkdownViewerProps, MarkdownViewer as MarkdownViewerComponent } from '@stoplight/markdown-viewer';
import * as React from 'react';

import { useMarkdownComponents } from './CustomComponents/Provider';

/**
 * Wraps @stoplight/markdown-viewer and passes in custom components from the context provider
 */
export const MarkdownViewer = (props: IMarkdownViewerProps) => {
  const components = useMarkdownComponents();

  return <MarkdownViewerComponent {...props} components={components} />;
};
MarkdownViewer.displayName = 'MarkdownViewer';
