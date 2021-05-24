import React from 'react';
import { ITypographyProps } from '../../enhancers';
import { BoxProps } from '../Box/types';
export declare type HeadingSizeVals = 1 | 2 | 3 | 4;
export declare type HeadingOwnProps = {
    size: HeadingSizeVals;
};
export declare type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4';
export declare type HeadingProps = HeadingOwnProps & BoxProps<HeadingAs>;
export declare const Heading: React.NamedExoticComponent<HeadingOwnProps & ITypographyProps & import("../../enhancers").ISizeProps & import("../../enhancers").IMarginProps & import("../../enhancers").IPaddingProps & import("../../enhancers").IShadowProps & import("../../enhancers").IColorProps & import("../../enhancers").IBorderProps & import("../../enhancers").IRingProps & import("../../enhancers").IInteractivityProps & import("../../enhancers").IFlexProps & import("../../enhancers").IPositionProps & import("../../enhancers").TransformProps & import("../../enhancers").ILayoutProps & {
    as?: HeadingAs;
    className?: string;
    role?: string;
    noFocusRing?: boolean;
    children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, keyof ITypographyProps | keyof import("../../enhancers").ISizeProps | keyof import("../../enhancers").IMarginProps | keyof import("../../enhancers").IPaddingProps | "boxShadow" | keyof import("../../enhancers").IColorProps | keyof import("../../enhancers").IBorderProps | keyof import("../../enhancers").IRingProps | keyof import("../../enhancers").IInteractivityProps | keyof import("../../enhancers").IFlexProps | keyof import("../../enhancers").IPositionProps | keyof import("../../enhancers").TransformProps | keyof import("../../enhancers").ILayoutProps | "as" | "className" | "role" | "noFocusRing" | "children">>;
