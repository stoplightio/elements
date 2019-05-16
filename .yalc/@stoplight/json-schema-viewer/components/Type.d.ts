import { Dictionary } from '@stoplight/types';
import { JSONSchema4TypeName } from 'json-schema';
import * as React from 'react';
import { JSONSchema4CombinerName } from '../types';
export interface IType {
    type: JSONSchema4TypeName | JSONSchema4CombinerName | 'binary' | '$ref';
    className?: string;
    subtype?: JSONSchema4TypeName | JSONSchema4TypeName[];
    children?: React.ReactNode;
}
export declare const Type: React.FunctionComponent<IType>;
export declare const PropertyTypeColors: Dictionary<string, IType['type']>;
