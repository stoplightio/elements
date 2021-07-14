import {
  CustomLinkComponent,
  Docs,
  MarkdownComponentsProvider,
  MockingProvider,
  PersistenceContextProvider,
} from '@stoplight/elements-core';
import { CustomComponentMapping } from '@stoplight/markdown-viewer';
import { dirname, resolve } from '@stoplight/path';
import { NodeType } from '@stoplight/types';
import * as React from 'react';

import { Node } from '../../types';

export type NodeContentProps = {
  node: Node;
  Link: CustomLinkComponent;

  /**
   * Allows to hide TryIt component
   */
  hideTryIt?: boolean;

  /**
   * Allows to hide TryIt panel
   */
  hideTryItPanel?: boolean;

  /**
   * Allows to hide mocking button
   */
  hideMocking?: boolean;
};

export const NodeContent = ({ node, Link, hideTryIt, hideTryItPanel, hideMocking }: NodeContentProps) => {
  return (
    <PersistenceContextProvider>
      <NodeLinkContext.Provider value={[node, Link]}>
        <MarkdownComponentsProvider value={{ a: LinkComponent }}>
          <MockingProvider mockUrl={node.links.mock_url} hideMocking={hideMocking}>
            <Docs
              nodeType={node.type as NodeType}
              nodeData={node.data}
              nodeTitle={node.title}
              layoutOptions={{ hideTryIt: hideTryIt, hideTryItPanel: hideTryItPanel }}
              useNodeForRefResolving
            />
          </MockingProvider>
        </MarkdownComponentsProvider>
      </NodeLinkContext.Provider>
    </PersistenceContextProvider>
  );
};

const NodeLinkContext = React.createContext<[Node, CustomLinkComponent] | undefined>(undefined);

const externalRegex = new RegExp('^(?:[a-z]+:)?//', 'i');
const LinkComponent: CustomComponentMapping['a'] = ({ children, href }) => {
  const ctx = React.useContext(NodeLinkContext);

  if (href && externalRegex.test(href)) {
    // Open external URL in a new tab
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  if (href && ctx) {
    const [node, Link] = ctx;
    // Resolve relative file URI with
    const resolvedUri = resolve(dirname(node.uri), href);
    const [resolvedUriWithoutAnchor, hash] = resolvedUri.split('#');
    const decodedUrl = decodeURIComponent(href);
    const decodedResolvedUriWithoutAnchor = decodeURIComponent(resolvedUriWithoutAnchor);
    const edge = node.outbound_edges.find(
      edge => edge.uri === decodedUrl || edge.uri === decodedResolvedUriWithoutAnchor,
    );

    if (edge) {
      return (
        <Link to={edge.slug} hash={hash}>
          {children}
        </Link>
      );
    }
  }

  return <a href={href}>{children}</a>;
};
