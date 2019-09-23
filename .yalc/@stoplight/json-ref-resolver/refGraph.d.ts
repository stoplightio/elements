import { DepGraph } from 'dependency-graph';
import * as treeify from 'treeify';
export interface INode<T> {
    id: string;
    data?: T;
}
export interface INodeTree<T> {
    node: INode<T>;
    children: {
        [id: string]: INodeTree<T>;
    };
}
export declare class RefGraph<T> extends DepGraph<T> {
    nodeTree(id: string): INodeTree<T>;
    nodeChildren(id: string): Array<INode<T>>;
    serialize(id: string): string;
}
export declare const nodeChildren: <T>(graph: RefGraph<T>, node: INode<T>) => INode<T>[];
export declare const nodeTree: <T>(graph: RefGraph<T>, node: INode<T>) => INodeTree<T>;
export declare const serialize: <T>(graph: RefGraph<T>, ...nodes: INode<T>[]) => treeify.TreeObject;
