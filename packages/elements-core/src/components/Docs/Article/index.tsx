import { IMarkdownViewerProps } from '@stoplight/markdown-viewer';
import { Box } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { RouterTypeContext } from '../../../context/RouterType';
import { MarkdownViewer } from '../../MarkdownViewer';
import { DocsComponentProps } from '..';

type ArticleProps = DocsComponentProps<IMarkdownViewerProps['markdown']>;

const ArticleComponent = React.memo<ArticleProps>(({ data }) => {
  const { pathname } = useLocation();
  const routerKind = React.useContext(RouterTypeContext);
  const basePath = routerKind === 'hash' ? `#${pathname.split('#')[0]}` : '';

  return (
    <Box className="sl-elements-article">
      <MarkdownViewer className="sl-elements-article-content" markdown={data} includeToc tocBasePath={basePath} />
    </Box>
  );
});

export const Article = withErrorBoundary<ArticleProps>(ArticleComponent, { recoverableProps: ['data'] });
