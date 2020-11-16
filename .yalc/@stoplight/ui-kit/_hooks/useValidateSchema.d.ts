import * as yup from 'yup';
export declare function useValidateSchema<T>(schema?: yup.Schema<T>, value?: T, { abortEarly }?: yup.ValidateOptions, debounceDelay?: number): {
    errors: string[];
    isValidating: boolean;
}[];
