import './style.css';
import React from 'react';
import { BoxProps } from '../Box';
export declare type ProseProps = BoxProps<'div'>;
export declare const Prose: React.NamedExoticComponent<import("../..").ITypographyProps & import("../..").ISizeProps & import("../..").IMarginProps & import("../..").IPaddingProps & import("../..").IShadowProps & import("../..").IColorProps & import("../..").IBorderProps & import("../..").IRingProps & import("../..").IInteractivityProps & import("../..").IFlexProps & import("../..").IPositionProps & import("../..").TransformProps & import("../..").ILayoutProps & {
    as?: "div";
    className?: string;
    role?: string;
    noFocusRing?: boolean;
    children?: React.ReactNode;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof import("../..").ITypographyProps | keyof import("../..").ISizeProps | keyof import("../..").IMarginProps | keyof import("../..").IPaddingProps | "boxShadow" | keyof import("../..").IColorProps | keyof import("../..").IBorderProps | keyof import("../..").IRingProps | keyof import("../..").IInteractivityProps | keyof import("../..").IFlexProps | keyof import("../..").IPositionProps | keyof import("../..").TransformProps | keyof import("../..").ILayoutProps | "as" | "className" | "role" | "noFocusRing" | "children">>;
