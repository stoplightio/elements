import { IRoot as MarkdownAstRoot } from '@stoplight/markdown';
import { processMarkdown } from '@stoplight/markdown-viewer';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import * as React from 'react';

import { MarkdownViewer } from '../../MarkdownViewer';
import { DocsComponentProps } from '..';
import { ArticleHeadings } from './Headings';

type ArticleProps = DocsComponentProps<string | MarkdownAstRoot>;

const ArticleComponent = React.memo<ArticleProps>(({ data, className }) => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  const tree = React.useMemo(() => (typeof data === 'object' ? data : processMarkdown(data)), [data]);

  if (tree === null) return null;

  return (
    <div className={cn(className, 'flex w-full relative')} ref={setContainer}>
      <MarkdownViewer className="flex-1" markdown={tree} />
      <ArticleHeadings tree={tree} container={container} />
    </div>
  );
});

export const Article = withErrorBoundary<ArticleProps>(ArticleComponent, { recoverableProps: ['data'] });
