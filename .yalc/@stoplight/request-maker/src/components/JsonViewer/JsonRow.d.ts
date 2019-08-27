import { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { JsonTreeListNode } from '../../types';
export interface IRowProps {
    node: JsonTreeListNode;
    isExpanded: boolean;
}
export declare const JsonRow: React.FunctionComponent<IRowProps>;
export declare const PropertyTypeColors: Dictionary<string, string>;
