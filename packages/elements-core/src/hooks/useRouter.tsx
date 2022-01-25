import { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { BrowserRouter, HashRouter, MemoryRouter, StaticRouter } from 'react-router-dom';

import { RouterType } from '../types';

const RouterComponent: Dictionary<React.ComponentType, RouterType> = {
  history: BrowserRouter,
  memory: MemoryRouter,
  hash: HashRouter,
  static: StaticRouter,
};

interface RouterProps {
  basename?: string;
  location?: string;
}

export const useRouter = (router: RouterType, basePath: string, staticRouterPath?: string) => {
  const Router = RouterComponent[router];
  const routerProps: RouterProps = {
    ...(router !== 'memory' && { basename: basePath }),
    ...(router === 'static' && { location: staticRouterPath }),
  };

  return {
    Router,
    routerProps,
  };
};
