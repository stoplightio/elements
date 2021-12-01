import type { Dictionary } from '@stoplight/types';
export declare function isStringOrNumber(value: unknown): value is number | string;
export declare function isObject(maybeObj: unknown): maybeObj is object;
export declare function isPrimitive(maybePrimitive: unknown): maybePrimitive is string | number | boolean | undefined | null | symbol | bigint;
export declare function isObjectLiteral(maybeObj: unknown): maybeObj is Dictionary<unknown>;
export declare function isNonNullable<T = unknown>(maybeNullable: T): maybeNullable is NonNullable<T>;
