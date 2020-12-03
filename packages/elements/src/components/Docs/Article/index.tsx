import { processMarkdownTree } from '@stoplight/markdown-viewer';
import { Builder } from '@stoplight/markdown/builder';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { MarkdownViewer } from '../../MarkdownViewer';
import { ArticleHeadings } from './Headings';

export type ArticleProps = IDocsComponentProps<unknown>;

const ArticleComponent = React.memo<ArticleProps>(({ data, className }) => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  let tree;
  if (typeof data === 'object') {
    tree = data;
  } else if (typeof data === 'string') {
    const markdown = new Builder();
    markdown.addMarkdown(data);
    tree = processMarkdownTree(markdown.root);
  } else {
    return null;
  }

  return (
    <div className={cn(className, 'flex w-full relative')} ref={setContainer}>
      <MarkdownViewer className="flex-1" markdown={tree} />
      <ArticleHeadings tree={tree} container={container} />
    </div>
  );
});

export const Article = withErrorBoundary<ArticleProps>(ArticleComponent, { recoverableProps: ['data'] });
