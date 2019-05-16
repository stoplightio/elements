import { JSONSchema4TypeName } from 'json-schema';
import * as React from 'react';
import { JSONSchema4CombinerName } from '../types';
interface ITypes {
    className?: string;
    type?: JSONSchema4TypeName | JSONSchema4TypeName[] | JSONSchema4CombinerName | '$ref';
    subtype?: JSONSchema4TypeName | JSONSchema4TypeName[];
}
export declare const Types: React.FunctionComponent<ITypes>;
export {};
