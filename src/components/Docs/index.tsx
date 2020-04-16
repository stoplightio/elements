import { Dictionary, NodeType } from '@stoplight/types';
import * as React from 'react';

import { useParsedValue } from '../../hooks/useParsedValue';
import { Article } from './Article';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';
import { Model } from './Model';

export interface IDocsProps {
  nodeType: string;
  nodeData: string;
  className?: string;
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
  [NodeType.Unknown]: UnsupportedNodeType,
};

export const Docs = React.memo<IDocsProps>(({ nodeType, nodeData, className }) => {
  const Component = NodeTypeComponent[nodeType];
  const parsedData = useParsedData(nodeType, nodeData);

  if (!Component) return null;

  return <Component className={className} data={parsedData} />;
});

function useParsedData(nodeType: string, data: unknown) {
  const isParseable =
    nodeType === NodeType.HttpOperation || nodeType === NodeType.HttpService || nodeType === NodeType.Model;
  const parsedData = useParsedValue(isParseable ? data : null);

  return isParseable ? parsedData : data;
}
