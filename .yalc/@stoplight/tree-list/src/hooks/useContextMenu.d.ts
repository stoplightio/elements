import * as React from 'react';
import { TreeListContextMenuGenerator } from '../types';
export declare const useContextMenu: (node: import("../types").ITreeListNode<object>, generateContextMenu?: TreeListContextMenuGenerator | undefined) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
