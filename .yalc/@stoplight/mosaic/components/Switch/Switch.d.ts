import './style.css';
import { SwitchBase } from '@react-types/switch';
import React, { RefObject } from 'react';
import { PolymorphicComponentProps } from '../Box/types';
export declare type SwitchOwnProps = SwitchBase & {
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
};
export declare type SwitchProps<E extends React.ElementType = typeof defaultElement> = PolymorphicComponentProps<E, SwitchOwnProps>;
declare const defaultElement = "input";
export declare const Switch: <E extends React.ElementType = typeof defaultElement>(props: SwitchProps<E> & {
    ref?: RefObject<HTMLInputElement>;
}) => JSX.Element;
export {};
