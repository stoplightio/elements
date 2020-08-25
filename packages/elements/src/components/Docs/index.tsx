import { Dictionary, NodeType } from '@stoplight/types';
import * as React from 'react';

import { useParsedValue } from '../../hooks/useParsedValue';
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
}

export interface IParsedDocsProps<T = unknown> extends IBaseDocsProps {
  nodeData: T;
}

export interface IDocsComponentProps<T = unknown> {
  data: T;
  className?: string;
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

export const Docs = React.memo<IDocsProps>(({ nodeType, nodeData, className }) => {
  const parsedData = useParsedData(nodeType, nodeData);

  return <ParsedDocs className={className} nodeData={parsedData} nodeType={nodeType} />;
});

export const ParsedDocs: React.FC<IParsedDocsProps> = ({ nodeType, nodeData, className }) => {
  const Component = NodeTypeComponent[nodeType];

  if (!Component) return null;

  return <Component className={className} data={nodeData} />;
};

export function useParsedData(nodeType: string, data: unknown) {
  const isParseable =
    nodeType === NodeType.HttpOperation || nodeType === NodeType.HttpService || nodeType === NodeType.Model;
  const parsedData = useParsedValue(isParseable ? data : null);

  return isParseable ? parsedData : data;
}
