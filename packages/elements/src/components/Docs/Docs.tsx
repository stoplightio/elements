import { ParsedNode } from '@stoplight/elements-utils';
import { NodeType } from '@stoplight/types';
import * as React from 'react';

import { useParsedData } from '../../hooks/useParsedData';
import { Article } from './Article';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';
import { Model } from './Model';

interface IBaseDocsProps {
  className?: string;
}

export interface IDocsProps extends IBaseDocsProps {
  nodeData: unknown;
  nodeType: NodeType;
  headless?: boolean;
  uri?: string;
}

export interface IParsedDocsProps extends IBaseDocsProps {
  node: ParsedNode;
  headless?: boolean;
  mockUrl?: string;
  uri?: string;
}

export interface IDocsComponentProps<T = unknown> {
  /**
   * The input data for the component to display.
   */
  data: T;
  /**
   * CSS class to add to the root container.
   */
  className?: string;
  /**
   * If true, the component will hide its title.
   * @default false
   */
  headless?: boolean;
  mockUrl?: string;

  /**
   * URI of the document
   */
  uri?: string;
}

export const Docs = React.memo<IDocsProps>(({ nodeType, nodeData, className, headless, uri }) => {
  const parsedNode = useParsedData(nodeType, nodeData);

  if (!parsedNode) {
    // TODO: maybe report failure
    return null;
  }

  return <ParsedDocs className={className} node={parsedNode} headless={headless} uri={uri} />;
});

export const ParsedDocs = ({ node, ...commonProps }: IParsedDocsProps) => {
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
