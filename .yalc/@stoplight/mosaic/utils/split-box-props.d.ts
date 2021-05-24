import { IBorderProps, IColorProps, IFlexProps, IInteractivityProps, ILayoutProps, IPositionProps, IShadowProps, ISizeProps, ISpacingProps, ITypographyProps, TransformProps } from '../enhancers';
interface IEnhancerProps extends IBorderProps, IColorProps, IFlexProps, IInteractivityProps, ILayoutProps, IPositionProps, IShadowProps, ISizeProps, ISpacingProps, ITypographyProps, TransformProps {
}
interface SplitBoxProps<P extends IEnhancerProps> {
    matchedProps: Pick<P, keyof IEnhancerProps>;
    remainingProps: Pick<P, Exclude<keyof P, keyof IEnhancerProps>>;
}
/**
 * Convenience method to split the Box props.
 *
 * Useful for when you want to pass all of the Box props to the root Box and
 * pass the remaining props to a child element (e.g: disabled, readOnly, required, etc).
 */
export declare function splitBoxProps<P extends IEnhancerProps>(props: P): SplitBoxProps<P>;
declare type Omit<T extends Dictionary<any>, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface Dictionary<T> {
    [key: string]: T;
}
export interface SplitProps<P, K extends keyof P> {
    matchedProps: Pick<P, K>;
    remainingProps: Omit<P, K>;
}
/**
 * Utility to split props based on an array of keys
 */
export declare function splitProps<P extends Dictionary<any>, K extends keyof P>(props: P, keys: K[]): SplitProps<P, K>;
export {};
