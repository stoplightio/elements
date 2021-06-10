import { isArray, isPlainObject } from 'lodash';

import { defaultResolver, ReferenceResolver } from './ReferenceResolver';

const originalObjectSymbol = Symbol('OriginalObject');

interface CreateResolvedObjectOptions {
  contextObject?: object;
  resolver?: ReferenceResolver;
}

export const createResolvedObject = (currentObject: object, options: CreateResolvedObjectOptions = {}): object =>
  recursivelyCreateResolvedObject(currentObject, currentObject, [], options);

const recursivelyCreateResolvedObject = (
  currentObject: object,
  rootCurrentObject: object,
  propertyPath: string[],
  options: CreateResolvedObjectOptions = {},
): object => {
  const mergedOptions = {
    contextObject: options.contextObject || currentObject,
    resolver: options.resolver || defaultResolver(options.contextObject || currentObject),
  };
  if (!currentObject || isResolvedObjectProxy(currentObject)) return currentObject;

  const cachedValues = {};

  return new Proxy(currentObject, {
    get(target, name) {
      if (name === originalObjectSymbol) return currentObject;

      if (cachedValues[name]) return cachedValues[name];

      const value = target[name];

      const newPropertyPath = [...propertyPath, name.toString()];

      let resolvedValue;
      if (isPlainObject(value) && value.hasOwnProperty('$ref') && typeof value['$ref'] === 'string') {
        try {
          resolvedValue = mergedOptions.resolver(
            { pointer: value['$ref'], source: null },
            newPropertyPath,
            rootCurrentObject,
          );
        } catch (e) {
          resolvedValue = {
            ...value,
            $error: e.message,
          };
        }
      } else {
        resolvedValue = value;
      }

      const result =
        isPlainObject(resolvedValue) || isArray(resolvedValue)
          ? recursivelyCreateResolvedObject(resolvedValue, rootCurrentObject, newPropertyPath, mergedOptions)
          : resolvedValue;

      cachedValues[name] = result;
      return result;
    },
  });
};

export const isResolvedObjectProxy = (someObject: object): boolean => {
  return !!someObject[originalObjectSymbol];
};

export const getOriginalObject = (resolvedObject: object): object => {
  return resolvedObject[originalObjectSymbol] || resolvedObject;
};
