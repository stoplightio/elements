import { isArray, isPlainObject } from 'lodash';

import { defaultResolver, ReferenceResolver } from './ReferenceResolver';

const originalObjectSymbol = Symbol('OriginalObject');

interface CreateResolvedObjectOptions {
  contextObject?: object;
  resolver?: ReferenceResolver;
}

type ObjectWithRef = { $ref: string };

type RefToRoot = { $ref: '#' };

type ErrorObject = {
  $ref: string;
  $error: string;
};

type TryResolveRef1<TContext extends {}, Key extends string> = TContext extends { [key in Key]: infer SubProp }
  ? SubProp
  : ErrorObject;
type TryResolveRef2<TContext extends {}, Key1 extends string, Key2 extends string> = TContext extends {
  [key in Key1]: { [key in Key2]: infer SubProp };
}
  ? ResolvedObject<SubProp, TContext>
  : ErrorObject;
type TryResolveRef3<TContext extends {}, Key1 extends string, Key2 extends string, Key3 extends string> =
  TContext extends {
    [key in Key1]: { [key in Key2]: { [key in Key3]: infer SubProp } };
  }
    ? ResolvedObject<SubProp, TContext>
    : ErrorObject;

type ResolvedProperty<TOriginal, TContext extends {}> = TOriginal extends RefToRoot
  ? ResolvedObject<TContext>
  : TOriginal extends { $ref: `#/${infer Key1}/${infer Key2}/${infer Key3}` }
  ? TryResolveRef3<TContext, Key1, Key2, Key3>
  : TOriginal extends { $ref: `#/${infer Key1}/${infer Key2}` }
  ? TryResolveRef2<TContext, Key1, Key2>
  : TOriginal extends { $ref: `#/${infer Key}` }
  ? TryResolveRef1<TContext, Key>
  : TOriginal;

type ResolvedObject<TOriginal extends {}, TContext extends {} = TOriginal> = TOriginal extends ObjectWithRef
  ? ErrorObject
  : {
      [key in keyof TOriginal]: ResolvedProperty<TOriginal[key], TContext>;
    };

export const createResolvedObject = <T extends {}>(
  currentObject: T,
  options: CreateResolvedObjectOptions = {},
): ResolvedObject<T> => recursivelyCreateResolvedObject(currentObject, currentObject, [], new Map(), options) as any;

const recursivelyCreateResolvedObject = (
  currentObject: object,
  rootCurrentObject: object,
  propertyPath: string[],
  objectToProxiedObjectCache: Map<object, object>,
  options: CreateResolvedObjectOptions = {},
): object => {
  const mergedOptions = {
    contextObject: options.contextObject || currentObject,
    resolver: options.resolver || defaultResolver(options.contextObject || currentObject),
  };
  if (!currentObject || isResolvedObjectProxy(currentObject)) return currentObject;

  if (objectToProxiedObjectCache.has(currentObject)) return objectToProxiedObjectCache.get(currentObject)!;

  const resolvedObjectProxy = new Proxy(currentObject, {
    get(target, name) {
      if (name === originalObjectSymbol) return currentObject;

      const value = target[name];
      const newPropertyPath = [...propertyPath, name.toString()];

      let resolvedValue;
      if (isReference(value)) {
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
  return !!someObject[originalObjectSymbol];
};

export const getOriginalObject = (resolvedObject: object): object => {
  return resolvedObject[originalObjectSymbol] || resolvedObject;
};

const isReference = (value: unknown): boolean => {
  return (
    isPlainObject(value) && (value as object).hasOwnProperty('$ref') && typeof (value as object)['$ref'] === 'string'
  );
};
