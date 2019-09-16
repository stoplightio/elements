import { Suggest } from '@stoplight/ui-kit/Select';
import * as React from 'react';
import { IParam, ParamField, ParamType } from '../types';
declare type InFocus = {
    prop: string;
    index: number;
};
declare type PropChangeHandler = <T extends keyof IParam>(prop: T, index: number, value: IParam[T]) => void;
interface ISuggestRendererOptions {
    name: string;
    params: IParam[];
    index: number;
    inFocus: InFocus;
    setInFocus: (val: InFocus) => void;
    handlerPropChange: PropChangeHandler;
}
export interface IParamEditor {
    type: ParamType;
    className?: string;
    suggestRenderer?: (options: ISuggestRendererOptions) => React.ReactElement<Suggest<ParamField>>;
}
export declare const ParamEditor: React.FunctionComponent<IParamEditor>;
export {};
