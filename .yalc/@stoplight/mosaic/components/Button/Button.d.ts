import './style.css';
import { FocusableProps, PressEvents } from '@react-types/shared';
import React, { RefObject } from 'react';
import { IntentVals } from '../../enhancers';
import { PolymorphicComponentProps } from '../Box/types';
import { IIconProps } from '../Icon';
import { AppearanceVals } from './variants';
export declare type ButtonOwnProps = PressEvents & FocusableProps & {
    children?: React.ReactNode;
    appearance?: AppearanceVals;
    intent?: IntentVals;
    size?: 'sm' | 'md';
    active?: boolean;
    disabled?: boolean;
    loading?: boolean;
    icon?: IIconProps['icon'] | React.ReactElement;
    iconRight?: IIconProps['icon'] | React.ReactElement;
    autoFocus?: boolean;
    label?: string;
};
export declare type ButtonProps<E extends React.ElementType = typeof defaultElement> = PolymorphicComponentProps<E, ButtonOwnProps>;
declare const defaultElement = "button";
export declare const Button: <E extends React.ElementType = typeof defaultElement>(props: ButtonProps<E> & {
    ref?: RefObject<HTMLElement>;
}) => JSX.Element;
export {};
