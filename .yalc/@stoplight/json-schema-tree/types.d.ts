import type { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
export declare type ViewMode = 'read' | 'write' | 'standalone';
export declare type SchemaFragment = Record<string, unknown> | JSONSchema4 | JSONSchema6 | JSONSchema7;
