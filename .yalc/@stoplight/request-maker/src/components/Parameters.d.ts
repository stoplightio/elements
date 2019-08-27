import * as React from 'react';
import { ParamType } from '../types';
export interface IParameters {
    type: ParamType;
    className?: string;
    title?: string;
    fixedName?: boolean;
}
export declare const Parameters: React.FunctionComponent<IParameters>;
