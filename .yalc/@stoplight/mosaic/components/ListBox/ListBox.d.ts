import { ListProps } from '@react-stately/list';
import * as React from 'react';
import { BoxOwnProps } from '../Box';
export declare type ListBoxProps<T> = ListProps<T> & BoxOwnProps;
export declare const ListBox: <T>(props: ListProps<T> & import("../..").ITypographyProps & import("../..").ISizeProps & import("../..").IMarginProps & import("../..").IPaddingProps & import("../..").IShadowProps & import("../..").IColorProps & import("../..").IBorderProps & import("../..").IRingProps & import("../..").IInteractivityProps & import("../..").IFlexProps & import("../..").IPositionProps & import("../..").TransformProps & import("../..").ILayoutProps & {
    as?: React.ElementType<any>;
    className?: string;
    role?: string;
    noFocusRing?: boolean;
    children?: React.ReactNode;
} & {
    ref?: React.RefObject<HTMLDivElement>;
}) => React.ReactElement;
export declare const ListBoxItem: <T>(props: import("@react-types/shared").ItemProps<T>) => JSX.Element;
