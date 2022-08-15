import { RootNode, SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-tree';
import * as React from 'react';
import { JSVOptions } from '../contexts';
import type { DiffRenderer, JSONSchema } from '../types';
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
} & DiffRenderer;
export declare const JsonSchemaViewer: React.FunctionComponent<Partial<JSVOptions> & {
    schema: JSONSchema;
    emptyText?: string | undefined;
    className?: string | undefined;
    resolveRef?: SchemaTreeRefDereferenceFn | undefined;
    onTreePopulated?: ((props: {
        rootNode: RootNode;
        nodeCount: number;
    }) => void) | undefined;
    maxHeight?: number | undefined;
    parentCrumbs?: string[] | undefined;
} & DiffRenderer & import("@stoplight/react-error-boundary").ErrorBoundaryProps<{}>>;
