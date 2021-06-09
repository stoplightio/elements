import { isArray, isPlainObject } from 'lodash';

import { defaultResolver, ReferenceResolver } from './ReferenceResolver';

const resolvedObjectSymbol = Symbol('ResolvedObject');
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

  if (!currentObject || currentObject[resolvedObjectSymbol]) return currentObject;

  if (!isPlainObject(currentObject) && !isArray(currentObject)) {
    return currentObject;
  }

  const cachedValues = {};

  return new Proxy(currentObject, {
    get(target, name) {
      if (name === resolvedObjectSymbol) return true;

      if (name === originalObjectSymbol) return currentObject;

      if (cachedValues[name]) return cachedValues[name];

      const value = target[name];

      const newPropertyPath = [...propertyPath, name.toString()];

      if (isPlainObject(value) && value.hasOwnProperty('$ref')) {
        let resolvedValue;
        try {
          resolvedValue = mergedOptions.resolver(
            { pointer: value['$ref'], source: null },
            newPropertyPath,
            rootCurrentObject,
          );
        } catch (e) {
          resolvedValue = {
            ...value,
            error: e.message,
          };
        }
        const result = recursivelyCreateResolvedObject(
          resolvedValue as object,
          rootCurrentObject,
          newPropertyPath,
          mergedOptions,
        );
        cachedValues[name] = result;
        return result;
      }

      const result = recursivelyCreateResolvedObject(value, rootCurrentObject, newPropertyPath, mergedOptions);
      cachedValues[name] = result;
      return result;
    },
  });
};

export const getOriginalObject = (resolvedObject: object): object => {
  return resolvedObject[originalObjectSymbol] || resolvedObject;
};
