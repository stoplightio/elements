import {
  CustomLinkComponent,
  Docs,
  MarkdownComponentsProvider,
  MockingProvider,
  ReferenceResolver,
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

  /**
   * Allows to hide export button
   * @default false
   */
  hideExport?: boolean;

  /**
   * Fetch credentials policy for TryIt component
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * @default "omit"
   */

  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';

  /**
   * URL of a CORS proxy that will be used to send requests in TryIt.
   * Provided url will be prepended to an URL of an actual request.
   * @default false
   */
  tryItCorsProxy?: string;

  /**
   * Support for custom reference resolver
   */
  refResolver?: ReferenceResolver;
};

export const NodeContent = ({
  node,
  Link,
  hideTryIt,
  hideTryItPanel,
  hideMocking,
  hideExport,
  tryItCredentialsPolicy,
  tryItCorsProxy,
  refResolver,
}: NodeContentProps) => {
  return (
    <NodeLinkContext.Provider value={[node, Link]}>
      <MarkdownComponentsProvider value={{ a: LinkComponent }}>
        <MockingProvider mockUrl={node.links.mock_url} hideMocking={hideMocking}>
          <Docs
            nodeType={node.type as NodeType}
            nodeData={node.data}
            nodeTitle={node.title}
            layoutOptions={{
              hideTryIt: hideTryIt,
              hideTryItPanel: hideTryItPanel,
              hideExport: hideExport || node.links.export_url === undefined,
            }}
            useNodeForRefResolving
            refResolver={refResolver}
            tryItCorsProxy={tryItCorsProxy}
            exportProps={
              [NodeType.HttpService, NodeType.Model].includes(node.type as NodeType)
                ? {
                    original: {
                      href: node.links.export_url,
                    },
                    bundled: {
                      href: getBundledUrl(node.links.export_url),
                    },
                  }
                : undefined
            }
            tryItCredentialsPolicy={tryItCredentialsPolicy}
          />
        </MockingProvider>
      </MarkdownComponentsProvider>
    </NodeLinkContext.Provider>
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
    const { fileUri, pointer } = getNodeUriParts(node.uri);
    const hash = pointer[0] === '#' ? pointer.slice(1) : null;
    const decodedUrl = decodeURIComponent(href);
    const decodedFileUri = decodeURIComponent(fileUri);
    const edge = node.outbound_edges.find(edge => edge.uri === decodedUrl || edge.uri === decodedFileUri);

    if (edge) {
      return <Link to={`${edge.slug}${hash ? `#${hash}` : ''}`}>{children}</Link>;
    }
  }

  return <a href={href}>{children}</a>;
};

function getBundledUrl(url: string | undefined) {
  if (url === undefined) return undefined;
  const bundledUrl = new URL(url);
  const searchParams = new URLSearchParams(bundledUrl.search);
  searchParams.append('deref', 'optimizedBundle');
  bundledUrl.search = searchParams.toString();
  return bundledUrl.toString();
}

// Extract out just the file portion of the node URI
// This handles cases such as links to http_operation node uris, which include both the file + encoded pointer, e.g.
//
// /reference/openapi.json/paths/~1v2~1contact~1last_change/post#heading-anchor
// fileUri = /reference/openapi.json
// pointer = /paths/~1v2~1contact~1last_change/post#heading-anchor
export const getNodeUriParts = (uri: string): { fileUri: string; pointer: string } => {
  const parts = uri.split(/(\.yaml|\.yml|\.json|\.md)/);
  const fileUri = `${parts[0] || ''}${parts[1] || ''}`;

  return { fileUri, pointer: parts[2] || '' };
};
