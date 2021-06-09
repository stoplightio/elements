import { isPlainObject } from 'lodash';
import * as React from 'react';
import { useContext } from 'react';

import { defaultResolver, ReferenceResolver } from '../utils/ref-resolving/ReferenceResolver';
import { createResolvedObject } from '../utils/ref-resolving/resolvedObject';

const InlineRefResolverContext = React.createContext<ReferenceResolver | undefined>(undefined);
InlineRefResolverContext.displayName = 'InlineRefResolverContext';

const DocumentContext = React.createContext<unknown | undefined>(undefined);
DocumentContext.displayName = 'DocumentContext';

type InlineRefResolverProviderProps =
  | {
      document: unknown;
    }
  | {
      resolver: ReferenceResolver;
    };

/**
 * Populates `InlineRefResolverContext` with either a standard inline ref resolver based on `document`, or a custom resolver function provided by the caller.
 */
export const InlineRefResolverProvider: React.FC<InlineRefResolverProviderProps> = ({ children, ...props }) => {
  const document = 'document' in props && isPlainObject(props.document) ? Object(props.document) : undefined;

  return (
    <InlineRefResolverContext.Provider value={'resolver' in props ? props.resolver : defaultResolver(document)}>
      <DocumentContext.Provider value={document}>{children}</DocumentContext.Provider>
    </InlineRefResolverContext.Provider>
  );
};

export const useInlineRefResolver = () => useContext(InlineRefResolverContext);

export const useDocument = () => useContext(DocumentContext);

export const useResolvedObject = (currentObject: object): object => {
  const document = useDocument();
  const resolver = useInlineRefResolver();

  return createResolvedObject(currentObject, { contextObject: document as object, resolver });
};
