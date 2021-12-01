import { RootNode } from '../nodes/RootNode';
import type { SchemaFragment } from '../types';
import { Walker } from '../walker';
import type { WalkerRefResolver } from '../walker/types';
import type { SchemaTreeOptions } from './types';
export declare class SchemaTree {
    schema: SchemaFragment;
    protected readonly opts?: Partial<SchemaTreeOptions> | undefined;
    walker: Walker;
    root: RootNode;
    constructor(schema: SchemaFragment, opts?: Partial<SchemaTreeOptions> | undefined);
    destroy(): void;
    populate(): void;
    invokeWalker(walker: Walker): void;
    protected resolveRef: WalkerRefResolver;
    private _resolveRef;
}
