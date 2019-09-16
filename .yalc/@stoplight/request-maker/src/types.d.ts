import { TreeListNode } from '@stoplight/tree-list';
import { IHttpParam, IHttpResponse } from '@stoplight/types';
export declare type Response = ErrorResponse | IHttpResponse;
export declare type ErrorResponse = {
    error: string;
};
export declare type ParamField = {
    name: string;
    description: string;
    example: string;
};
export interface IParam extends Pick<IHttpParam, Exclude<keyof IHttpParam, 'style'>> {
    name: string;
    value: string;
    isEnabled: boolean;
    fixed?: boolean;
}
export declare type HeaderParam = IParam;
export declare type QueryParam = IParam;
export declare type PathParam = IParam;
export declare type ParamType = 'query' | 'path' | 'header';
export interface INode {
    value?: unknown;
}
export declare type JsonTreeListNode = TreeListNode<INode>;
export declare type XHRResponseType = XMLHttpRequestResponseType | 'xml' | 'html';
