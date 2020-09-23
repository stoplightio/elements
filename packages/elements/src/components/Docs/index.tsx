import { Dictionary, NodeType } from '@stoplight/types';
import * as React from 'react';

import { useParsedData } from '../../hooks/useParsedData';
import { Article } from './Article';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';
import { Model } from './Model';

interface IBaseDocsProps {
  nodeType: string;
  className?: string;
}

export interface IDocsProps extends IBaseDocsProps {
  nodeData: unknown;
  headless?: boolean;
}

export interface IParsedDocsProps<T = unknown> extends IBaseDocsProps {
  nodeData: T;
  headless?: boolean;
}

export interface IDocsComponentProps<T = unknown> {
  data: T;
  className?: string;
  headless?: boolean;
}

const UnsupportedNodeType = () => {
  return null;
};

export const NodeTypeComponent: Dictionary<React.ComponentType<IDocsComponentProps<any>>, NodeType> = {
  [NodeType.Article]: Article,
  [NodeType.HttpOperation]: HttpOperation,
  [NodeType.HttpService]: HttpService,
  [NodeType.Model]: Model,
  [NodeType.HttpServer]: UnsupportedNodeType,
  [NodeType.Generic]: UnsupportedNodeType,
  [NodeType.TableOfContents]: UnsupportedNodeType,
  [NodeType.Unknown]: UnsupportedNodeType,
};

export const Docs = React.memo<IDocsProps>(({ nodeType, nodeData, className, headless }) => {
  const parsedData = useParsedData(nodeType, nodeData);

  return <ParsedDocs className={className} nodeData={parsedData} nodeType={nodeType} headless={headless} />;
});

export const ParsedDocs: React.FC<IParsedDocsProps> = ({ nodeType, nodeData, className, headless }) => {
  const Component = NodeTypeComponent[nodeType];

  if (!Component) return null;

  return <Component className={className} data={nodeData} headless={headless} />;
};

export { DocsSkeleton } from './Skeleton';
