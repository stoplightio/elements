import * as React from 'react';

export function getDisplayName<T>(WrappedComponent: React.ComponentType<React.PropsWithChildren<T>>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
