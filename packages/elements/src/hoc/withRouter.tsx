import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useRouter } from '../hooks/useRouter';
import { IRouter } from '../types';

export function withRouter<T>(WrappedComponent: React.FunctionComponent<T & IRouter>): React.FunctionComponent<T> {
  const WithRouter = (props: T & IRouter) => {
    const { Router, routerProps } = useRouter(props.router ?? 'history', props.basePath ?? '/');
    return (
      <Router {...routerProps}>
        <Switch>
          <Route path="/">
            <WrappedComponent {...props} />
          </Route>
        </Switch>
      </Router>
    );
  };

  return WithRouter;
}
