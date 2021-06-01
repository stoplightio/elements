import { Dictionary } from '@stoplight/types';
import * as React from 'react';
export interface IProperties {
    required: boolean;
    deprecated: boolean;
    validations: Dictionary<unknown>;
}
export declare const Properties: React.FunctionComponent<IProperties>;
