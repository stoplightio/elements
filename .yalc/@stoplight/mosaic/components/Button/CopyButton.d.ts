import React from 'react';
import { ButtonOwnProps } from './Button';
export declare type CopyButtonProps = {
    copyValue: string;
} & ButtonOwnProps;
export declare const CopyButton: React.ForwardRefExoticComponent<{
    copyValue: string;
} & import("@react-types/shared").PressEvents & import("@react-types/shared").FocusableProps & {
    children?: React.ReactNode;
    appearance?: import("./variants").AppearanceVals;
    intent?: import("../..").IntentVals;
    size?: "sm" | "md";
    active?: boolean;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | import("@fortawesome/fontawesome-svg-core").IconProp;
    iconRight?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | import("@fortawesome/fontawesome-svg-core").IconProp;
    autoFocus?: boolean;
    label?: string;
} & React.RefAttributes<HTMLButtonElement>>;
