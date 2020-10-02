import { pointerToPath } from '@stoplight/json';
import { SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-viewer';
import { get, isObject } from 'lodash';
import * as React from 'react';
import { useContext } from 'react';

const InlineRefResolverContext = React.createContext<SchemaTreeRefDereferenceFn | undefined>(void 0);
InlineRefResolverContext.displayName = 'InlineRefResolverContext';

interface InlineRefResolverProviderTypes {
  document: unknown;
}

/**
 * Populates `InlineRefResolverContext` with a standard inline ref resolver based on `document`.
 */
export const InlineRefResolverProvider: React.FC<InlineRefResolverProviderTypes> = ({ document, children }) => {
  const inlineRefResolver = React.useCallback<SchemaTreeRefDereferenceFn>(
    ({ pointer }, _, schema) =>
      pointer === null ? null : get(isObject(document) ? document : schema, pointerToPath(pointer)),
    [document],
  );
  return <InlineRefResolverContext.Provider value={inlineRefResolver}>{children}</InlineRefResolverContext.Provider>;
};

export const useInlineRefResolver = () => useContext(InlineRefResolverContext);
