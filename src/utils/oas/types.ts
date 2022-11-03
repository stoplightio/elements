import { IMarkdownViewerProps } from '@stoplight/markdown-viewer';
import { IHttpOperation, IHttpService, NodeType } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';

export enum NodeTypes {
  Paths = 'paths',
  Path = 'path',
  Operation = 'operation',
  Components = 'components',
  Models = 'models',
  Model = 'model',
}

export interface ISourceNodeMap {
  type: string;
  match?: string;
  notMatch?: string;
  children?: ISourceNodeMap[];
}

type Node<T, D> = {
  type: T;
  uri: string;
  name: string;
  data: D;
  tags: string[];
};

export type ServiceNode = Node<NodeType.HttpService, IHttpService> & {
  children: ServiceChildNode[];

  // Custom data for other TOC
  customData?: any;
};
export type ServiceChildNode = OperationNode | SchemaNode | ArticleNode;
export type OperationNode = Node<NodeType.HttpOperation, IHttpOperation>;
export type SchemaNode = Node<NodeType.Model, JSONSchema7>;

// TODO: This needed to be mapped with "ParsedNode" type
export type ArticleNode = Node<NodeType.Article, IMarkdownViewerProps['markdown']>;
