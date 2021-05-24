import { EnhancerFn } from './types';
export declare type SpaceVals = 'auto' | 'px' | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 32 | 40 | 60 | 80;
export declare type NegativeSpaceVals = '-px' | -0 | -0.5 | -1 | -1.5 | -2 | -2.5 | -3 | -3.5 | -4 | -5 | -6 | -7 | -8 | -9 | -10 | -11 | -12 | -14 | -16 | -20 | -24 | -32 | -40 | -60 | -80;
export interface IMarginProps {
    m?: SpaceVals | NegativeSpaceVals;
    mx?: SpaceVals | NegativeSpaceVals;
    my?: SpaceVals | NegativeSpaceVals;
    mt?: SpaceVals | NegativeSpaceVals;
    mr?: SpaceVals | NegativeSpaceVals;
    mb?: SpaceVals | NegativeSpaceVals;
    ml?: SpaceVals | NegativeSpaceVals;
}
export interface IPaddingProps {
    p?: SpaceVals;
    px?: SpaceVals;
    py?: SpaceVals;
    pt?: SpaceVals;
    pr?: SpaceVals;
    pb?: SpaceVals;
    pl?: SpaceVals;
}
export interface ISpacingProps extends IMarginProps, IPaddingProps {
}
export declare const spacingPropNames: Array<keyof ISpacingProps>;
export declare const marginProps: EnhancerFn<IMarginProps>;
export declare const paddingProps: EnhancerFn<IPaddingProps>;
