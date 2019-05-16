import { Dictionary } from '@stoplight/types';
import { IconStore, INewNode, ITreeCreateable, ITreeExpandable, ITreeListEvents, ITreeRenameable, NodeValidator, TreeListNode } from './types';
declare const TreeStore_base: new () => import("strict-event-emitter-types/types/src").StrictEventEmitter<import("@stoplight/lifecycle").IEventEmitterInstance, ITreeListEvents, ITreeListEvents, "addListener" | "addEventListener" | "removeListener" | "removeEventListener" | "once", "on" | "emit">;
export declare class TreeStore extends TreeStore_base implements ITreeExpandable, ITreeCreateable, ITreeRenameable {
    activeNodeId?: string;
    editedNodeId?: string;
    newNode?: INewNode;
    nodes: TreeListNode[];
    expanded: Dictionary<boolean>;
    icons: IconStore;
    defaultExpandedDepth: number;
    constructor(initialStore?: Partial<Pick<TreeStore, 'nodes' | 'expanded' | 'icons' | 'defaultExpandedDepth'>>);
    readonly setActiveNode: (id: string) => void;
    protected readonly setEditedNode: (id?: string | undefined) => void;
    readonly toggleExpand: (node: import("./types").ITreeListNode<object>, flag?: boolean | undefined) => void;
    isNodeExpanded(node: TreeListNode): boolean;
    private _knownPossibleDepth;
    readonly knownPossibleDepth: number;
    readonly filteredNodes: import("./types").ITreeListNode<object>[];
    readonly create: (parentNode: import("./types").ITreeListNode<object> | import("./types").IRootNode | null, newNode?: (Partial<import("./types").ITreeListNode<object>> & {
        id: string;
    }) | undefined, validator?: NodeValidator | undefined) => Promise<INewNode<object>>;
    readonly rename: (node: import("./types").ITreeListNode<object>, validator?: NodeValidator | undefined) => Promise<import("./types").ITreeListNode<object>>;
}
export {};
