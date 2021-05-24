import { BoxOwnProps } from '../Box/types';
export declare type AppearanceVals = 'minimal' | 'line';
export declare type OrientationVals = 'horizontal' | 'vertical';
export declare type DensityVals = 'compact' | 'regular';
export declare type AlignVals = 'center' | 'end' | 'start';
export declare type DirectionVals = 'ltr' | 'rtl';
export declare const variants: Record<AppearanceVals, Record<OrientationVals, Record<DensityVals, Record<'tabList' | 'tab', Partial<BoxOwnProps>>>>>;
