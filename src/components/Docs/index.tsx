import { IRoot } from '@stoplight/markdown';
import * as React from 'react';

import { IResolverOpts } from '@stoplight/json-ref-resolver/types';
import { NodeType } from '@stoplight/types';
import { ActiveSrnContext, ResolverOptionsContext } from '../../containers/Provider';
import { useComponentSize } from '../../hooks/useComponentSize';
import { useComputeMarkdownHeadings } from '../../hooks/useComputeMarkdownHeadings';
import { INodeInfo } from '../../types';
import { buildNodeMarkdownTree } from '../../utils/buildNodeMarkdownTree';
import { MarkdownViewer } from '../MarkdownViewer';
import { PageHeadings } from '../Page/Headings';

export interface IDocs {
  node: INodeInfo;
  padding?: string;
}

export const Docs = ({ node, padding = '12' }: IDocs) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const tree = buildNodeMarkdownTree(node.type, node.data, node.errors);

  let resolverOpts;
  if (node.type !== NodeType.Model) {
    resolverOpts = {
      dereferenceInline: true, // Always resolve inline $refs for services, operations and articles
      dereferenceRemote: node.type === NodeType.Article, // Only resolve remote $refs for Articles
    };
  }

  return (
    <div className="flex w-full Page__docs" ref={containerRef}>
      <ActiveSrnContext.Provider value={node.srn || ''}>
        <ResolverOptionsContext.Provider value={resolverOpts}>
          <MarkdownViewer className={`Page__content flex-1 p-${padding}`} markdown={tree} />
        </ResolverOptionsContext.Provider>
      </ActiveSrnContext.Provider>

      <DocsHeadings tree={tree} padding={padding} containerRef={containerRef} />
    </div>
  );
};

export const DocsHeadings = ({
  tree,
  padding,
  containerRef,
}: {
  tree: IRoot;
  padding: string;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const { width } = useComponentSize(containerRef);
  const showHeadings = width >= 1000;

  const headings = useComputeMarkdownHeadings(tree);

  return <PageHeadings className="Page__headings" padding={padding} headings={headings} minimal={!showHeadings} />;
};
