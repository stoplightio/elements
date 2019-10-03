import 'resize-observer-polyfill'; // (CL): Keep resize-observer-polyfill at the top of the file

import useComponentSize from '@rehooks/component-size';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import cn from 'classnames';
import * as React from 'react';
import { useComponents } from '../hooks/useComponents';
import { useComputePageToc } from '../hooks/useComputePageToc';
import { INodeInfo } from '../types';
import { buildNodeMarkdownTree } from '../utils/node';
import { PageToc } from './PageToc';

export interface IDocs {
  node: INodeInfo;
  className?: string;
  padding?: string;
}

export const Docs: React.FC<IDocs> = ({ className, node, padding }) => {
  const pageDocsRef = React.useRef<HTMLDivElement | null>(null);
  const { width } = useComponentSize(pageDocsRef);
  const showPageToc = width >= 1000;

  const components = useComponents();

  // Build markdown tree for the node
  const tree = buildNodeMarkdownTree(node.type, node.data);

  // Grab headings from markdown tree
  const headings = useComputePageToc(tree);

  return (
    <div className={cn('Page__docs', className, 'flex w-full')} ref={pageDocsRef}>
      <MarkdownViewer className={`Page__content flex-1 p-${padding}`} markdown={tree} components={components} />

      <PageToc className="Page__toc" padding={padding} headings={headings} minimal={!showPageToc} />
    </div>
  );
};
