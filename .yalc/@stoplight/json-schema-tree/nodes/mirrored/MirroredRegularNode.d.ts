import type { Dictionary } from '@stoplight/types';
import type { SchemaFragment } from '../../types';
import { BaseNode } from '../BaseNode';
import type { RegularNode } from '../RegularNode';
import type { SchemaAnnotations, SchemaCombinerName, SchemaNodeKind } from '../types';
import { MirroredReferenceNode } from './MirroredReferenceNode';
export declare class MirroredRegularNode extends BaseNode implements RegularNode {
    readonly mirroredNode: RegularNode;
    readonly $id: string | null;
    readonly types: SchemaNodeKind[] | null;
    readonly primaryType: SchemaNodeKind | null;
    readonly combiners: SchemaCombinerName[] | null;
    readonly required: string[] | null;
    readonly enum: unknown[] | null;
    readonly format: string | null;
    readonly title: string | null;
    readonly deprecated: boolean;
    readonly annotations: Readonly<Partial<Dictionary<unknown, SchemaAnnotations>>>;
    readonly validations: Readonly<Dictionary<unknown>>;
    readonly originalFragment: SchemaFragment;
    readonly simple: boolean;
    readonly unknown: boolean;
    private readonly cache;
    constructor(mirroredNode: RegularNode, context?: {
        originalFragment?: SchemaFragment;
    });
    private readonly _this;
    private _children?;
    get children(): (MirroredRegularNode | MirroredReferenceNode)[] | null | undefined;
}
