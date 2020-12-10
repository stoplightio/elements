import { resolveInlineRef } from '@stoplight/json';
import { SchemaTreeRefDereferenceFn } from '@stoplight/json-schema-viewer';
import { isPlainObject } from 'lodash';
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
  const document = 'document' in props && isPlainObject(props.document) ? Object(props.document) : undefined;

  const documentBasedRefResolver = React.useCallback<SchemaTreeRefDereferenceFn>(
    ({ pointer }, _, schema) => {
      const activeSchema = document ?? schema;

      if (pointer === null) {
        return null;
      }

      if (pointer === '#') {
        return activeSchema;
      }

      const resolved = resolveInlineRef(activeSchema, pointer);
      if (isPlainObject(resolved)) {
        return resolved;
      }

      throw new ReferenceError(`Could not resolve '${pointer}`);
    },
    [document],
  );

  return (
    <InlineRefResolverContext.Provider value={'resolver' in props ? props.resolver : documentBasedRefResolver}>
      {children}
    </InlineRefResolverContext.Provider>
  );
};

export const useInlineRefResolver = () => useContext(InlineRefResolverContext);
