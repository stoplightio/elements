import './style.css';
import React, { RefObject } from 'react';
import { IMarginProps, IPaddingProps } from '../../enhancers';
import { PolymorphicComponentProps } from '../Box/types';
export declare type ButtonGroupOwnProps = IPaddingProps & IMarginProps & {
    children: React.ReactNode;
    className?: string;
};
export declare type ButtonGroupProps<E extends React.ElementType = typeof defaultElement> = PolymorphicComponentProps<E, ButtonGroupOwnProps>;
declare const defaultElement = "div";
export declare const ButtonGroup: <E extends React.ElementType = typeof defaultElement>(props: ButtonGroupProps<E> & {
    ref?: RefObject<HTMLDivElement>;
}) => JSX.Element;
export {};
