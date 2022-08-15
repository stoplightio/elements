import { RegularNode } from '@stoplight/json-schema-tree';
declare type PrintNameOptions = {
    shouldUseRefNameFallback?: boolean;
};
export declare function printName(schemaNode: RegularNode, { shouldUseRefNameFallback }?: PrintNameOptions): string | undefined;
export {};
