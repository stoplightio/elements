/// <reference types="react" />
import * as yup from 'yup';
import { IButtonProps } from '../index';
declare type OwnProps<T> = {
    schema?: yup.Schema<T>;
    data?: T;
};
declare type IFormButtonProps<T> = Omit<IButtonProps, 'type'> & OwnProps<T>;
declare function FormButton<T>({ schema, data, loading, disabled, ...buttonProps }: IFormButtonProps<T>): JSX.Element;
export { FormButton };
