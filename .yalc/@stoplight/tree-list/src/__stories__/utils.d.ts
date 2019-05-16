import { TreeStore } from '../store';
import { ITreeListContextMenuItem } from '../types';
export declare const generateRandomId: () => string;
export declare const generateContextMenu: (store: TreeStore) => (node: import("../types").ITreeListNode<object>) => ITreeListContextMenuItem[];
