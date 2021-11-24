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

export const useRouter = (router: RouterType, basePath: string) => {
  const Router = RouterComponent[router];
  const routerProps = {
    ...(router !== 'memory' && { basename: basePath }),
  };

  return {
    Router,
    routerProps,
  };
};
