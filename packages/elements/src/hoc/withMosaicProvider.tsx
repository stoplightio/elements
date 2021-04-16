import { Provider as MosaicProvider } from '@stoplight/mosaic';
import React from 'react';

import { getDisplayName } from './utils';

export function withMosaicProvider<P>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const WithMosaicProvider = (props: P) => {
    return (
      <MosaicProvider style={{ height: '100%' }}>
        <WrappedComponent {...props} />
      </MosaicProvider>
    );
  };

  WithMosaicProvider.displayName = `WithMosaicProvider(${getDisplayName(WrappedComponent)})`;

  return WithMosaicProvider;
}
