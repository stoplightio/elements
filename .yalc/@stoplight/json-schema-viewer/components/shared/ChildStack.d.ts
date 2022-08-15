import { SchemaNode } from '@stoplight/json-schema-tree';
import * as React from 'react';
import { SchemaRowProps } from '../SchemaRow';
declare type ChildStackProps = {
    schemaNode: SchemaNode;
    childNodes: readonly SchemaNode[];
    currentNestingLevel: number;
    className?: string;
    parentNodeId?: string;
    RowComponent?: React.FC<SchemaRowProps>;
};
export declare const ChildStack: React.MemoExoticComponent<({ childNodes, currentNestingLevel, className, RowComponent, parentNodeId }: ChildStackProps) => JSX.Element>;
export {};
