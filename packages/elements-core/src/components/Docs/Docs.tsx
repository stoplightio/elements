import * as React from 'react';

import { InlineRefResolverProvider } from '../../context/InlineRefResolver';
import { useParsedData } from '../../hooks/useParsedData';
import { ParsedNode, UnparsedNode } from '../../types';
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
}

export interface DocsProps extends BaseDocsProps {
  unparsedNode?: UnparsedNode;
  node?: ParsedNode;
  useNodeForRefResolving?: boolean;
}

export interface DocsComponentProps<T = unknown> extends BaseDocsProps {
  /**
   * The input data for the component to display.
   */
  data: T;
}

export const Docs = React.memo<DocsProps>(({ unparsedNode, node, useNodeForRefResolving = false, ...commonProps }) => {
  const parsedNode = useParsedData(unparsedNode, node);

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

interface ParsedDocsProps extends BaseDocsProps {
  node: ParsedNode;
}

const ParsedDocs = ({ node, ...commonProps }: ParsedDocsProps) => {
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
