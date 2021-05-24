import React from 'react';
import { PolymorphicComponentProps } from '../Box/types';
export declare type ImageOwnProps = {
    src: string;
};
declare const defaultElement = "img";
export declare type ImageProps<E extends React.ElementType = typeof defaultElement> = PolymorphicComponentProps<E, ImageOwnProps>;
export declare function Image<E extends React.ElementType = typeof defaultElement>({ className, ...props }: ImageProps<E>): JSX.Element;
export {};
