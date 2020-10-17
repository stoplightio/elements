import { pointerToPath } from '@stoplight/json';
import { SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-viewer';
import { get, isObject } from 'lodash';
import * as React from 'react';
import { useContext } from 'react';

const InlineRefResolverContext = React.createContext<SchemaTreeRefDereferenceFn | undefined>(void 0);
InlineRefResolverContext.displayName = 'InlineRefResolverContext';

type InlineRefResolverProviderProps =
  | {
      document: unknown;
    }
  | {
      resolver: SchemaTreeRefDereferenceFn;
    };

/**
 * Populates `InlineRefResolverContext` with either a standard inline ref resolver based on `document`, or a custom resolver function provided by the caller.
 */
export const InlineRefResolverProvider: React.FC<InlineRefResolverProviderProps> = ({ children, ...props }) => {
  const document = 'document' in props ? props.document : undefined;

  const documentBasedRefResolver = React.useCallback<SchemaTreeRefDereferenceFn>(
    ({ pointer }, _, schema) =>
      pointer === null ? null : get(isObject(document) ? document : schema, pointerToPath(pointer)),
    [document],
  );

  return (
    <InlineRefResolverContext.Provider value={'resolver' in props ? props.resolver : documentBasedRefResolver}>
      {children}
    </InlineRefResolverContext.Provider>
  );
};

export const useInlineRefResolver = () => useContext(InlineRefResolverContext);
