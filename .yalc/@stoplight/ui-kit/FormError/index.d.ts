import * as React from 'react';
import { Dictionary } from '../types';
interface IFormError {
    validationErrors: Array<{
        property: string;
        constraints: Dictionary<string>;
    }>;
    message?: string;
}
interface IFormErrorProps {
    errors?: ReadonlyArray<IFormError>;
}
declare const FormError: React.FunctionComponent<IFormErrorProps>;
export { FormError, IFormError, IFormErrorProps };
