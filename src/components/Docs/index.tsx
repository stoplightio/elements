import 'resize-observer-polyfill';

import { MarkdownViewer } from '@stoplight/markdown-viewer';
import * as React from 'react';
import { ActiveSrnContext } from '../../containers/Provider';
import { useComponents } from '../../hooks/useComponents';
import { useComputeMarkdownHeadings } from '../../hooks/useComputeMarkdownHeadings';
import { INodeInfo } from '../../types';
import { buildNodeMarkdownTree } from '../../utils/buildNodeMarkdownTree';
import { PageHeadings } from '../Page/Headings';

const useComponentSize = require('@rehooks/component-size');

export interface IDocs {
  node: INodeInfo;

  padding?: string;
}

export const Docs = ({ node, padding = '12' }: IDocs) => {
  const components = useComponents();
  const pageDocsRef = React.useRef<HTMLDivElement | null>(null);
  const { width } = useComponentSize(pageDocsRef);
  const showHeadings = width >= 1000;

  const tree = buildNodeMarkdownTree(node.type, node.data);
  const headings = useComputeMarkdownHeadings(tree);

  return (
    <div className="Page__docs flex w-full" ref={pageDocsRef}>
      <ActiveSrnContext.Provider value={node.srn || ''}>
        <MarkdownViewer className={`Page__content flex-1 p-${padding}`} markdown={tree} components={components} />
      </ActiveSrnContext.Provider>

      <PageHeadings className="Page__headings" padding={padding} headings={headings} minimal={!showHeadings} />
    </div>
  );
};
