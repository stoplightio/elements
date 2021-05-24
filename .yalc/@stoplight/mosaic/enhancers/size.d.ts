import { SpaceVals } from './spacing';
import { EnhancerFn } from './types';
export declare type HeightVals = SpaceVals | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'screen';
export declare type MaxHeightVals = 'full' | 'screen';
export declare type MinHeightVals = 'full' | 'screen';
export declare type WidthVals = SpaceVals | 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '2/6' | '3/6' | '4/6' | '5/6' | 'full' | 'screen' | 'min' | 'max';
export declare type MaxWidthVals = 'none' | 'full' | 'min' | 'max' | 'prose';
export declare type MinWidthVals = 'full' | 'min' | 'max';
export interface IHeightProps {
    h?: HeightVals;
    maxH?: MaxHeightVals;
    minH?: MinHeightVals;
}
export interface IWidthProps {
    w?: WidthVals;
    maxW?: MaxWidthVals;
    minW?: MinWidthVals;
}
export interface ISizeProps extends IHeightProps, IWidthProps {
}
export declare const sizePropNames: Array<keyof ISizeProps>;
export declare const sizeProps: EnhancerFn<ISizeProps>;
