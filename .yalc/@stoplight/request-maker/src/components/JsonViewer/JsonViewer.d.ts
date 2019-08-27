import * as React from 'react';
export declare type JsonViewerProps = {
    node: unknown;
    expanded?: boolean;
    expandedDepth?: number;
    maxRows?: number;
    className?: string;
};
export declare const JsonViewer: React.FunctionComponent<JsonViewerProps>;
