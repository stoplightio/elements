import { TreeListParentNode } from 'src/types';
import { IDraggableHighlighter } from './types';
export declare class Highlighter implements IDraggableHighlighter {
    private rootZoneId;
    protected cache: WeakMap<TreeListParentNode<object>, HTMLStyleElement>;
    protected genericStyle?: HTMLStyleElement;
    constructor(rootZoneId: number);
    setGenericStyles(): void;
    clearGenericStyles(): void;
    setRange(node: TreeListParentNode): void;
    clearRange(node: TreeListParentNode): void;
    protected static generateStyles(selector: string, styles: Partial<CSSStyleDeclaration>): string;
}
