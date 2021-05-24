/**
 * This must be imported standalone for downstream treeshaking to work.
 */
import '../../utils/languages';
import { BoxOwnProps, CopyButtonProps, PolymorphicComponentProps } from '@stoplight/mosaic';
import React from 'react';
import { CodeViewerLanguage } from '../../utils';
declare type CodeViewerBaseProps = {
    value: string;
    showLineNumbers?: boolean;
    title?: string;
    noCopyButton?: boolean;
    /**
     * Props to pass to the inner code container
     */
    innerProps?: BoxOwnProps;
    /**
     * Defaults to 500
     */
    maxHeight?: string;
    /**
     * Applied to the innermost highlight container
     */
    highlightPadding?: {
        x: number;
        y: number;
    };
};
declare type CodeViewerWithLanguage = CodeViewerBaseProps & {
    language: CodeViewerLanguage;
    customLanguage?: never;
};
declare type CodeViewerWithCustomLanguage = CodeViewerBaseProps & {
    customLanguage: string;
    language?: never;
};
export declare type CodeViewerOwnProps = CodeViewerWithLanguage | CodeViewerWithCustomLanguage;
export declare type CodeViewerProps<E extends React.ElementType = 'pre'> = PolymorphicComponentProps<E, CodeViewerOwnProps>;
export declare const DEFAULT_HIGHLIGHT_PADDING: {
    x: number;
    y: number;
};
export declare const CODE_LINE_HEIGHT = 21;
export declare const CodeViewer: <E extends React.ElementType = 'pre'>(props: CodeViewerProps<E>) => React.ReactElement | null;
export declare const useHighlight: ({ value, language, showLineNumbers, style: propStyle, }: {
    value: string;
    language?: CodeViewerLanguage | string;
    showLineNumbers?: boolean;
    style?: React.CSSProperties;
}) => {
    pad: number;
    lines: number;
    gutterWidth: number;
    renderHighlight: () => JSX.Element;
};
export declare const HighlightCodeFallback: ({ lines, highlightPadding, }: {
    lines?: number;
    highlightPadding?: CodeViewerOwnProps['highlightPadding'];
}) => JSX.Element;
export declare const CodeContainer: React.NamedExoticComponent<import("@stoplight/mosaic").ITypographyProps & import("@stoplight/mosaic").ISizeProps & import("@stoplight/mosaic").IMarginProps & import("@stoplight/mosaic").IPaddingProps & import("@stoplight/mosaic").IShadowProps & import("@stoplight/mosaic").IColorProps & import("@stoplight/mosaic").IBorderProps & import("@stoplight/mosaic").IRingProps & import("@stoplight/mosaic").IInteractivityProps & import("@stoplight/mosaic").IFlexProps & import("@stoplight/mosaic").IPositionProps & import("@stoplight/mosaic").TransformProps & import("@stoplight/mosaic").ILayoutProps & {
    as?: React.ElementType<any>;
    className?: string;
    role?: string;
    noFocusRing?: boolean;
    children?: React.ReactNode;
} & Omit<any, keyof import("@stoplight/mosaic").ITypographyProps | keyof import("@stoplight/mosaic").ISizeProps | keyof import("@stoplight/mosaic").IMarginProps | keyof import("@stoplight/mosaic").IPaddingProps | "boxShadow" | keyof import("@stoplight/mosaic").IColorProps | keyof import("@stoplight/mosaic").IBorderProps | keyof import("@stoplight/mosaic").IRingProps | keyof import("@stoplight/mosaic").IInteractivityProps | keyof import("@stoplight/mosaic").IFlexProps | keyof import("@stoplight/mosaic").IPositionProps | keyof import("@stoplight/mosaic").TransformProps | keyof import("@stoplight/mosaic").ILayoutProps | "as" | "className" | "role" | "noFocusRing" | "children"> & {
    renderHighlight: () => JSX.Element;
    maxHeight?: number;
    innerProps?: CodeViewerOwnProps['innerProps'];
    lines?: number;
    copyValue?: string;
    highlightPadding?: CodeViewerOwnProps['highlightPadding'];
}>;
export declare const CornerCopyButton: (props: CopyButtonProps) => JSX.Element;
export {};
