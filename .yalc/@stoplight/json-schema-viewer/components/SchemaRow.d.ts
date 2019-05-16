import { IRowRendererOptions, ITreeListNode, TreeStore } from '@stoplight/tree-list';
import * as React from 'react';
export interface ISchemaRow {
    node: ITreeListNode<object>;
    rowOptions: IRowRendererOptions;
    treeStore: TreeStore;
}
export declare const validationKeys: {
    common: string[];
    number: string[];
    integer: string[];
    string: string[];
    array: string[];
    object: string[];
};
export declare const SchemaRow: React.FunctionComponent<ISchemaRow>;
