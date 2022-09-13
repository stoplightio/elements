import { SchemaNode } from '@stoplight/json-schema-tree';
import { SpaceVals } from '@stoplight/mosaic';
import * as React from 'react';
import { ChangeType } from '../../types';
export interface SchemaRowProps {
    schemaNode: SchemaNode;
    nestingLevel: number;
    pl?: SpaceVals;
    parentNodeId?: string;
    parentChangeType?: ChangeType;
}
export declare const SchemaRow: React.FunctionComponent<SchemaRowProps>;
