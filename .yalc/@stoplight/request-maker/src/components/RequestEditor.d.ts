import * as React from 'react';
export declare enum RequestEditorTab {
    AUTHORIZATION = "authorization",
    HEADERS = "headers",
    BODY = "body",
    QUERY = "query",
    PATH = "path",
    UNDEFINED = "undefined"
}
export declare type RequestEditorProps = {
    tabs?: RequestEditorTab[];
    className?: string;
    ctBtn?: boolean;
};
export declare const RequestEditor: React.FunctionComponent<RequestEditorProps>;
