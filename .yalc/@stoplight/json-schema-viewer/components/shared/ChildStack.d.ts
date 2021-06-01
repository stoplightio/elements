import { SchemaNode } from '@stoplight/json-schema-tree';
import * as React from 'react';
import { SchemaRowProps } from '../SchemaRow';
declare type ChildStackProps = {
    childNodes: readonly SchemaNode[];
    currentNestingLevel: number;
    className?: string;
    RowComponent?: React.FC<SchemaRowProps>;
};
export declare const ChildStack: ({ childNodes, currentNestingLevel, className, RowComponent, }: ChildStackProps) => JSX.Element;
export {};
