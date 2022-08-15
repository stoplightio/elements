import type { SchemaNode } from '@stoplight/json-schema-tree';
export declare const setSkipHashing: (skip: boolean) => void;
export declare const hash: (value: string, skipHashing?: boolean) => string;
export declare const getNodeId: (node: SchemaNode, parentId?: string | undefined) => string;
export declare const getOriginalNodeId: (node: SchemaNode, parentId?: string | undefined) => string;
