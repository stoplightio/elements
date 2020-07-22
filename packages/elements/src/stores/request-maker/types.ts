import { DeprecatedTreeListNode, TreeListNode } from '@stoplight/tree-list';
import { IHttpParam, IHttpResponse } from '@stoplight/types';

export type Response = ErrorResponse | IHttpResponse;

export type ErrorResponse = {
  error: string;
};

export type ParamField = {
  name: string;
  description: string;
  example: string;
};

export type IParam<T = string | undefined> = Omit<IHttpParam, 'style'> & {
  name: string;
  value: T;
  type?: string;
  isEnabled: boolean;
};

export type HeaderParam = IParam;
export type QueryParam = IParam;
export type PathParam = IParam;

export type ParamType = 'query' | 'path' | 'header' | 'formData' | 'urlEncoded';
export type ContentType = 'none' | 'raw' | 'form-data' | 'x-www-form-urlencoded' | 'binary' | 'graphql';

export interface INode {
  value?: unknown;
}

// todo(jr): use TreeListNode and merge it with JsonTreeListNode
export type DeprecatedJsonTreeListNode = DeprecatedTreeListNode<INode>;
export type JsonTreeListNode = TreeListNode<INode>;

export type XHRResponseType = '' | 'json' | 'text' | 'xml' | 'html' | 'md' | 'img';

export type Auth = {
  username: string;
  password: string;
};

export interface IHttpNameValue {
  [name: string]: string;
}
