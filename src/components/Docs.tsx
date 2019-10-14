import 'resize-observer-polyfill';

import useComponentSize from '@rehooks/component-size';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { ActiveSrnContext } from '../containers/Provider';
import { useComponents } from '../hooks/useComponents';
import { useComputePageToc } from '../hooks/useComputePageToc';
import { INodeInfo } from '../types';
import { buildNodeMarkdownTree } from '../utils/node';
import { PageToc } from './PageToc';

export interface IDocs {
  node: INodeInfo;

  padding?: string;
}

export const Docs = ({ node, padding = '12' }: IDocs) => {
  const components = useComponents();
  const pageDocsRef = React.useRef<HTMLDivElement | null>(null);
  const { width } = useComponentSize(pageDocsRef);
  const showPageToc = width >= 1000;

  const tree = buildNodeMarkdownTree(node.type, node.data);
  const headings = useComputePageToc(tree);

  return (
    <div className="Page__docs flex w-full" ref={pageDocsRef}>
      <ActiveSrnContext.Provider value={node.srn || ''}>
        <MarkdownViewer className={`Page__content flex-1 p-${padding}`} markdown={tree} components={components} />
      </ActiveSrnContext.Provider>

      <PageToc className="Page__toc" padding={padding} headings={headings} minimal={!showPageToc} />
    </div>
  );
};
