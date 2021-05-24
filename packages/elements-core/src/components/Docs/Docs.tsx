import { NodeType } from '@stoplight/types';
import { Location } from 'history';
import * as React from 'react';

import { InlineRefResolverProvider } from '../../context/InlineRefResolver';
import { useParsedData } from '../../hooks/useParsedData';
import { ParsedNode } from '../../types';
import { Article } from './Article';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';
import { Model } from './Model';

interface BaseDocsProps {
  /**
   * CSS class to add to the root container.
   */
  className?: string;
  /**
   * If true, the component will hide its title.
   * @default false
   */
  headless?: boolean;

  /**
   * URI of the document
   */
  uri?: string;

  /**
   * Some components may depend on some location/URL data.
   */
  location?: Location;

  /**
   * Allows to hide TryIt component
   */
  hideTryIt?: boolean;

  /**
   * Shows only operation document without right column
   */
  hideTryItPanel?: boolean;
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
