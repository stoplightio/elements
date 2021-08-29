import { NodeType } from '@stoplight/types';
import { Location } from 'history';
import * as React from 'react';

import { InlineRefResolverProvider } from '../../context/InlineRefResolver';
import { useParsedData } from '../../hooks/useParsedData';
import { ParsedNode } from '../../types';
import { Article } from './Article';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';
import { ExportButtonProps } from './HttpService/ExportButton';
import { Model } from './Model';

interface BaseDocsProps {
  /**
   * CSS class to add to the root container.
   */
  className?: string;

  /**
   * URI of the document
   */
  uri?: string;

  /**
   * Some components may depend on some location/URL data.
   */
  location?: Location;

  /**
   * The original title of the node. It serves as a fallback title in case on is not available inside the model.
   */
  nodeTitle?: string;

  /**
   * Allows to use internal routing (requires wrapping with Router component)
   */
  allowRouting?: boolean;

  /**
   * Export button props
   */
  exportProps?: ExportButtonProps;

  /**
   * Fetch credentials policy for TryIt component
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * @default "omit"
   */

  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';

  /**
   * Url of a CORS proxy that will be used to send requests in TryIt.
   * Provided url will be prepended to an URL of an actual request.
   * @default false
   */
  tryItCorsProxy?: string;

  /**
   * Allows to customize the layout of Docs
   */
  layoutOptions?: {
    /**
     * Allows to hide TryIt component
     * @default false
     */
    hideTryIt?: boolean;

    /**
     * Shows only operation document without right column
     * @default false
     */
    hideTryItPanel?: boolean;
    /**
     * If true, the component will hide its title
     * @default false
     */
    noHeading?: boolean;
    /**
     * If true, the component will hide the Powered by Stoplight banner in Docs
     * @default false
     */
    showPoweredByLink?: boolean;
    /**
     * Allows to hide model examples
     * @default false
     */
    hideModelExamples?: boolean;
    /**
     * Allows to hide server information
     * @default false
     */
    hideServerInfo?: boolean;
    /**
     * Allows to hide security information
     * @default false
     */
    hideSecurityInfo?: boolean;

    /**
     * Allows to hide export button
     * @default false
     */
    hideExport?: boolean;
  };
}

export interface DocsProps extends BaseDocsProps {
  nodeType: NodeType;
  nodeData: unknown;
  useNodeForRefResolving?: boolean;
}

export interface DocsComponentProps<T = unknown> extends BaseDocsProps {
  /**
   * The input data for the component to display.
   */
  data: T;
}

export const Docs = React.memo<DocsProps>(({ nodeType, nodeData, useNodeForRefResolving = false, ...commonProps }) => {
  const parsedNode = useParsedData(nodeType, nodeData);

  if (!parsedNode) {
    // TODO: maybe report failure
    return null;
  }

  const parsedDocs = <ParsedDocs node={parsedNode} {...commonProps} />;

  if (useNodeForRefResolving) {
    return <InlineRefResolverProvider document={parsedNode.data}>{parsedDocs}</InlineRefResolverProvider>;
  }

  return parsedDocs;
});

export interface ParsedDocsProps extends BaseDocsProps {
  node: ParsedNode;
}

export const ParsedDocs = ({ node, ...commonProps }: ParsedDocsProps) => {
  switch (node.type) {
    case 'article':
      return <Article data={node.data} {...commonProps} />;
    case 'http_operation':
      return <HttpOperation data={node.data} {...commonProps} />;
    case 'http_service':
      return <HttpService data={node.data} {...commonProps} />;
    case 'model':
      return <Model data={node.data} {...commonProps} />;
    default:
      return null;
  }
};

export { DocsSkeleton } from './Skeleton';
