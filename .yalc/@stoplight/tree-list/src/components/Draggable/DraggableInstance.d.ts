/// <reference types="node" />
import { TreeListNode, TreeListParentNode } from 'src/types';
import { IDraggableGhost, IDraggableHighlighter, IDraggableInstance } from './types';
export declare class DraggableInstance implements IDraggableInstance {
    currentDragZone?: TreeListParentNode;
    initialDragZone?: TreeListParentNode;
    initialNode?: TreeListNode;
    collapseTimeout?: number | void | NodeJS.Timer;
    highlighter: IDraggableHighlighter;
    ghost: IDraggableGhost;
    id: number;
    dropPermissions: Map<string, boolean>;
    private static seed;
    constructor();
    clear(): void;
}
