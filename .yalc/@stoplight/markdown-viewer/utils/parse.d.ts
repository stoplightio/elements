import { MDAST, parse as markdownParse, ParseOptions as MarkdownParseOptions } from '@stoplight/markdown';
import { Handler } from 'mdast-util-to-hast';
import { ReactElement } from 'react';
import unified from 'unified';
import type { VFileCompatible } from 'vfile';
import { CustomComponents } from '../types';
export declare type ParseOptions = MarkdownParseOptions & {
    rehypePlugins?: unified.PluggableList;
    components?: CustomComponents;
};
export declare const buildSanitizationSchema: () => import("hast-util-sanitize/lib").Schema;
export declare const mdast2React: (input: MDAST.Root, opts?: Pick<ParseOptions, 'rehypePlugins' | 'settings' | 'components'>) => ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export declare const codeHandler: Handler;
export declare const parse: typeof markdownParse;
export declare const markdown2React: (input: VFileCompatible, opts?: ParseOptions) => ReactElement<any, string | import("react").JSXElementConstructor<any>>;
