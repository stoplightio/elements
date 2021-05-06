import { Dictionary } from '@stoplight/types';
import * as React from 'react';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';

type RouterType = 'history' | 'memory' | 'hash';

const RouterComponent: Dictionary<React.ComponentType, RouterType> = {
  history: BrowserRouter,
  memory: MemoryRouter,
  hash: HashRouter,
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
