import {
  CustomLinkComponent,
  Docs,
  DocsProps,
  LinkHeading,
  MarkdownComponentsProvider,
  MockingProvider,
  ReferenceResolver,
} from '@stoplight/elements-core';
import { CustomComponentMapping } from '@stoplight/markdown-viewer';
import { dirname, resolve } from '@stoplight/path';
import { NodeType } from '@stoplight/types';
import * as React from 'react';

import { Node } from '../../types';

// Props shared with elements-core Docs component
type DocsBaseProps = Pick<
  DocsProps,
  'tryItCorsProxy' | 'tryItCredentialsPolicy' | 'nodeHasChanged' | 'nodeUnsupported'
>;
type DocsLayoutProps = Pick<
  Required<DocsProps>['layoutOptions'],
  'compact' | 'hideTryIt' | 'hideTryItPanel' | 'hideSamples' | 'hideExport' | 'hideSecurityInfo' | 'hideServerInfo'
>;

export type NodeContentProps = {
  node: Node;
  Link: CustomLinkComponent;

  /**
   * Allows to hide mocking button
   */
  hideMocking?: boolean;

  /**
   * Support for custom reference resolver
   */
  refResolver?: ReferenceResolver;

  maxRefDepth?: number;

  onExportRequest?: (type: 'original' | 'bundled') => void;
} & DocsBaseProps &
  DocsLayoutProps;

export const NodeContent = ({
  node,
  Link,
  hideMocking,
  refResolver,
  maxRefDepth,

  // Docs base props
  tryItCorsProxy,
  tryItCredentialsPolicy,
  nodeHasChanged,
  nodeUnsupported,

  // Docs layout props
  compact,
  hideTryIt,
  hideSamples,
  hideTryItPanel,
  hideSecurityInfo,
  hideServerInfo,

  // Exporting
  hideExport,
  onExportRequest,
}: NodeContentProps) => {
  return (
    <NodeLinkContext.Provider value={[node, Link]}>
      <MarkdownComponentsProvider
        value={{
          a: LinkComponent,
          // These override the default markdown-viewer components and modifies the
          // rendering of hash routing hrefs for headings in elements-core for the BaseArticleComponent
          h2: ({ color, ...props }) => <LinkHeading size={2} {...props} />,
          h3: ({ color, ...props }) => <LinkHeading size={3} {...props} />,
          h4: ({ color, ...props }) => <LinkHeading size={4} {...props} />,
        }}
      >
        <MockingProvider mockUrl={node.links.mock_url} hideMocking={hideMocking}>
          <Docs
            nodeType={node.type as NodeType}
            nodeData={node.data}
            nodeTitle={node.title}
            layoutOptions={{
              compact,
              hideTryIt: hideTryIt,
              hideTryItPanel: hideTryItPanel,
              hideSamples,
              hideSecurityInfo: hideSecurityInfo,
              hideServerInfo: hideServerInfo,
              hideExport:
                hideExport ||
                (node.links.export_url ?? node.links.export_original_file_url ?? node.links.export_bundled_file_url) ===
                  undefined,
            }}
            useNodeForRefResolving
            refResolver={refResolver}
            maxRefDepth={maxRefDepth}
            tryItCorsProxy={tryItCorsProxy}
            exportProps={
              [NodeType.HttpService, NodeType.Model].includes(node.type as NodeType)
                ? {
                    original: onExportRequest
                      ? { onPress: () => onExportRequest('original') }
                      : { href: node.links.export_original_file_url ?? node.links.export_url },
                    bundled: onExportRequest
                      ? { onPress: () => onExportRequest('bundled') }
                      : { href: node.links.export_bundled_file_url ?? getBundledUrl(node.links.export_url) },
                  }
                : undefined
            }
            tryItCredentialsPolicy={tryItCredentialsPolicy}
            nodeHasChanged={nodeHasChanged}
            nodeUnsupported={nodeUnsupported}
          />
        </MockingProvider>
      </MarkdownComponentsProvider>
    </NodeLinkContext.Provider>
  );
};

const NodeLinkContext = React.createContext<[Node, CustomLinkComponent] | undefined>(undefined);

const externalRegex = new RegExp('^(?:[a-z]+:)?//', 'i');
const LinkComponent: CustomComponentMapping['a'] = ({ children, href, title }) => {
  const ctx = React.useContext(NodeLinkContext);

  if (href && externalRegex.test(href)) {
    // Open external URL in a new tab
    return (
      <a href={href} target="_blank" rel="noreferrer" title={title ? title : undefined}>
        {children}
      </a>
    );
  }

  if (href && ctx) {
    const [node, Link] = ctx;
    // Resolve relative file URI with
    const { fileUri } = getNodeUriParts(node.uri);
    const { fileUri: hrefFileUri } = getNodeUriParts(href);

    let resolvedUri;
    if (hrefFileUri) {
      // if the href is targeting another file, resolve it against the dir path of current file
      resolvedUri = resolve(dirname(fileUri), href);
    } else {
      // If the href does not include a file, resolve it relative to the current file
      resolvedUri = resolve(fileUri, href);
    }

    const [resolvedUriWithoutAnchor, hash] = resolvedUri.split('#');
    const decodedUrl = decodeURIComponent(href);
    const decodedResolvedUriWithoutAnchor = decodeURIComponent(resolvedUriWithoutAnchor);
    const edge = node.outbound_edges.find(
      edge => edge.uri === decodedUrl || edge.uri === decodedResolvedUriWithoutAnchor,
    );

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
  if (parts.length === 1) {
    return { fileUri: '', pointer: parts[0] || '' };
  }

  const fileUri = `${parts[0] || ''}${parts[1] || ''}`;

  return { fileUri, pointer: parts[2] || '' };
};
