import { Pseudo } from './pseudo';
import { EnhancerFn } from './types';
export declare type Cursor = 'auto' | 'default' | 'pointer' | 'wait' | 'text' | 'move' | 'not-allowed' | 'zoom-in' | 'zoom-out';
export declare type UserSelect = 'none' | 'text' | 'all' | 'auto';
export declare type Resize = true | 'none' | 'y' | 'x';
export declare type PointerEvents = 'none' | 'auto';
export declare type OpacityVals = 0 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
export declare type VisibilityVals = 'visible' | 'invisible';
export interface IInteractivityProps {
    cursor?: Cursor;
    opacity?: OpacityVals | Pseudo<OpacityVals, 'hover' | 'focus' | 'active' | 'disabled'>;
    pointerEvents?: PointerEvents;
    resize?: Resize;
    userSelect?: UserSelect;
    visibility?: VisibilityVals | Pseudo<VisibilityVals, 'groupHover' | 'groupFocus'>;
}
export declare const interactivityPropNames: Array<keyof IInteractivityProps>;
export declare const interactivityProps: EnhancerFn<IInteractivityProps>;
