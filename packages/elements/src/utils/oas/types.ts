import { Extensions, IHttpOperation, IHttpService, NodeType } from '@stoplight/types';
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

export type ServiceNode = Node<NodeType.HttpService, IHttpService> & { children: ServiceChildNode[] } & { extensions?: Extensions };
export type ServiceChildNode = OperationNode | SchemaNode;
export type OperationNode = Node<NodeType.HttpOperation, IHttpOperation>;
export type SchemaNode = Node<NodeType.Model, JSONSchema7>;
