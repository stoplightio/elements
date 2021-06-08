import { resolveInlineRef } from '@stoplight/json';
import { isArray, isPlainObject } from 'lodash';

export const createResolvedObject = (currentObject: object, originalObject: object = currentObject): object => {
  if (!isPlainObject(currentObject) && !isArray(currentObject)) {
    return currentObject;
  }

  const cachedValues = {};

  return new Proxy(currentObject, {
    get(target, name) {
      if (cachedValues[name]) return cachedValues[name];

      const value = target[name];

      if (isPlainObject(value) && value.hasOwnProperty('$ref')) {
        const resolvedValue = resolveInlineRef(originalObject as any, value['$ref']);
        const result = createResolvedObject(resolvedValue as object, originalObject);
        cachedValues[name] = result;
        return result;
      }

      const result = createResolvedObject(value, originalObject);
      cachedValues[name] = result;
      return result;
    },
  });
};
