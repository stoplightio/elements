import { IMarkdownViewerProps } from '@stoplight/markdown-viewer';
import { IHttpOperation, IHttpService, NodeType } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
export declare enum NodeTypes {
    Paths = "paths",
    Path = "path",
    Operation = "operation",
    Components = "components",
    Models = "models",
    Model = "model"
}
export interface ISourceNodeMap {
    type: string;
    match?: string;
    notMatch?: string;
    children?: ISourceNodeMap[];
}
declare type Node<T, D> = {
    type: T;
    uri: string;
    name: string;
    data: D;
    tags: string[];
};
export declare type ServiceNode = Node<NodeType.HttpService, IHttpService> & {
    children: ServiceChildNode[];
    customData?: any;
};
export declare type ServiceChildNode = OperationNode | SchemaNode | ArticleNode;
export declare type OperationNode = Node<NodeType.HttpOperation, IHttpOperation>;
export declare type SchemaNode = Node<NodeType.Model, JSONSchema7>;
export declare type ArticleNode = Node<NodeType.Article, IMarkdownViewerProps['markdown']>;
export {};
