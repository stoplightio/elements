import unified from 'unified';
import type { VFileCompatible } from 'vfile';
import { ParseOptions } from './parse';
import { MarkdownParserResult } from './types';
export declare const parseWithPointers: (input: VFileCompatible, opts?: Partial<ParseOptions>, processor?: unified.Processor<unified.Settings> | undefined) => MarkdownParserResult;
