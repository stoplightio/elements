import './style.css';
import React from 'react';
import { PolymorphicComponentProps } from '../Box';
export declare type LinkOwnProps = {
    href?: string;
};
export declare type LinkProps<E extends React.ElementType = typeof defaultElement> = PolymorphicComponentProps<E, LinkOwnProps>;
declare const defaultElement = "a";
export declare const Link: <E extends React.ElementType = typeof defaultElement>(props: LinkProps<E>) => JSX.Element;
export {};
