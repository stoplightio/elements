import {
  CustomLinkComponent,
  Docs,
  MarkdownComponentsProvider,
  MockingProvider,
  PersistenceContextProvider,
} from '@stoplight/elements-core';
import { Box } from '@stoplight/mosaic';
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
   * Allows to hide mocking button
   */
  hideMocking?: boolean;
};

export const NodeContent = ({ node, Link, hideTryIt, hideMocking }: NodeContentProps) => {
  return (
    <PersistenceContextProvider>
      <NodeLinkContext.Provider value={[node, Link]}>
        <MarkdownComponentsProvider value={{ link: LinkComponent }}>
          <MockingProvider mockUrl={node.links.mock_url} hideMocking={hideMocking}>
            <Box style={{ maxWidth: ['model'].includes(node.type) ? 1000 : undefined }}>
              <Docs nodeType={node.type as NodeType} nodeData={node.data} hideTryIt={hideTryIt} />
            </Box>
          </MockingProvider>
        </MarkdownComponentsProvider>
      </NodeLinkContext.Provider>
    </PersistenceContextProvider>
  );
};

const NodeLinkContext = React.createContext<[Node, CustomLinkComponent] | undefined>(undefined);

const externalRegex = new RegExp('^(?:[a-z]+:)?//', 'i');
const LinkComponent: React.FC<{ node: { url: string } }> = ({ children, node: { url } }) => {
  const ctx = React.useContext(NodeLinkContext);

  if (externalRegex.test(url)) {
    // Open external URL in a new tab
    return (
      <a href={url} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  if (ctx) {
    const [node, Link] = ctx;
    // Resolve relative file URI with
    const resolvedUri = resolve(dirname(node.uri), url);
    const [resolvedUriWithoutAnchor, hash] = resolvedUri.split('#');
    const edge = node.outbound_edges.find(edge => edge.uri === url || edge.uri === resolvedUriWithoutAnchor);

    if (edge) {
      return (
        <Link to={edge.slug} hash={hash}>
          {children}
        </Link>
      );
    }
  }

  return <a href={url}>{children}</a>;
};
