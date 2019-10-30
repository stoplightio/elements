import * as React from 'react';
import { IContentsNode } from './types';
export interface ITableOfContents {
    contents: IContentsNode[];
    rowRenderer?: (item: IContentsNode, DefaultRow: React.FC<ITableOfContentsItem>) => React.ReactElement;
    padding?: string;
    className?: string;
    title?: string;
    isOpen?: boolean;
    onClose?: () => void;
    enableDrawer?: boolean | number;
}
export declare const TableOfContents: React.FunctionComponent<ITableOfContents>;
interface ITableOfContentsItem {
    item: IContentsNode;
    isExpanded?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export {};
