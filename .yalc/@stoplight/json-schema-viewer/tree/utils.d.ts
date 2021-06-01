import { MirroredSchemaNode, ReferenceNode, RegularNode, SchemaNode } from '@stoplight/json-schema-tree';
import { ComplexArrayNode, FlattenableNode, PrimitiveArrayNode } from './types';
export declare type ChildNode = RegularNode | ReferenceNode | MirroredSchemaNode;
export declare const isNonEmptyParentNode: (node: SchemaNode) => node is RegularNode & {
    children: ChildNode[] & {
        0: ChildNode;
    };
};
export declare function isFlattenableNode(node: SchemaNode): node is FlattenableNode;
export declare function isPrimitiveArray(node: SchemaNode): node is PrimitiveArrayNode;
export declare function isComplexArray(node: SchemaNode): node is ComplexArrayNode;
export declare function calculateChildrenToShow(node: SchemaNode): SchemaNode[];
export declare function isPropertyRequired(schemaNode: SchemaNode): boolean;
