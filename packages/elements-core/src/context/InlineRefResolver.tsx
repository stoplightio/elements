import { isPlainObject } from '@stoplight/json';
import * as React from 'react';
import { useContext } from 'react';

import { defaultResolver, ReferenceResolver } from '../utils/ref-resolving/ReferenceResolver';
import { createResolvedObject } from '../utils/ref-resolving/resolvedObject';

const InlineRefResolverContext = React.createContext<ReferenceResolver | undefined>(undefined);
InlineRefResolverContext.displayName = 'InlineRefResolverContext';

const DocumentContext = React.createContext<object | undefined>(undefined);
DocumentContext.displayName = 'DocumentContext';

type InlineRefResolverProviderProps = {
  document?: unknown;
  resolver?: ReferenceResolver;
};

/**
 * Populates `InlineRefResolverContext` with either a standard inline ref resolver based on `document`, or a custom resolver function provided by the caller.
 */
export const InlineRefResolverProvider: React.FC<InlineRefResolverProviderProps> = ({
  children,
  document: maybeDocument,
  resolver,
}) => {
  const document = isPlainObject(maybeDocument) ? maybeDocument : undefined;

  const computedResolver = React.useMemo(
    () => resolver || (document !== undefined ? defaultResolver(document) : undefined),
    [document, resolver],
  );

  return (
    <InlineRefResolverContext.Provider value={computedResolver}>
      <DocumentContext.Provider value={document}>{children}</DocumentContext.Provider>
    </InlineRefResolverContext.Provider>
  );
};

export const useInlineRefResolver = () => useContext(InlineRefResolverContext);

export const useDocument = () => useContext(DocumentContext);

export const useResolvedObject = (currentObject: object): object => {
  const document = useDocument();
  const resolver = useInlineRefResolver();

  return React.useMemo(
    () => createResolvedObject(currentObject, { contextObject: document as object, resolver }),
    [currentObject, document, resolver],
  );
};
