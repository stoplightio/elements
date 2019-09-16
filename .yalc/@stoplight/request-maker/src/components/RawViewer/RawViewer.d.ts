import * as React from 'react';
import { XHRResponseType } from '../../types';
export interface IRawViewer {
    type: XHRResponseType;
    response: unknown;
}
export declare const RawViewer: React.FunctionComponent<IRawViewer>;
