import * as React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';

import { useRouter } from '../hooks/useRouter';
import { IStoplightProjectComponent } from '../types';
import { Docs } from './Docs';
import { Provider } from './Provider';
import { TableOfContents } from './TableOfContents';

export const StoplightProject: React.FC<IStoplightProjectComponent> = ({
  workspace,
  project,
  branch,
  basePath = '/',
  router = 'history',
}) => {
  const regExp = /^(https?:\/\/)?([^.]+)\./g;
  const match = regExp.exec(workspace);
  const workspaceName = match?.length === 3 ? match[2] : '';

  const { Router, routerProps } = useRouter(router, basePath);

  return (
    <Provider
      host={workspace}
      workspace={workspaceName}
      project={project}
      branch={branch}
      components={{
        link: ({ node, children }) => {
          let nodeDestinationUri = node.url;
          return <Link to={nodeDestinationUri}>{children}</Link>;
        },
      }}
    >
      <div className="flex flex-row">
        <Router {...routerProps}>
          <TableOfContents />
          <div className="flex-grow p-5">
            <Switch>
              <Route path="/">
                <DocsRoute />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
};

const DocsRoute: React.FC = () => {
  const { pathname } = useLocation();
  console.log({ pathname });
  return <Docs node={pathname} />;
};
