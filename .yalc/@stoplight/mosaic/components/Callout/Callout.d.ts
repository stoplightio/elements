import React from 'react';
import { IntentVals } from '../../enhancers';
import { BoxProps } from '../Box/types';
import { IIconProps } from '../Icon';
export declare type CalloutProps = BoxProps<React.ElementType> & {
    /** Name or Icon props of a Font Awesome Icon to render*/
    icon?: IIconProps['icon'] | React.ReactElement;
    /**
     * Intent style for the callout. Seting will change callout colors and icon.
     * @default default
     */
    intent?: IntentVals | 'info';
    /**
     * appearance style for the callout. Setting to outline will change callout backgound from solid to transparent.
     * @default default
     */
    appearance?: 'default' | 'outline';
    /**
     * Readered as the title of the callout
     */
    heading?: string;
};
export declare const Callout: React.NamedExoticComponent<import("../../enhancers").ITypographyProps & import("../../enhancers").ISizeProps & import("../../enhancers").IMarginProps & import("../../enhancers").IPaddingProps & import("../../enhancers").IShadowProps & import("../../enhancers").IColorProps & import("../../enhancers").IBorderProps & import("../../enhancers").IRingProps & import("../../enhancers").IInteractivityProps & import("../../enhancers").IFlexProps & import("../../enhancers").IPositionProps & import("../../enhancers").TransformProps & import("../../enhancers").ILayoutProps & {
    as?: React.ElementType<any>;
    className?: string;
    role?: string;
    noFocusRing?: boolean;
    children?: React.ReactNode;
} & Omit<any, keyof import("../../enhancers").ITypographyProps | keyof import("../../enhancers").ISizeProps | keyof import("../../enhancers").IMarginProps | keyof import("../../enhancers").IPaddingProps | "boxShadow" | keyof import("../../enhancers").IColorProps | keyof import("../../enhancers").IBorderProps | keyof import("../../enhancers").IRingProps | keyof import("../../enhancers").IInteractivityProps | keyof import("../../enhancers").IFlexProps | keyof import("../../enhancers").IPositionProps | keyof import("../../enhancers").TransformProps | keyof import("../../enhancers").ILayoutProps | "as" | "className" | "role" | "noFocusRing" | "children"> & {
    /** Name or Icon props of a Font Awesome Icon to render*/
    icon?: IIconProps['icon'] | React.ReactElement;
    /**
     * Intent style for the callout. Seting will change callout colors and icon.
     * @default default
     */
    intent?: IntentVals | 'info';
    /**
     * appearance style for the callout. Setting to outline will change callout backgound from solid to transparent.
     * @default default
     */
    appearance?: 'default' | 'outline';
    /**
     * Readered as the title of the callout
     */
    heading?: string;
}>;
