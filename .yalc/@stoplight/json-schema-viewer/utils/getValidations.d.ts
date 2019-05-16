import { Dictionary } from '@stoplight/types';
import { JSONSchema4 } from 'json-schema';
export declare const COMMON_VALIDATION_TYPES: string[];
export declare const getValidations: (node: JSONSchema4) => Dictionary<unknown, string>;
