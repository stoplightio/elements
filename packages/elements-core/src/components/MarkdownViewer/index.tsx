import { IMarkdownViewerProps, MarkdownViewer as MarkdownViewerComponent } from '@stoplight/markdown-viewer';
import * as React from 'react';

/**
 * Wraps @stoplight/markdown-viewer and passes in custom components from the context provider
 */
export const MarkdownViewer = (props: IMarkdownViewerProps) => {
  return <MarkdownViewerComponent {...props} />;
};
MarkdownViewer.displayName = 'MarkdownViewer';
