import { safeParse } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import axios from 'axios';
import * as React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';

import { Docs } from '../components/Docs';
import { DocsSkeleton } from '../components/Docs/Skeleton';
import { TableOfContents } from '../components/TableOfContents';
import { useRouter } from '../hooks/useRouter';
import { IAPIComponent } from '../types';
import { computeTocTree, isOas2, isOas3, IUriMap, MODEL_REGEXP, OPERATION_REGEXP } from '../utils/oas';
import { computeOas2UriMap } from '../utils/oas/oas2';
import { computeOas3UriMap } from '../utils/oas/oas3';
import { ComponentsContext } from './Provider';

export const APIComponent: React.FC<IAPIComponent> = ({ specUrl, basePath = '/', router = 'history' }) => {
  const [document, setDocument] = React.useState();
  const [uriMap, setUriMap] = React.useState<IUriMap>({});
  const { Router, routerProps } = useRouter(router, basePath);

  React.useEffect(() => {
    axios
      .get(specUrl)
      .then(response => {
        setDocument(safeParse(response.data));
      })
      .catch(error => {
        console.error('Could not fetch spec', error);
      });
  }, [specUrl]);

  React.useEffect(() => {
    setUriMap(isOas3(document) ? computeOas3UriMap(document) : isOas2(document) ? computeOas2UriMap(document) : {});
  }, [document]);

  const tree = computeTocTree(uriMap);

  return (
    <ComponentsContext.Provider
      value={{
        link: ({ node, children }) => {
          let nodeDestinationUri = node.url;
          return <Link to={nodeDestinationUri}>{children}</Link>;
        },
      }}
    >
      <div className="flex flex-row">
        <Router {...routerProps}>
          <TableOfContents tree={tree} className="" />
          <div className="flex-grow p-5">
            <Switch>
              <Route path="/">
                <DocsRoute uriMap={uriMap} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </ComponentsContext.Provider>
  );
};

const DocsRoute: React.FC<{ uriMap: IUriMap }> = ({ uriMap }) => {
  const { pathname } = useLocation();
  const nodeType = MODEL_REGEXP.test(pathname)
    ? NodeType.Model
    : OPERATION_REGEXP.test(pathname)
    ? NodeType.HttpOperation
    : NodeType.HttpService;
  const data = uriMap[pathname] || uriMap['/'];
  if (!data) {
    return <DocsSkeleton />;
  }
  return <Docs nodeData={data} nodeType={nodeType} />;
};
