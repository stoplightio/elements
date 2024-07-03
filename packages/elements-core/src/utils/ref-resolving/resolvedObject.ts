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

export const getOriginalObject = (resolvedObject: object): object => {
  return (resolvedObject as Record<symbol, object>)[originalObjectSymbol] || resolvedObject;
};

export const isReference = hasRef;
