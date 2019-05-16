import { JSONSchema4 } from 'json-schema';
import { SchemaNode } from '../types';
export declare function walk(schema: JSONSchema4[] | JSONSchema4): IterableIterator<SchemaNode>;
