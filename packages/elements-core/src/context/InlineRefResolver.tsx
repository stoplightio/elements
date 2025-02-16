import { convertToJsonSchema } from '@stoplight/http-spec/oas';
import { isPlainObject } from '@stoplight/json';
import type { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { useContext } from 'react';

import { defaultResolver, ReferenceResolver } from '../utils/ref-resolving/ReferenceResolver';
import { createResolvedObject } from '../utils/ref-resolving/resolvedObject';

const translatedObjectSymbol = Symbol('TranslatedObject');

type InlineRefResolverContext = {
  resolver: ReferenceResolver | undefined;
  maxRefDepth: number | undefined;
};

const InlineRefResolverContext = React.createContext<InlineRefResolverContext | undefined>(undefined);
InlineRefResolverContext.displayName = 'InlineRefResolverContext';

const DocumentContext = React.createContext<object | undefined>(undefined);
DocumentContext.displayName = 'DocumentContext';

type InlineRefResolverProviderProps = {
  document?: unknown;
  resolver?: ReferenceResolver;
  maxRefDepth?: number;
};

/**
 * Populates `InlineRefResolverContext` with either a standard inline ref resolver based on `document`, or a custom resolver function provided by the caller.
 */
export const InlineRefResolverProvider: React.FC<InlineRefResolverProviderProps> = ({
  children,
  document: maybeDocument,
  resolver,
  maxRefDepth,
}) => {
  const document = isPlainObject(maybeDocument) ? maybeDocument : undefined;

  const computedResolver = React.useMemo(
    () => resolver || (document !== undefined ? defaultResolver(document) : undefined),
    [document, resolver],
  );

  return (
    <InlineRefResolverContext.Provider value={{ resolver: computedResolver, maxRefDepth }}>
      <DocumentContext.Provider value={document}>{children}</DocumentContext.Provider>
    </InlineRefResolverContext.Provider>
  );
};

export const useInlineRefResolver = () => useContext(InlineRefResolverContext);

export const useDocument = () => useContext(DocumentContext);

export const useResolvedObject = (currentObject: object): object => {
  const document = useDocument();
  const { resolver } = useInlineRefResolver() ?? {};

  return React.useMemo(
    () => createResolvedObject(currentObject, { contextObject: document as object, resolver }),
    [currentObject, document, resolver],
  );
};

export const useSchemaInlineRefResolver = (): [ReferenceResolver, number | undefined] => {
  const document = useDocument();
  const { resolver, maxRefDepth } = useInlineRefResolver() ?? {};

  const referenceResolver = React.useCallback<ReferenceResolver>(
    (...args) => {
      const resolved = resolver?.(...args);
      if (!isPlainObject(resolved)) {
        return resolved;
      }

      if (translatedObjectSymbol in resolved) {
        return (resolved as { [translatedObjectSymbol]: unknown })[translatedObjectSymbol];
      }

      const converted = convertToJsonSchema((document ?? {}) as Dictionary<unknown>, resolved);
      Reflect.defineProperty(resolved, translatedObjectSymbol, {
        configurable: true,
        value: converted,
      });

      delete converted.$schema;
      return converted;
    },
    [document, resolver],
  );

  return [referenceResolver, maxRefDepth];
};
