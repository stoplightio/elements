import { IMarkdownViewerProps } from '@stoplight/markdown-viewer';
import { Box } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import * as React from 'react';

import { MarkdownViewer } from '../../MarkdownViewer';
import { DocsComponentProps } from '..';

type ArticleProps = DocsComponentProps<IMarkdownViewerProps['markdown']>;

const ArticleComponent = React.memo<ArticleProps>(({ data }) => {
  return (
    <Box className="sl-elements-article">
      <MarkdownViewer className="sl-elements-article-content" markdown={data} includeToc />
    </Box>
  );
});

export const Article = withErrorBoundary<ArticleProps>(ArticleComponent, { recoverableProps: ['data'] });
