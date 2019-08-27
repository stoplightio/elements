import { IHttpOperation, IHttpRequest } from '@stoplight/types';
export declare const operation: IHttpOperation;
export declare const request: IHttpRequest;
export declare const response: {
    links: {
        self: string;
        next: string;
        last: string;
    };
    data: {
        type: string;
        id: string;
        attributes: {
            title: string;
        };
        relationships: {
            author: {
                links: {
                    self: string;
                    related: string;
                };
                data: {
                    type: string;
                    id: string;
                };
            };
            comments: {
                links: {
                    self: string;
                    related: string;
                };
                data: {
                    type: string;
                    id: string;
                }[];
            };
        };
        links: {
            self: string;
        };
    }[];
    included: ({
        type: string;
        id: string;
        attributes: {
            firstName: string;
            lastName: string;
            twitter: string;
            body?: undefined;
        };
        links: {
            self: string;
        };
        relationships?: undefined;
    } | {
        type: string;
        id: string;
        attributes: {
            body: string;
            firstName?: undefined;
            lastName?: undefined;
            twitter?: undefined;
        };
        relationships: {
            author: {
                data: {
                    type: string;
                    id: string;
                };
            };
        };
        links: {
            self: string;
        };
    })[];
};
