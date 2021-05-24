import { RemarkStringifyOptions } from 'remark-stringify';
import unified from 'unified';
import { MDAST } from './ast-types';
export declare type StringifySettings = RemarkStringifyOptions;
export declare type StringifyOptions = {
    remarkPlugins?: unified.PluggableList<unified.Settings>;
    settings?: StringifySettings;
};
export declare const stringify: (tree: MDAST.Root, opts?: Partial<StringifyOptions>, processor?: unified.Processor) => string;
