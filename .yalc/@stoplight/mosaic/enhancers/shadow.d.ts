import { Pseudo } from './pseudo';
import { EnhancerFn } from './types';
export declare type BoxShadowVals = true | false | 'sm' | 'md' | 'lg' | 'xl' | 'xl' | '2xl';
export interface IShadowProps {
    boxShadow?: BoxShadowVals | Pseudo<BoxShadowVals, 'hover' | 'focus'>;
}
export declare const shadowPropNames: Array<keyof IShadowProps>;
export declare const shadowProps: EnhancerFn<IShadowProps>;
