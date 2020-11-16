import * as React from 'react';
import type { ObservableSet } from './ObservableSet';
interface IBlockProps {
    value: string;
    language: string | undefined;
    showLineNumbers: boolean;
    lineNumber: number;
    observer: IntersectionObserver | undefined;
    viewport: ObservableSet;
}
export declare const SingleCodeBlock: React.FC<IBlockProps>;
export {};
