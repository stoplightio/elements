import type { ReferenceNode, SchemaNode } from '@stoplight/json-schema-tree';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
import * as React from 'react';
export declare type GoToRefHandler = (node: ReferenceNode) => void;
export interface SchemaRowProps {
    schemaNode: SchemaNode;
    nestingLevel: number;
}
export declare type RowAddonRenderer = (props: SchemaRowProps) => React.ReactNode;
export declare type ViewMode = 'read' | 'write' | 'standalone';
export declare type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;
