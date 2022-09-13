import { SchemaNode } from '@stoplight/json-schema-tree';
import * as React from 'react';
import type { ChangeType } from '../../types';
import { SchemaRowProps } from '../SchemaRow';
declare type ChildStackProps = {
    schemaNode: SchemaNode;
    childNodes: readonly SchemaNode[];
    currentNestingLevel: number;
    className?: string;
    parentNodeId?: string;
    RowComponent?: React.FC<SchemaRowProps>;
    parentChangeType?: ChangeType;
};
export declare const ChildStack: React.MemoExoticComponent<({ childNodes, currentNestingLevel, className, RowComponent, parentNodeId, parentChangeType, }: ChildStackProps) => JSX.Element>;
export {};
