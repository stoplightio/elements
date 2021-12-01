import { MirroredSchemaNode, ReferenceNode, RegularNode, RootNode, SchemaNode } from '../nodes';
export declare function isSchemaNode(node: unknown): node is SchemaNode;
export declare function isRootNode(node: SchemaNode): node is RootNode;
export declare function isRegularNode(node: SchemaNode): node is RegularNode;
export declare function isMirroredNode(node: SchemaNode): node is MirroredSchemaNode;
export declare function isReferenceNode(node: SchemaNode): node is ReferenceNode;
