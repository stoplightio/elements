import { TreeStore } from '@stoplight/tree-list';
import { JSONSchema4 } from 'json-schema';
import * as React from 'react';
export interface ISchemaTree {
    treeStore: TreeStore;
    schema: JSONSchema4;
    className?: string;
    name?: string;
    dereferencedSchema?: JSONSchema4;
    hideTopBar?: boolean;
    expanded?: boolean;
    maxRows?: number;
}
export declare const SchemaTree: React.FunctionComponent<ISchemaTree>;
