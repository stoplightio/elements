import { IMarkdownViewerProps, MarkdownViewer as MarkdownViewerComponent } from '@stoplight/markdown-viewer';
import * as React from 'react';

import { useComponents } from '../../context/Components';

/**
 * Wraps @stoplight/markdown-viewer and passes in custom components from the context provider
 */
export const MarkdownViewer = React.memo((props: IMarkdownViewerProps) => {
  const components = useComponents();

  return <MarkdownViewerComponent {...props} components={components} />;
});
MarkdownViewer.displayName = 'MarkdownViewer';
