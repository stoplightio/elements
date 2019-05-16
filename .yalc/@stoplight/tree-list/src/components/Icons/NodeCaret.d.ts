import * as React from 'react';
import { IconStore, TreeListNode } from 'src/types';
export interface INodeCaret extends React.HTMLAttributes<HTMLDivElement> {
    expanded?: boolean;
    store: IconStore;
    node: TreeListNode;
}
export declare const NodeCaret: React.FunctionComponent<INodeCaret>;
