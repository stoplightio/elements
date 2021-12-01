import type { MirroredReferenceNode } from './mirrored/MirroredReferenceNode';
import type { MirroredRegularNode } from './mirrored/MirroredRegularNode';
import type { ReferenceNode } from './ReferenceNode';
import type { RegularNode } from './RegularNode';
import type { RootNode } from './RootNode';
export declare type MirroredSchemaNode = MirroredRegularNode | MirroredReferenceNode;
export declare type SchemaNode = RootNode | RegularNode | ReferenceNode | MirroredSchemaNode;
export declare enum SchemaNodeKind {
    Any = "any",
    String = "string",
    Number = "number",
    Integer = "integer",
    Boolean = "boolean",
    Null = "null",
    Array = "array",
    Object = "object"
}
export declare enum SchemaCombinerName {
    AllOf = "allOf",
    AnyOf = "anyOf",
    OneOf = "oneOf"
}
export { SchemaAnnotations } from '../accessors/getAnnotations';
