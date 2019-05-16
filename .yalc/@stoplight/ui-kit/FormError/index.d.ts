import { Dictionary } from '@stoplight/types';
import * as React from 'react';
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
