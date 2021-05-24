import { Pseudo } from './pseudo';
import { NegativeSpaceVals, SpaceVals } from './spacing';
import { EnhancerFn } from './types';
declare type PositionVals = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';
declare type PositionLocVals = 'auto' | SpaceVals | NegativeSpaceVals;
declare type PinVals = true | PositionLocVals;
declare type ZIndexVals = -1 | 0 | 10 | 20 | 40 | 50 | 'auto';
export interface IPositionProps {
    pos?: PositionVals;
    pin?: PinVals;
    pinY?: PinVals;
    pinX?: PinVals;
    top?: PositionLocVals;
    left?: PositionLocVals;
    right?: PositionLocVals;
    bottom?: PositionLocVals;
    zIndex?: ZIndexVals | Pseudo<ZIndexVals, 'focus'>;
}
export declare const positionPropNames: Array<keyof IPositionProps>;
export declare const positionProps: EnhancerFn<IPositionProps>;
export {};
