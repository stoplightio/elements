import { Dictionary } from '@stoplight/types';
import { IMenuItemProps, MaybeElement } from '@stoplight/ui-kit';
import { IconName } from '@stoplight/ui-kit/Icons';
import { ColorProperty } from 'csstype';
import { ErrorBoundaryProps } from 'react-error-boundary';
import * as React from 'react';
import { IDraggableInstance } from './components/Draggable/types';
import { TreeStore } from './store';
export interface ITreeListContext {
    store: TreeStore;
    draggable: IDraggableInstance;
}
export interface ITreeListProvider extends ITreeListClassNames {
    store: TreeStore;
}
export declare type TreeListContextMenuGenerator = (node: TreeListNode) => ITreeListContextMenuItem[] | void;
export interface ITreeListProps extends ITreeListProvider, ITreeList {
}
export interface ITreeListClassNames {
    className?: string;
    innerClassName?: string;
    itemClassName?: string;
}
export interface IRowRendererOptions {
    isEdited?: boolean;
    isExpanded?: boolean;
}
export declare type RowRenderer = (node: TreeListNode, options: IRowRendererOptions) => React.ReactNode;
export interface ITreeList extends ErrorBoundaryProps {
    autoExpandDelay?: number;
    rowHeight?: number;
    rowRenderer?: RowRenderer;
    striped?: boolean;
    interactive?: boolean;
    maxRows?: number;
    style?: React.CSSProperties;
    canDrag?: (node: TreeListNode) => boolean;
    canDrop?: (node: TreeListNode, parentNode: TreeListParentNode) => boolean;
    generateContextMenu?: TreeListContextMenuGenerator;
}
export interface ITreeListItem {
    index: number;
    data: ITreeListItemData;
    style?: React.CSSProperties;
}
export interface ITreeListItemData extends Pick<ITreeList, 'autoExpandDelay' | 'rowHeight' | 'rowRenderer' | 'canDrag' | 'canDrop' | 'generateContextMenu' | 'striped'> {
    nodes: TreeListNode[];
    newNode?: INewNode;
}
export interface ITreeListContextMenu {
    items: ITreeListContextMenuItem[];
}
export interface ITreeListContextMenuItem extends IMenuItemProps {
    divider?: boolean;
    children?: ITreeListContextMenuItem[];
}
export declare type TreeListMouseEventHandler = (e: React.MouseEvent<HTMLElement>, node: TreeListNode) => void;
export declare type TreeListDropEventHandler = (node: TreeListNode, parentNode: TreeListParentNode) => void;
export declare type TreeListEditCompleteEventHandler = (renamedNode: TreeListNode, parentNode: TreeListParentNode) => void;
export declare enum TreeListEvents {
    NodeClick = "node.click",
    NodeMouseEnter = "node.mouseenter",
    NodeMouseLeave = "node.mouseexit",
    NodeDoubleClick = "node.doubleClick",
    NodeCaretClick = "node.caretClick",
    Drop = "drop",
    EditCancel = "edit.cancel",
    BeforeEditComplete = "edit.beforecomplete",
    AfterEditComplete = "edit.aftercomplete"
}
export interface ITreeListEvents {
    [TreeListEvents.NodeClick]: TreeListMouseEventHandler;
    [TreeListEvents.NodeMouseEnter]: TreeListMouseEventHandler;
    [TreeListEvents.NodeMouseLeave]: TreeListMouseEventHandler;
    [TreeListEvents.NodeDoubleClick]: TreeListMouseEventHandler;
    [TreeListEvents.NodeCaretClick]: TreeListMouseEventHandler;
    [TreeListEvents.Drop]: TreeListDropEventHandler;
    [TreeListEvents.EditCancel](): void;
    [TreeListEvents.BeforeEditComplete]: TreeListEditCompleteEventHandler;
    [TreeListEvents.AfterEditComplete]: TreeListEditCompleteEventHandler;
}
export declare type TreeListNodeType = string;
export interface ITreeListNode<T extends object = object> {
    id: string;
    level: number;
    name: string;
    type?: TreeListNodeType;
    canHaveChildren?: boolean;
    className?: string;
    style?: React.CSSProperties;
    metadata?: T;
}
export interface IRootNode {
    id: null;
}
export interface INewNode<T extends object = object> extends ITreeListNode<T> {
    index: number;
}
export declare type TreeListNode<T extends object = object> = ITreeListNode<T>;
export declare type TreeListParentNode<T extends object = object> = TreeListNode<T> | IRootNode;
export interface ITreeExpandable {
    expanded?: Dictionary<boolean>;
    readonly toggleExpand: (node: ITreeListNode, flag?: boolean) => void;
}
export declare type NodeValidator = (node: TreeListNode, parentNode: TreeListParentNode) => void;
export interface ITreeCreateable {
    editedNodeId?: string;
    newNode?: INewNode;
    readonly create: (parentNode: TreeListParentNode | null, newNode?: Partial<TreeListNode> & {
        id: string;
    }, validator?: NodeValidator) => Promise<INewNode>;
}
export interface ITreeRenameable {
    editedNodeId?: string;
    readonly rename: (node: TreeListNode, validator?: NodeValidator) => Promise<TreeListNode>;
}
export declare type IconStore = Dictionary<ITreeListIcon | ITreeListCustomIcon | null, TreeListNodeType>;
export declare type ITreeListCustomIcon = (node: TreeListNode) => ITreeListIcon | void;
export declare enum TreeListCaretIcons {
    Right = "right",
    Down = "down"
}
export interface ITreeListIcon {
    default: IconName | MaybeElement | null | 'blank';
    expanded?: IconName | MaybeElement | null | 'blank';
    color?: ColorProperty;
}
