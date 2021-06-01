import type { ReferenceNode, RegularNode, SchemaNodeKind, SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-tree';
import type { Optional } from '@stoplight/types';
import type { ViewMode } from '../types';
export declare type SchemaTreeRefInfo = {
    source: string | null;
    pointer: string | null;
};
export declare type SchemaTreeOptions = {
    expandedDepth: number;
    mergeAllOf: boolean;
    resolveRef: Optional<SchemaTreeRefDereferenceFn>;
    viewMode?: ViewMode;
};
export declare type ArrayNode = RegularNode & {
    primaryType: SchemaNodeKind.Array;
};
export declare type PrimitiveArrayNode = ArrayNode & {
    children: [RegularNode & {
        simple: true;
    }];
};
export declare type ComplexArrayNode = ArrayNode & {
    children: [RegularNode & {
        simple: false;
    }];
};
export declare type BrokenRefArrayNode = ArrayNode & {
    children: [ReferenceNode & {
        error: string;
    }];
};
export declare type FlattenableNode = PrimitiveArrayNode | ComplexArrayNode | BrokenRefArrayNode;
