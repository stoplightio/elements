import { resolveInlineRef } from '@stoplight/json';
import { Dictionary } from '@stoplight/types';

export type ReferenceInfo = {
  source: string | null;
  pointer: string | null;
};

export type ReferenceResolver = (ref: ReferenceInfo, propertyPath: string[] | null, currentObject: object) => any;

export const defaultResolver =
  (contextObject: object): ReferenceResolver =>
  ({ pointer }, _, currentObject) => {
    const activeObject = contextObject ?? currentObject;

    if (pointer === null) {
      return null;
    }

    if (pointer === '#') {
      return activeObject;
    }

    const resolved = resolveInlineRef(activeObject as Dictionary<string>, pointer);

    if (resolved) return resolved;

    throw new ReferenceError(`Could not resolve '${pointer}`);
  };
