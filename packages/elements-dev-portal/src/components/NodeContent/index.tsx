import { Docs } from '@stoplight/elements/components/Docs';
import { MarkdownComponentsProvider } from '@stoplight/elements/components/MarkdownViewer/CustomComponents/Provider';
import { CustomLinkComponent } from '@stoplight/elements/components/MosaicTableOfContents/types';
import { PersistenceContextProvider } from '@stoplight/elements/context/Persistence';
import { Box } from '@stoplight/mosaic';
import { dirname, resolve } from '@stoplight/path';
import { NodeType } from '@stoplight/types';
import * as React from 'react';

import { Node } from '../../interfaces/node';

export type NodeContentProps = {
  node: Node;
  Link: CustomLinkComponent;
};

export const NodeContent = ({ node, Link }: NodeContentProps) => {
  return (
    <PersistenceContextProvider>
      <NodeLinkContext.Provider value={[node, Link]}>
        <MarkdownComponentsProvider value={{ link: LinkComponent }}>
          <Box style={{ maxWidth: ['model'].includes(node.type) ? 1000 : undefined }}>
            <Docs nodeType={node.type as NodeType} nodeData={node.data} />
          </Box>
        </MarkdownComponentsProvider>
      </NodeLinkContext.Provider>
    </PersistenceContextProvider>
  );
};

const NodeLinkContext = React.createContext<[Node, CustomLinkComponent] | undefined>(undefined);

const LinkComponent: React.FC<{ node: { url: string } }> = ({ children, node: { url } }) => {
  const ctx = React.useContext(NodeLinkContext);

  if (ctx) {
    const [node, Link] = ctx;

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

  return (
    <a href={url} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};
