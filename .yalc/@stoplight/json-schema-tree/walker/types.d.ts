import type { RegularNode, SchemaNode } from '../nodes';
import type { RootNode } from '../nodes/RootNode';
import type { SchemaFragment } from '../types';
export declare type WalkerRefResolver = (path: string[] | null, $ref: string) => SchemaFragment;
export declare type WalkingOptions = {
    mergeAllOf: boolean;
    resolveRef: WalkerRefResolver | null;
};
export declare type WalkerSnapshot = {
    readonly fragment: SchemaFragment;
    readonly depth: number;
    readonly schemaNode: RegularNode | RootNode;
    readonly path: string[];
};
export declare type WalkerHookAction = 'filter' | 'stepIn';
export declare type WalkerHookHandler = (node: SchemaNode) => boolean;
export declare type WalkerNodeEventHandler = (node: SchemaNode) => void;
export declare type WalkerFragmentEventHandler = (node: SchemaFragment) => void;
export declare type WalkerErrorEventHandler = (ex: Error) => void;
export declare type WalkerEmitter = {
    enterNode: WalkerNodeEventHandler;
    exitNode: WalkerNodeEventHandler;
    includeNode: WalkerNodeEventHandler;
    skipNode: WalkerNodeEventHandler;
    stepInNode: WalkerNodeEventHandler;
    stepOverNode: WalkerNodeEventHandler;
    stepOutNode: WalkerNodeEventHandler;
    enterFragment: WalkerFragmentEventHandler;
    exitFragment: WalkerFragmentEventHandler;
    error: WalkerErrorEventHandler;
};
