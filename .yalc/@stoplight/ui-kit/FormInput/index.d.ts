import { HTMLInputProps, IInputGroupProps, ITooltipProps } from '@blueprintjs/core';
import * as React from 'react';
import * as yup from 'yup';
interface IFormInputProps {
    value: IInputGroupProps['value'];
    onEnter?: Function;
    schema?: yup.Schema<any>;
    errors?: string[];
    validationTooltipProps?: Partial<ITooltipProps>;
}
declare const FormInput: React.FunctionComponent<IInputGroupProps & IFormInputProps & HTMLInputProps>;
declare type Size = 'small' | 'default' | 'large';
interface IFormInputValidationProps {
    value: IInputGroupProps['value'];
    size: Size;
    schema?: yup.Schema<any>;
    errors?: string[];
    tooltipProps?: Partial<ITooltipProps>;
}
export { FormInput, IFormInputProps, IFormInputValidationProps };
