/// <reference types="react" />
import { HTMLInputProps, IInputGroupProps } from '@blueprintjs/core';
declare type SecretInputProps = {
    selectOnFocus?: boolean;
} & IInputGroupProps & HTMLInputProps;
export declare const SecretInput: ({ selectOnFocus, ...props }: SecretInputProps) => JSX.Element;
export {};
