import React from 'react';
import { CustomComponents } from '../types';
export declare type MarkdownViewerProviderProps = {
    mermaidScriptUrl?: string;
    components?: CustomComponents;
};
export declare const useMarkdownViewer: () => MarkdownViewerProviderProps;
export declare const MarkdownViewerProvider: React.FC<MarkdownViewerProviderProps>;
