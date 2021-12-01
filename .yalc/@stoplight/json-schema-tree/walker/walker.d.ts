import { EventEmitter } from '@stoplight/lifecycle';
import { MirroredSchemaNode, RegularNode } from '../nodes';
import type { RootNode } from '../nodes/RootNode';
import { SchemaNode } from '../nodes/types';
import type { SchemaFragment } from '../types';
import type { WalkerEmitter, WalkerHookAction, WalkerHookHandler, WalkerSnapshot, WalkingOptions } from './types';
declare type InternalWalkerState = {
    depth: number;
    pathLength: number;
    schemaNode: RegularNode | RootNode;
};
declare type ProcessedFragment = SchemaFragment | SchemaFragment[];
export declare class Walker extends EventEmitter<WalkerEmitter> {
    protected readonly root: RootNode;
    protected readonly walkingOptions: WalkingOptions;
    readonly path: string[];
    depth: number;
    protected fragment: SchemaFragment;
    protected schemaNode: RegularNode | RootNode;
    private processedFragments;
    private readonly hooks;
    constructor(root: RootNode, walkingOptions: WalkingOptions);
    destroy(): void;
    loadSnapshot(snapshot: WalkerSnapshot): void;
    saveSnapshot(): WalkerSnapshot;
    hookInto(action: WalkerHookAction, handler: WalkerHookHandler): void;
    restoreWalkerAtNode(node: RegularNode): void;
    walk(): void;
    protected dumpInternalWalkerState(): InternalWalkerState;
    protected restoreInternalWalkerState({ depth, pathLength, schemaNode }: InternalWalkerState): void;
    protected walkNodeChildren(): void;
    protected retrieveFromFragment(fragment: ProcessedFragment, originalFragment: SchemaFragment): [MirroredSchemaNode, ProcessedFragment] | void;
    protected processFragment(): [SchemaNode, ProcessedFragment];
}
export {};
