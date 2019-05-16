/// <reference types="react" />
import { ThemeType } from '@stoplight/markdown/ast-types/smdast';
import { Node } from '@stoplight/markdown/ast-types/unist';
import { Omit } from '@stoplight/types';
import { ErrorBoundaryProps } from 'react-error-boundary';
export interface IMarkdownViewer extends IMarkdownViewerProps, ErrorBoundaryProps {
}
export interface IMarkdownViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError'> {
    markdown: string;
    components?: IComponentMapping;
}
export interface IComponentMapping {
    [type: string]: (props: IComponentMappingProps<any>, key: React.Key) => React.ReactNode;
}
export interface IComponentMappingProps<T extends Node> {
    node: T;
    parent: any;
    children: React.ReactNode[] | null;
}
export interface ICodeAnnotations {
    title?: string;
    lineNumbers?: boolean;
    highlightLines?: number[][];
}
export interface IBlockquoteAnnotations {
    theme?: ThemeType;
}
export interface ITabAnnotations {
    title?: string;
}
