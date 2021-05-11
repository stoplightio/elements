import { resolveInlineRef } from '@stoplight/json';
import { JSONSchema7 } from 'json-schema';
import { isPlainObject } from 'lodash';
import * as React from 'react';
import { useContext } from 'react';

import { JSONSchema } from '../types';

export type SchemaTreeRefInfo = {
  source: string | null;
  pointer: string | null;
};

export type SchemaTreeRefDereferenceFn = (
  ref: SchemaTreeRefInfo,
  propertyPath: string[] | null,
  schema: JSONSchema,
) => JSONSchema7;

const InlineRefResolverContext = React.createContext<SchemaTreeRefDereferenceFn | undefined>(undefined);
InlineRefResolverContext.displayName = 'InlineRefResolverContext';

export const DocumentContext = React.createContext<unknown>(undefined);

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
      <DocumentContext.Provider value={document}>{children}</DocumentContext.Provider>
    </InlineRefResolverContext.Provider>
  );
};

export const useInlineRefResolver = () => useContext(InlineRefResolverContext);

export const useDocument = () => useContext(DocumentContext);
