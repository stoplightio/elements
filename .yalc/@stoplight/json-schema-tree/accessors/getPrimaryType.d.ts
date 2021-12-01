import { SchemaNodeKind } from '../nodes/types';
import type { SchemaFragment } from '../types';
export declare function getPrimaryType(fragment: SchemaFragment, types: SchemaNodeKind[] | null): SchemaNodeKind | null;
