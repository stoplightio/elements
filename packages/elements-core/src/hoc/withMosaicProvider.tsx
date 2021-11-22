import { Provider as MosaicProvider, useMosaicContext } from '@stoplight/mosaic';
import React from 'react';

import { getDisplayName } from './utils';

export function withMosaicProvider<P>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const WithMosaicProvider = (props: P) => {
    try {
      // if already have mosaic context in tree, use it rather than creating a new provider
      const mosaicContext = useMosaicContext();
      if (mosaicContext?.providerId) {
        return <WrappedComponent {...props} />;
      }
    } catch {
      // no mosaic context yet in the tree (if `useMosaicContext` throws)
    }

    return (
      <MosaicProvider style={{ height: '100%' }}>
        <WrappedComponent {...props} />
      </MosaicProvider>
    );
  };

  WithMosaicProvider.displayName = `WithMosaicProvider(${getDisplayName(WrappedComponent)})`;

  return WithMosaicProvider;
}
