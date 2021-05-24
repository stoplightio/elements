import { JsonPath } from '@stoplight/types';
import { MDAST } from './ast-types';
export declare const getJsonPathForNode: (root: MDAST.Parent, node: MDAST.Content) => JsonPath | void;
