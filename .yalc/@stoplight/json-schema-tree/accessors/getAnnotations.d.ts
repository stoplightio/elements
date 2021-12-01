import type { SchemaFragment } from '../types';
declare const ANNOTATIONS: readonly ["description", "default", "examples"];
export declare type SchemaAnnotations = typeof ANNOTATIONS[number];
export declare function getAnnotations(fragment: SchemaFragment): import("@stoplight/types").Dictionary<unknown, string | number>;
export {};
