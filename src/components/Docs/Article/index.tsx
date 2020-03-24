import { processMarkdownTree } from '@stoplight/markdown-viewer';
import { Builder } from '@stoplight/markdown/builder';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { IBranchNode } from '../../../types';
import { MarkdownViewer } from '../../MarkdownViewer';
import { ArticleHeadings } from './Headings';

export interface IArticle {
  node: IBranchNode;
  className?: string;
}

export const Article = ({ node, className }: IArticle) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  if (node.snapshot.type !== NodeType.Article) return null;

  const markdown = new Builder();
  markdown.addMarkdown(String(node.snapshot.data || ''));
  const tree = processMarkdownTree(markdown.root);

  return (
    <div className={cn(className, 'flex w-full')} ref={containerRef}>
      <MarkdownViewer className="flex-1" markdown={tree} />

      <ArticleHeadings tree={tree} containerRef={containerRef} />
    </div>
  );
};
