import React from 'react';
import { PolymorphicComponentProps } from '../Box';
export declare type ParagraphSizeVals = 'leading' | 'default' | 'small' | 'tiny';
export declare type ParagraphOwnProps = {
    size?: ParagraphSizeVals;
};
export declare type ParagraphProps<E extends React.ElementType = typeof defaultElement> = PolymorphicComponentProps<E, ParagraphOwnProps>;
declare const defaultElement = "p";
export declare const Paragraph: <E extends React.ElementType = typeof defaultElement>(props: ParagraphProps<E>) => JSX.Element;
export {};
