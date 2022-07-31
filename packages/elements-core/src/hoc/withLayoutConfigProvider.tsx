import React from 'react';

import { LayoutConfigProvider } from '../context/LayoutConfigContext';
import { getDisplayName } from './utils';

export function withLayoutConfigProvider<P>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const WithLayoutConfigProvider = (props: P) => {
    return (
      <LayoutConfigProvider>
        <WrappedComponent {...props} />
      </LayoutConfigProvider>
    );
  };

  WithLayoutConfigProvider.displayName = `withLayoutConfigProvider(${getDisplayName(WrappedComponent)})`;

  return WithLayoutConfigProvider;
}
