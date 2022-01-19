/// <reference types="react" />
import { useToc } from '../hooks/useToc';
export declare const MarkdownToc: ({ toc, container, }: {
    toc: ReturnType<typeof useToc>;
    container: HTMLDivElement | null;
}) => JSX.Element | null;
