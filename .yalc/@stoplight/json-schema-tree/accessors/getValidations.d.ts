import type { Dictionary } from '@stoplight/types';
import type { SchemaNodeKind } from '../nodes/types';
import type { SchemaFragment } from '../types';
export declare const COMMON_VALIDATION_TYPES: string[];
export declare function getValidations(fragment: SchemaFragment, types: SchemaNodeKind[] | null): Dictionary<unknown>;
