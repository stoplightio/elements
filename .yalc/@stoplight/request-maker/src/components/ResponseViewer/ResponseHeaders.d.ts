import { Dictionary } from '@stoplight/types';
import * as React from 'react';
export interface IResponseHeaders {
    headers: Dictionary<string, string>;
}
export declare const ResponseHeaders: React.FunctionComponent<IResponseHeaders>;
