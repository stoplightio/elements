import { MDAST } from '@stoplight/markdown';
import React from 'react';
import { ParseOptions } from '../utils';
export declare const useMdast2React: (mdastRoot: MDAST.Root, opts?: ParseOptions) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
