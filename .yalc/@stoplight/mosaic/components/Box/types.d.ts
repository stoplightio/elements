import React, { ComponentProps, ElementType, HTMLAttributes } from 'react';
import { IBorderProps, IColorProps, IFlexProps, IInteractivityProps, ILayoutProps, IMarginProps, IPaddingProps, IPositionProps, IRingProps, IShadowProps, ISizeProps, ITypographyProps, TransformProps } from '../../enhancers';
declare type EnhancerProps = ITypographyProps & ISizeProps & IMarginProps & IPaddingProps & IShadowProps & IColorProps & IBorderProps & IRingProps & IInteractivityProps & IFlexProps & IPositionProps & TransformProps & ILayoutProps;
/**
 * Generic component props with "as" prop
 * @template P Additional props
 * @template T React component or string element
 */
export declare type BoxOwnProps<E extends ElementType = ElementType> = EnhancerProps & {
    /**
     * Replaces the underlying element
     */
    as?: E;
    className?: string;
    role?: string;
    noFocusRing?: boolean;
    children?: React.ReactNode;
};
/**
 * Box supports standard HTML attributes
 * Box re-defines some props like color, so omit here to prevent clash
 */
export interface IBoxHTMLAttributes<C = HTMLDivElement> extends Omit<HTMLAttributes<C>, 'color'> {
}
export declare type BoxProps<E extends ElementType> = BoxOwnProps<E> & Omit<ComponentProps<E>, keyof BoxOwnProps>;
export declare type PolymorphicComponentProps<E extends ElementType, P> = P & BoxProps<E>;
export declare type PolymorphicComponent<P, D extends ElementType = 'div'> = <E extends ElementType = D>(props: PolymorphicComponentProps<E, P>) => JSX.Element;
export {};
