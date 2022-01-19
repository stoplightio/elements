import { MDAST } from '@stoplight/markdown';
import { ParseOptions } from '../utils';
export declare const useMarkdown2Mdast: (markdownOrTree: string | MDAST.Root, opts?: ParseOptions) => MDAST.Root;
