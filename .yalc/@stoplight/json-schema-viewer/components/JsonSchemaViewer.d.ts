import { TreeStore } from '@stoplight/tree-list';
import * as React from 'react';
import { ErrorBoundaryProps } from 'react-error-boundary';
import { JSONSchema4 } from 'json-schema';
export interface IJsonSchemaViewer extends ErrorBoundaryProps {
    schema: JSONSchema4;
    dereferencedSchema?: JSONSchema4;
    style?: object;
    emptyText?: string;
    defaultExpandedDepth?: number;
    expanded?: boolean;
    className?: string;
    name?: string;
    hideTopBar?: boolean;
    maxRows?: number;
}
export declare class JsonSchemaViewerComponent extends React.PureComponent<IJsonSchemaViewer> {
    protected treeStore: TreeStore;
    constructor(props: IJsonSchemaViewer);
    protected readonly expandedDepth: number;
    componentDidUpdate(prevProps: Readonly<IJsonSchemaViewer>): void;
    render(): JSX.Element;
}
export declare const JsonSchemaViewer: React.FunctionComponent<IJsonSchemaViewer>;
