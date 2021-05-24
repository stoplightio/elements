import { SemanticColorVals } from './color';
import { OpacityVals } from './interactivity';
import { Pseudo } from './pseudo';
import { EnhancerFn } from './types';
export declare type OutlineVals = 'none';
export declare type BorderColorVals = 'body' | 'light' | 'dark' | 'button' | 'input' | 'transparent' | SemanticColorVals;
export declare type BorderWidthVals = true | 0 | 2 | 4 | 8;
export declare type RoundedVals = true | 'none' | 'sm' | 'lg' | 'xl' | 'full' | 'b' | 't' | 'l' | 'r' | 'tl' | 'tr' | 'bl' | 'br' | 'b-none' | 't-none' | 'l-none' | 'r-none' | 'tl-none' | 'tr-none' | 'bl-none' | 'br-none' | 'b-sm' | 't-sm' | 'l-sm' | 'r-sm' | 'tl-sm' | 'tr-sm' | 'bl-sm' | 'br-sm' | 'b-lg' | 't-lg' | 'l-lg' | 'r-lg' | 'tl-lg' | 'tr-lg' | 'bl-lg' | 'br-lg' | 'b-xl' | 't-xl' | 'l-xl' | 'r-xl' | 'tl-xl' | 'tr-xl' | 'bl-xl' | 'br-xl' | 'b-full' | 't-full' | 'l-full' | 'r-full' | 'tl-full' | 'tr-full' | 'bl-full' | 'br-full';
export interface IBorderProps {
    outline?: OutlineVals;
    borderColor?: BorderColorVals | Pseudo<BorderColorVals, 'hover' | 'focus'>;
    border?: BorderWidthVals;
    borderT?: BorderWidthVals;
    borderR?: BorderWidthVals;
    borderL?: BorderWidthVals;
    borderB?: BorderWidthVals;
    rounded?: RoundedVals;
}
export declare const borderPropNames: Array<keyof IBorderProps>;
export declare const borderProps: EnhancerFn<IBorderProps>;
export declare type RingWidthVals = true | false;
export declare type RingColorVals = 'primary' | 'success' | 'warning' | 'danger';
export declare type RingOpacityVals = OpacityVals;
export interface IRingProps {
    ring?: RingWidthVals | Pseudo<RingWidthVals, 'focus'>;
    ringColor?: RingColorVals | Pseudo<RingColorVals, 'focus'>;
    ringOpacity?: RingOpacityVals | Pseudo<RingOpacityVals, 'focus'>;
}
export declare const ringPropNames: Array<keyof IRingProps>;
export declare const ringProps: EnhancerFn<IRingProps>;
