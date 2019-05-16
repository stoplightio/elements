import { INewNode, IRootNode, ITreeListNode } from '../types';
export declare const isContainer: (node: ITreeListNode<object> | IRootNode) => boolean;
export declare const isRoot: (node: ITreeListNode<object> | IRootNode) => node is IRootNode;
export declare const isNew: (node: ITreeListNode<object> | INewNode<object>) => node is INewNode<object>;
export declare const findNodeIndex: (nodes: ITreeListNode<object>[], node: ITreeListNode<object> | INewNode<object>) => number;
export declare const getTreeListItemNode: (nodes: ITreeListNode<object>[], index: number, newNode?: INewNode<object> | undefined) => ITreeListNode<object> | INewNode<object>;
export declare const getParent: (nodes: ITreeListNode<object>[], node: ITreeListNode<object> | INewNode<object>) => ITreeListNode<object> | IRootNode | undefined;
export declare const getRange: (nodes: ITreeListNode<object>[], startNode: ITreeListNode<object> | IRootNode | INewNode<object>, endNode?: ITreeListNode<object> | undefined) => ITreeListNode<object>[];
export declare const getSiblings: (nodes: ITreeListNode<object>[], node: ITreeListNode<object> | INewNode<object>) => ITreeListNode<object>[];
