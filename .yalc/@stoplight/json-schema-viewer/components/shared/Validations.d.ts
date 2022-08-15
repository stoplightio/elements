import { RegularNode, SchemaNode } from '@stoplight/json-schema-tree';
import { Dictionary } from '@stoplight/types';
import * as React from 'react';
export interface IValidations {
    validations: Dictionary<unknown>;
    hideExamples?: boolean;
}
export declare const numberValidationNames: string[];
export declare const Validations: React.FunctionComponent<IValidations>;
export declare function validationCount(schemaNode: RegularNode): number;
export declare function getValidationsFromSchema(schemaNode: RegularNode): {
    examples?: unknown;
    default?: unknown;
    enum?: unknown[] | undefined;
};
export declare function getInternalSchemaError(schemaNode: SchemaNode, defaultErrorMessage?: string): {
    hasError: boolean;
    error: string | undefined;
};
