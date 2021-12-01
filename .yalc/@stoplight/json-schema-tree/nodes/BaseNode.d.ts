import type { SchemaFragment } from '../types';
import type { MirroredRegularNode } from './mirrored';
import type { RegularNode } from './RegularNode';
import type { RootNode } from './RootNode';
export declare abstract class BaseNode {
    readonly fragment: SchemaFragment;
    readonly id: string;
    parent: RegularNode | RootNode | MirroredRegularNode | null;
    subpath: string[];
    get path(): ReadonlyArray<string>;
    get depth(): number;
    protected constructor(fragment: SchemaFragment);
}
