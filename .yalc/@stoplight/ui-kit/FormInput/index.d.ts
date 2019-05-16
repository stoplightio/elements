import { HTMLInputProps, IInputGroupProps } from '@blueprintjs/core';
import * as React from 'react';
import * as yup from 'yup';
interface IFormInputProps {
    value: IInputGroupProps['value'];
    onEnter?: Function;
    schema?: yup.Schema<any>;
}
declare const FormInput: React.FunctionComponent<IInputGroupProps & IFormInputProps & HTMLInputProps>;
declare type Size = 'small' | 'default' | 'large';
interface IFormInputValidationProps {
    value: IInputGroupProps['value'];
    schema: yup.Schema<any>;
    size: Size;
}
export { FormInput, IFormInputProps, IFormInputValidationProps };
