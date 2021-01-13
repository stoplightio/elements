import { Provider as JotaiProvider } from 'jotai';
import * as React from 'react';

import { getDisplayName } from '../hoc/utils';

/**
 * Provides a context for storing jotai atom values.
 */
export const PersistenceContextProvider: React.FC = JotaiProvider;

/**
 * HOC that Wraps `WrappedComponent` in a `PersistenceContextProvider`.
 */
export function withPersistenceBoundary<T>(WrappedComponent: React.ComponentType<T>) {
  const WithPersistenceBoundary: React.FC<T> = props => {
    return (
      <PersistenceContextProvider>
        <WrappedComponent {...props} />
      </PersistenceContextProvider>
    );
  };
  WithPersistenceBoundary.displayName = `withPersistenceBoundary(${getDisplayName(WrappedComponent)})`;
  return WithPersistenceBoundary;
}
