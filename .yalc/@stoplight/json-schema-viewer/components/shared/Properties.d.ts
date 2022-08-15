import { Dictionary } from '@stoplight/types';
import * as React from 'react';
export interface IProperties {
    required: boolean;
    deprecated: boolean;
    validations: Dictionary<unknown>;
}
export declare const useHasProperties: ({ required, deprecated, validations: { readOnly, writeOnly } }: IProperties) => boolean;
export declare const Properties: React.FunctionComponent<IProperties>;
