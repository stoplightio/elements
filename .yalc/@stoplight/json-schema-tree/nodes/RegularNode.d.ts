import type { Dictionary } from '@stoplight/types';
import type { SchemaFragment } from '../types';
import { BaseNode } from './BaseNode';
import type { ReferenceNode } from './ReferenceNode';
import { MirroredSchemaNode, SchemaAnnotations, SchemaCombinerName, SchemaNodeKind } from './types';
export declare class RegularNode extends BaseNode {
    readonly fragment: SchemaFragment;
    readonly $id: string | null;
    readonly types: SchemaNodeKind[] | null;
    readonly primaryType: SchemaNodeKind | null;
    readonly combiners: SchemaCombinerName[] | null;
    readonly required: string[] | null;
    readonly enum: unknown[] | null;
    readonly format: string | null;
    readonly title: string | null;
    readonly deprecated: boolean;
    children: (RegularNode | ReferenceNode | MirroredSchemaNode)[] | null | undefined;
    readonly annotations: Readonly<Partial<Dictionary<unknown, SchemaAnnotations>>>;
    readonly validations: Readonly<Dictionary<unknown>>;
    readonly originalFragment: SchemaFragment;
    constructor(fragment: SchemaFragment, context?: {
        originalFragment?: SchemaFragment;
    });
    get simple(): boolean;
    get unknown(): boolean;
}
