import { EnhancerFn } from './types';
export declare type DisplayVals = 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'hidden';
export declare type OverflowVals = 'auto' | 'scroll' | 'hidden' | 'visible';
export declare type ObjectFitVals = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export declare type ObjectPositionVals = 'bottom' | 'center' | 'left' | 'left-bottom' | 'left-top' | 'right' | 'right-bottom' | 'right-top' | 'top';
export interface ILayoutProps {
    display?: DisplayVals;
    overflowY?: OverflowVals;
    overflowX?: OverflowVals;
    objectFit?: ObjectFitVals;
    objectPosition?: ObjectPositionVals;
}
export declare const layoutPropNames: Array<keyof ILayoutProps>;
export declare const layoutProps: EnhancerFn<ILayoutProps>;
