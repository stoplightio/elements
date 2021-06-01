import { SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-tree';
import * as React from 'react';
import { JSVOptions } from '../contexts';
import type { JSONSchema } from '../types';
export declare type JsonSchemaProps = Partial<JSVOptions> & {
    schema: JSONSchema;
    emptyText?: string;
    className?: string;
    resolveRef?: SchemaTreeRefDereferenceFn;
};
export declare const JsonSchemaViewer: React.FunctionComponent<Partial<JSVOptions> & {
    schema: JSONSchema;
    emptyText?: string | undefined;
    className?: string | undefined;
    resolveRef?: import("@stoplight/types").Optional<SchemaTreeRefDereferenceFn>;
} & import("@stoplight/react-error-boundary").ErrorBoundaryProps<{}>>;
