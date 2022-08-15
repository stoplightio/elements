import { SchemaNode } from '@stoplight/json-schema-tree';
import { SpaceVals } from '@stoplight/mosaic';
import * as React from 'react';
export interface SchemaRowProps {
    schemaNode: SchemaNode;
    nestingLevel: number;
    pl?: SpaceVals;
    parentNodeId?: string;
}
export declare const SchemaRow: React.FunctionComponent<SchemaRowProps>;
