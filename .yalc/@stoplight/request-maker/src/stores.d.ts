import { IHttpNameValue } from '@stoplight/prism-http/lib/types';
import { HttpMethod, IHttpOperation, IHttpRequest, IServer } from '@stoplight/types';
import { CancelTokenSource } from 'axios';
import { HeaderParam, IParam, ParamType, PathParam, QueryParam, XHRResponseType } from './types';
export interface IRequestMakerProps {
    request?: IHttpRequest;
    operation?: IHttpOperation;
}
export declare class RequestMaker {
    cancelToken?: CancelTokenSource;
    isSending: boolean;
    request: RequestStore;
    response: ResponseStore;
    constructor(options?: IRequestMakerProps);
    setOperationData: (operation?: IHttpOperation | undefined) => void;
    setRequestData: (request?: IHttpRequest<any> | undefined) => void;
    send: () => import("mobx/lib/internal").CancellablePromise<void>;
}
declare class RequestStore {
    _serverUrl: string;
    _path: string;
    _method: HttpMethod;
    _body: string;
    _headerParams: HeaderParam[];
    _queryParams: QueryParam[];
    _pathParams: PathParam[];
    _servers: IServer[];
    _timeout: number;
    readonly enabledValidHeaders: IParam[];
    readonly enabledValidQueryParams: IParam[];
    readonly nameValueHeaders: {};
    readonly nameValueQueryParams: {};
    readonly request: IHttpRequest;
    serverUrl: string;
    path: string;
    method: HttpMethod;
    body: string;
    headerParams: HeaderParam[];
    queryParams: QueryParam[];
    readonly queryParamsDictionary: {};
    pathParams: PathParam[];
    readonly pathParamsDictionary: {};
    servers: IServer[];
    timeout: number;
    readonly uriExpanded: string;
    uri: string;
    readonly prismRequest: {
        url: {
            baseUrl: string;
            path: string;
            query: {};
        };
        method: HttpMethod;
        body: string;
        headers: {};
    };
    setParam<T extends keyof IParam>(type: ParamType, indexOrName: string | number, prop: T, value: IParam[T]): void;
    addParam(type: ParamType, key?: string, value?: string, isEnabled?: boolean): void;
    removeParam(type: ParamType, indexOrName: string | number): void;
    fixParams(type: ParamType, val: boolean): void;
}
declare class ResponseStore {
    _body: any;
    _statusCode: number;
    _headers: IHttpNameValue;
    _error: string;
    _responseType: XHRResponseType;
    body: any;
    responseType: XHRResponseType;
    statusCode: number;
    headers: IHttpNameValue;
    error: string;
}
export {};
