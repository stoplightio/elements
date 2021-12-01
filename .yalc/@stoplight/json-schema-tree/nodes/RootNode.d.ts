import type { SchemaFragment } from '../types';
import { BaseNode } from './BaseNode';
import type { SchemaNode } from './types';
export declare class RootNode extends BaseNode {
    readonly fragment: SchemaFragment;
    readonly parent: null;
    readonly children: SchemaNode[];
    constructor(fragment: SchemaFragment);
}
