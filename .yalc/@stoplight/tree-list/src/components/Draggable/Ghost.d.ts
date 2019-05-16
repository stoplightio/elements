import { DragEvent } from 'react';
import { IDraggableGhost } from './types';
export declare class Ghost implements IDraggableGhost {
    protected node: HTMLSpanElement;
    constructor();
    content: string | null;
    attach: (e: DragEvent<Element>) => void;
    detach: () => void;
}
