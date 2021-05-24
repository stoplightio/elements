import { Pseudo } from './pseudo';
import { NegativeSpaceVals, SpaceVals } from './spacing';
import { EnhancerFn } from './types';
export declare type TransitionDelayVals = 75 | 150 | 300 | 500 | 1000;
export declare type TransitionDurationVals = 75 | 150 | 300 | 500 | 1000;
export declare type TransformProps = {
    transform?: true;
    transition?: true;
    transitionDelay?: TransitionDelayVals;
    transitionDuration?: TransitionDurationVals;
    translateX?: Pseudo<SpaceVals | NegativeSpaceVals, 'hover'>;
    translateY?: Pseudo<SpaceVals | NegativeSpaceVals, 'hover'>;
};
export declare const transformPropNames: Array<keyof TransformProps>;
export declare const transformProps: EnhancerFn<TransformProps>;
