import { IHttpMethod, IHttpRequest as IHttpRequestPrism } from '@stoplight/prism-http';
import { IHttpOperation, IHttpRequest } from '@stoplight/types';
export declare const getOperationData: (operation: IHttpOperation) => {
    servers: import("@stoplight/types").IServer[];
    serverUrl: any;
    method: IHttpMethod;
    path: string;
    queryParams: any;
    pathParams: any;
    headerParams: any;
    body: any;
};
export declare const getRequestData: (request: IHttpRequest<string>) => {
    path: string;
    body: string;
    headerParams: {
        name: string;
        value: string;
        isEnabled: boolean;
    }[];
    queryParams: ({
        name: string;
        value: string;
        isEnabled: boolean;
    } | {
        name: string;
        value: string[];
        isEnabled: boolean;
    })[];
    method: import("@stoplight/types").HttpMethod;
} | {
    path: string;
    body: string;
    headerParams: {
        name: string;
        value: string;
        isEnabled: boolean;
    }[];
    queryParams: ({
        name: string;
        value: string;
        isEnabled: boolean;
    } | {
        name: string;
        value: string[];
        isEnabled: boolean;
    })[];
    serverUrl: string;
    method: import("@stoplight/types").HttpMethod;
};
export declare const getRequestPrismData: (request: IHttpRequest<string>) => IHttpRequestPrism;
