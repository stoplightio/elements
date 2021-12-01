import { RootNode, SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-tree';
import * as React from 'react';
import { JSVOptions } from '../contexts';
import type { JSONSchema } from '../types';
export declare type JsonSchemaProps = Partial<JSVOptions> & {
    schema: JSONSchema;
    emptyText?: string;
    className?: string;
    resolveRef?: SchemaTreeRefDereferenceFn;
    onTreePopulated?: (props: {
        rootNode: RootNode;
        nodeCount: number;
    }) => void;
    maxHeight?: number;
    parentCrumbs?: string[];
};
export declare const JsonSchemaViewer: React.FunctionComponent<Partial<JSVOptions> & {
    schema: JSONSchema;
    emptyText?: string | undefined;
    className?: string | undefined;
    resolveRef?: import("@stoplight/types").Optional<SchemaTreeRefDereferenceFn>;
    onTreePopulated?: ((props: {
        rootNode: RootNode;
        nodeCount: number;
    }) => void) | undefined;
    maxHeight?: number | undefined;
    parentCrumbs?: string[] | undefined;
} & import("@stoplight/react-error-boundary").ErrorBoundaryProps<{}>>;
