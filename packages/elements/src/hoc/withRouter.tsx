import * as React from 'react';
import { Route } from 'react-router-dom';

import { useRouter } from '../hooks/useRouter';
import { RoutingProps } from '../types';
import { getDisplayName } from './utils';

export function withRouter<T>(
  WrappedComponent: React.ComponentType<T & RoutingProps>,
): React.ComponentType<T & RoutingProps> {
  const WithRouter = (props: T & RoutingProps) => {
    const { Router, routerProps } = useRouter(props.router ?? 'history', props.basePath ?? '/');
    return (
      <Router {...routerProps}>
        <Route path="/">
          <WrappedComponent {...props} />
        </Route>
      </Router>
    );
  };

  WithRouter.displayName = `WithRouter(${getDisplayName(WrappedComponent)})`;

  return WithRouter;
}
