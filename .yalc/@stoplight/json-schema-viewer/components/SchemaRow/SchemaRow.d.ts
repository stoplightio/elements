import { SchemaNode } from '@stoplight/json-schema-tree';
import { BoxProps, SpaceVals } from '@stoplight/mosaic';
import * as React from 'react';
import { ChangeType, NodeHasChangedFn } from '../../types';
export interface SchemaRowProps {
    schemaNode: SchemaNode;
    nestingLevel: number;
    pl?: SpaceVals;
    parentNodeId?: string;
    parentChangeType?: ChangeType;
}
export declare const SchemaRow: React.FunctionComponent<SchemaRowProps>;
export declare type ChangeAnnotationProps = {
    change?: ReturnType<NodeHasChangedFn>;
} & BoxProps<'div'>;
export declare const ChangeAnnotation: ({ change, ...props }: ChangeAnnotationProps) => JSX.Element | null;
