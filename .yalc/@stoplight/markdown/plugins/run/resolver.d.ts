import { Dictionary } from '@stoplight/types';
import * as unified from 'unified';
import { MDAST } from '../../ast-types';
export declare type Resolver = (node: MDAST.Code, data: Dictionary<unknown>) => Promise<object>;
export declare const resolveCodeBlocks: unified.Attacher<[{
    resolver?: Resolver;
}]>;
