import 'prismjs/components/prism-json';
import * as React from 'react';
export declare enum ResponseTab {
    STATUS = "status",
    FORMATTED = "formatted",
    RAW = "raw",
    HEADERS = "headers"
}
export declare type ResponseProps = {
    tabs?: ResponseTab[];
    expandedDepth?: number;
    expanded?: boolean;
};
export declare const ResponseViewer: React.FunctionComponent<ResponseProps>;
