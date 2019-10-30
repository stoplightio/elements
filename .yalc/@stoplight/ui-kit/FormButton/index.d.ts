import * as React from 'react';
import * as yup from 'yup';
import { IButtonProps } from '../index';
interface IFormButton extends Omit<IButtonProps, 'type' | 'onClick'> {
    schema?: yup.Schema<any>;
    data?: any;
    onClick?: (data: any) => void;
}
declare const FormButton: React.FunctionComponent<IFormButton>;
export { IFormButton, FormButton };
