import { hasRef } from '@stoplight/json';
import { isArray, isPlainObject } from 'lodash';

import { defaultResolver, ReferenceResolver } from './ReferenceResolver';

const originalObjectSymbol = Symbol('OriginalObject');

interface CreateResolvedObjectOptions {
  contextObject?: object;
  resolver?: ReferenceResolver;
}

export const createResolvedObject = (currentObject: object, options: CreateResolvedObjectOptions = {}): object =>
  recursivelyCreateResolvedObject(currentObject, currentObject, [], new Map(), options);

const recursivelyCreateResolvedObject = (
  currentObject: object,
  rootCurrentObject: object,
  propertyPath: string[],
  objectToProxiedObjectCache: Map<object, object>,
  options: CreateResolvedObjectOptions = {},
): object => {
  if (isResolvedObjectProxy(currentObject)) return currentObject;

  if (objectToProxiedObjectCache.has(currentObject)) return objectToProxiedObjectCache.get(currentObject)!;

  const mergedOptions = {
    contextObject: options.contextObject || currentObject,
    resolver: options.resolver || defaultResolver(options.contextObject || currentObject),
  };

  const resolvedObjectProxy = new Proxy(currentObject, {
    get(target: { [key: string | symbol]: unknown }, name) {
      if (name === originalObjectSymbol) return currentObject;

      const value = target[name];
      const newPropertyPath = [...propertyPath, name.toString()];

      let resolvedValue;
      if (isReference(value)) {
        try {
          resolvedValue = mergedOptions.resolver(
            { pointer: value.$ref, source: null },
            newPropertyPath,
            rootCurrentObject,
          );
        } catch (e) {
          resolvedValue = {
            ...value,
            $error: e instanceof Error ? e.message : String(e),
          };
        }
      } else {
        resolvedValue = value;
      }

      if (isPlainObject(resolvedValue) || isArray(resolvedValue)) {
        return recursivelyCreateResolvedObject(
          resolvedValue,
          rootCurrentObject,
          newPropertyPath,
          objectToProxiedObjectCache,
          mergedOptions,
        );
      }

      return resolvedValue;
    },
  });

  objectToProxiedObjectCache.set(currentObject, resolvedObjectProxy);

  return resolvedObjectProxy;
};

export const isResolvedObjectProxy = (someObject: object): boolean => {
  return !!(someObject as Record<symbol, unknown>)[originalObjectSymbol];
};

// Resolves $refs by accessing properties through Proxy wrappers, ensuring nested references are resolved.
export const getResolvedObject = (obj: any, cache = new WeakMap()): any => {
  if (!isPlainObject(obj) && !isArray(obj)) {
    return obj;
  }

  if (cache.has(obj)) {
    return cache.get(obj);
  }

  if (isArray(obj)) {
    const result: any[] = [];
    cache.set(obj, result);
    for (let i = 0; i < obj.length; i++) {
      result[i] = getResolvedObject(obj[i], cache);
    }
    return result;
  }

  const result: any = {};
  cache.set(obj, result);

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];

    if (isArray(value)) {
      result[key] = getResolvedObject(value, cache);
    } else if (isPlainObject(value)) {
      result[key] = getResolvedObject(value, cache);
    } else {
      result[key] = value;
    }
  }

  return result;
};

// Unwraps Proxy objects recursively, needed for oneOf/anyOf schemas with nested $refs.
const deepUnwrapObject = (obj: any, cache = new WeakMap()): any => {
  const unwrapped = (obj as Record<symbol, object>)?.[originalObjectSymbol] || obj;

  if (!isPlainObject(unwrapped)) {
    return unwrapped;
  }

  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const hasComposition =
    Object.prototype.hasOwnProperty.call(unwrapped, 'oneOf') ||
    Object.prototype.hasOwnProperty.call(unwrapped, 'anyOf') ||
    Object.prototype.hasOwnProperty.call(unwrapped, 'allOf');

  if (!hasComposition && unwrapped === obj) {
    return unwrapped;
  }

  const result: any = {};
  cache.set(obj, result);

  for (const key in unwrapped) {
    if (!Object.prototype.hasOwnProperty.call(unwrapped, key)) continue;

    const value = (unwrapped as any)[key];

    if (isArray(value)) {
      result[key] = value.map(item => (isPlainObject(item) || isArray(item) ? deepUnwrapObject(item, cache) : item));
    } else if (isPlainObject(value)) {
      result[key] = deepUnwrapObject(value, cache);
    } else {
      result[key] = value;
    }
  }

  return result;
};

export const getOriginalObject = (resolvedObject: object): object => {
  const originalObject: any = (resolvedObject as Record<symbol, object>)[originalObjectSymbol] || resolvedObject;
  if (!originalObject) {
    return resolvedObject;
  }

  const hasAllSchemaErrors = (array: any[]) => {
    return array.every(item => item['x-sl-error-message'] !== undefined);
  };

  const deepUnwrapped = deepUnwrapObject(originalObject);

  if (deepUnwrapped.anyOf) {
    if (hasAllSchemaErrors(deepUnwrapped.anyOf)) {
      return { ...deepUnwrapped, anyOf: [deepUnwrapped.anyOf] };
    }
    const filteredArray = deepUnwrapped.anyOf.filter((item: { [x: string]: any }) => !item['x-sl-error-message']);
    return { ...deepUnwrapped, anyOf: filteredArray };
  } else if (deepUnwrapped.oneOf) {
    if (hasAllSchemaErrors(deepUnwrapped.oneOf)) {
      return { ...deepUnwrapped, oneOf: [deepUnwrapped.oneOf] };
    }
    const filteredArray = deepUnwrapped.oneOf.filter((item: { [x: string]: any }) => !item['x-sl-error-message']);
    return { ...deepUnwrapped, oneOf: filteredArray };
  }

  return deepUnwrapped;
};

export const isReference = hasRef;
