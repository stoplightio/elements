import { RemarkParseOptions } from 'remark-parse';
import unified from 'unified';
import type { VFileCompatible } from 'vfile';
import { MDAST } from './ast-types';
import { Resolver } from './plugins/run';
export declare type ParseSettings = RemarkParseOptions;
export declare type ParseOptions = {
    remarkPlugins?: unified.PluggableList<unified.Settings>;
    settings?: ParseSettings;
};
export declare type AsyncParseOptions = {
    remarkPlugins?: unified.PluggableList<unified.Settings>;
    settings?: ParseSettings & {
        resolver?: Resolver;
    };
};
export declare const remarkParsePreset: unified.Preset<ParseSettings>;
export declare const parse: (input: VFileCompatible, opts?: Partial<ParseOptions>, processor?: unified.Processor) => MDAST.Root;
export declare const parseAsync: (input: VFileCompatible, opts?: Partial<AsyncParseOptions>, processor?: unified.Processor) => Promise<MDAST.Root>;
