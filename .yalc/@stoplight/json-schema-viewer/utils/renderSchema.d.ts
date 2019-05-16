import { JSONSchema4 } from 'json-schema';
import { ITreeNodeMeta, SchemaTreeListNode } from '../types';
declare type Walker = (schema: JSONSchema4, dereferencedSchema: JSONSchema4 | undefined, level?: number, meta?: ITreeNodeMeta) => IterableIterator<SchemaTreeListNode>;
export declare const renderSchema: Walker;
export {};
