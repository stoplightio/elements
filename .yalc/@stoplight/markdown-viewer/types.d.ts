import type { MDAST } from '@stoplight/markdown';
import { ErrorBoundaryProps } from '@stoplight/react-error-boundary';
import React, { ImgHTMLAttributes } from 'react';
import { ParseOptions } from './utils';
export interface IMarkdownViewer extends IMarkdownViewerProps, ErrorBoundaryProps {
}
export interface IMarkdownViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError'> {
    markdown: string | MDAST.Root;
    className?: string;
    parseOptions?: ParseOptions;
}
export declare type DefaultComponentMapping = {
    blockquote: React.FunctionComponent<MDAST.Blockquote['annotations']>;
    code: React.FunctionComponent<Pick<MDAST.Code, 'lang' | 'resolved'> & MDAST.Code['annotations']>;
    img: React.FunctionComponent<ImgHTMLAttributes<unknown> & MDAST.Image['annotations']>;
    tabs: React.FunctionComponent<any>;
    tab: React.FunctionComponent<any>;
    codegroup: React.FunctionComponent<any>;
};
export declare type CustomComponentMapping<M extends CustomComponents = Partial<DefaultComponentMapping>> = Partial<ReactComponents<keyof M>> & M;
declare type ReactComponents<O extends string | number | symbol = ''> = {
    [V in keyof Omit<JSX.IntrinsicElements, O>]: React.FunctionComponent<JSX.IntrinsicElements[V]>;
};
export declare type CustomComponents = {
    [key: string]: React.FunctionComponent;
};
export {};
