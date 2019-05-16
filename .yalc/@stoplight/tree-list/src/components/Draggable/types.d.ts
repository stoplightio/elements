/// <reference types="node" />
import { CSSProperties, DragEvent, HTMLAttributes } from 'react';
import { IRootNode, ITreeListItemData, TreeListNode, TreeListParentNode } from 'src/types';
export interface IDraggableItem extends HTMLAttributes<HTMLDivElement>, ITreeListItemData {
    node: TreeListNode;
    contextMenuId?: string;
}
export interface IDraggableContainer {
    className?: string;
    style?: CSSProperties;
}
export interface IDraggableInstance {
    id: number;
    currentDragZone?: TreeListParentNode;
    initialDragZone?: TreeListParentNode;
    initialNode?: TreeListNode;
    dropPermissions: Map<TreeListNode['id'] | IRootNode['id'], boolean>;
    highlighter: IDraggableHighlighter;
    ghost: IDraggableGhost;
    collapseTimeout?: number | void | NodeJS.Timer;
    clear(): void;
}
export interface IDraggableHighlighter {
    setRange(parentNode: TreeListParentNode): void;
    clearRange(parentNode: TreeListParentNode): void;
    setGenericStyles(): void;
    clearGenericStyles(): void;
}
export interface IDraggableGhost {
    content: string | null;
    attach(e: DragEvent): void;
    detach(): void;
}
