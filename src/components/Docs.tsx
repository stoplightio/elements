import 'resize-observer-polyfill';

import useComponentSize from '@rehooks/component-size';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import * as React from 'react';
import { ActiveSrnContext } from '../containers/Provider';
import { useComponents } from '../hooks/useComponents';
import { useComputePageToc } from '../hooks/useComputePageToc';
import { buildNodeMarkdownTree } from '../utils/node';
import { PageToc } from './PageToc';

export interface IDocs {
  srn: string;
  type: NodeType | 'json_schema';
  data: unknown;
  padding?: string;
}

export const Docs: React.FunctionComponent<IDocs> = ({ srn, type, data, padding }) => {
  const components = useComponents();
  const pageDocsRef = React.useRef<HTMLDivElement | null>(null);
  const { width } = useComponentSize(pageDocsRef);
  const showPageToc = width >= 1000;

  const tree = buildNodeMarkdownTree(type, data);
  const headings = useComputePageToc(tree);

  return (
    <div className="Page__docs flex w-full" ref={pageDocsRef}>
      <ActiveSrnContext.Provider value={srn}>
        <MarkdownViewer className={`Page__content flex-1 p-${padding}`} markdown={tree} components={components} />
      </ActiveSrnContext.Provider>

      <PageToc className="Page__toc" padding={padding} headings={headings} minimal={!showPageToc} />
    </div>
  );
};
