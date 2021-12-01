import { SchemaNode } from '@stoplight/json-schema-tree';
import * as React from 'react';
export interface SchemaRowProps {
    schemaNode: SchemaNode;
    nestingLevel: number;
}
export declare const SchemaRow: React.FunctionComponent<SchemaRowProps>;
