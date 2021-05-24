import { FontSizeVals, HeightVals, IntentVals, NegativeSpaceVals, RoundedVals, SpaceVals } from '../../enhancers';
import { BoxOwnProps } from '../Box/types';
export declare type AppearanceVals = 'default' | 'primary' | 'minimal' | 'select';
export declare const sizes: Partial<Record<HeightVals, {
    px: SpaceVals;
    fontSize: FontSizeVals;
    rounded: RoundedVals;
    leftIconMx: SpaceVals | NegativeSpaceVals;
    leftIconMr: SpaceVals | NegativeSpaceVals;
    rightIconMl: SpaceVals | NegativeSpaceVals;
    rightIconMr: SpaceVals | NegativeSpaceVals;
}>>;
export declare const variants: Record<AppearanceVals, Record<IntentVals, Partial<BoxOwnProps>>>;
