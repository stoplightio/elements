import { MDAST } from '@stoplight/markdown';
export declare const useToc: (mdastRoot: MDAST.Root, { enabled, maxDepth }: {
    enabled: boolean;
    maxDepth: number;
}) => {
    title: string;
    id: string;
    depth: 1 | 2 | 3 | 4 | 5 | 6;
}[];
