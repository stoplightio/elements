import { resolveInlineRef } from '@stoplight/json';

export type ReferenceInfo = {
  source: string | null;
  pointer: string | null;
};

export type ReferenceResolver = (ref: ReferenceInfo, propertyPath: string[] | null, originalObject: object) => object;

export const defaultResolver =
  (document: any): ReferenceResolver =>
  ({ pointer }, _, schema) => {
    const activeSchema = document ?? schema;

    if (pointer === null) {
      return null;
    }

    if (pointer === '#') {
      return activeSchema;
    }

    const resolved = resolveInlineRef(activeSchema, pointer);

    if (resolved) return resolved;

    throw new ReferenceError(`Could not resolve '${pointer}`);
  };
