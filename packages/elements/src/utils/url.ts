import { Dictionary } from '@stoplight/types';
import { differenceBy, filter, map, omit } from 'lodash';
import URI from 'urijs';

import { IParam, PathParam, QueryParam } from '../stores/request-maker/types';
import { getNameValuePairs } from './params';

export function addParamsToPath(path: string, params: PathParam[]) {
  let newPath = path;

  const pathParamsFromPath = parsePathParams(path);
  const pathParamsWithName = filter(params, param => param.name !== '');

  const isRemoved = pathParamsWithName.length < pathParamsFromPath.length;
  if (isRemoved) {
    const diff = differenceBy(
      pathParamsFromPath,
      map(params, p => p.name),
    );
    diff.forEach(d => {
      newPath = newPath.replace(`/{${d}}`, '');
    });
  } else {
    pathParamsWithName.forEach((p, i) => {
      if (pathParamsFromPath[i]) {
        newPath = newPath.replace(`{${pathParamsFromPath[i]}}`, `{${p.name}}`);
      } else {
        newPath = `${newPath}/{${p.name}}`;
      }
    });
  }
  return newPath;
}

export function getParamsFromPath(path: string, params: PathParam[]) {
  const pathParamsFromPath = parsePathParams(path);
  let pathParamsWithName = filter(params, param => param.name !== '');

  const isRemoved = pathParamsFromPath.length < pathParamsWithName.length;
  if (isRemoved) {
    const diff = differenceBy(
      pathParamsWithName.map(p => p.name),
      pathParamsFromPath,
    );
    pathParamsWithName = pathParamsWithName.filter(p => !diff.includes(p.name));
  }

  const newParams = pathParamsFromPath.map(
    (p, i) =>
      ({
        ...pathParamsWithName[i],
        name: p,
        ...(i > pathParamsWithName.length - 1 && {
          isEnabled: true,
          value: '',
        }),
      } as IParam),
  );
  return newParams;
}

function parsePathParams(path: string = '') {
  const pathParams = path.match(/{[^{}]+}/g);
  if (pathParams && pathParams.length) {
    return pathParams.map(p => p.slice(1, -1));
  } else {
    return [];
  }
}

function uriExpand(uri: string, data: Dictionary<string, string>) {
  if (!data) {
    return uri;
  }
  return uri.replace(/{([^#?]+?)}/g, (m, value) => {
    return data[value] || value;
  });
}

export function replaceParamsInPath(path: string, pathParams: PathParam[]) {
  let uri = path;

  try {
    uri = uriExpand(path, getNameValuePairs(pathParams, { enabled: true }));
  } catch (err) {
    // noop
  }

  return uri;
}

export function extractQueryParams(query: string, queryParams: readonly QueryParam[]) {
  const newParams: QueryParam[] = [];

  // Parse query params
  const queryParsed = URI.parseQuery(query || '');

  // Preserve the disabled query params
  const disabledQueryParams = map(queryParams, (p, i) => ({
    ...p,
    index: i,
  })).filter(q => !q.isEnabled);

  // Add the enabled query params
  for (const key of Object.keys(queryParsed)) {
    const existingQueryParam = queryParams.find(q => q.name === key);
    if (existingQueryParam) {
      newParams.push({
        ...existingQueryParam,
        value: queryParsed[key],
        isEnabled: true,
      });
    } else {
      newParams.push({
        name: key,
        value: queryParsed[key],
        isEnabled: true,
      });
    }
  }

  // Add the disabled query params
  for (const disabledQueryParam of disabledQueryParams) {
    if (!newParams.find(p => p.name === disabledQueryParam.name)) {
      newParams.splice(disabledQueryParam.index, 0, omit(disabledQueryParam, 'index'));
    }
  }

  // Add empty query param
  if (query.endsWith('?') || query.endsWith('&')) {
    newParams.push({
      name: '',
      value: '',
      isEnabled: true,
    });
  }

  return newParams;
}

export function getLocalAnchorPath(id: string) {
  const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

  // indicates we're using HashRouter
  if (currentHash.startsWith('#/')) {
    // just grab the "path", make sure not to include a hash if there is already one on the current url
    const routePath = currentHash.split('#')[1];
    return `#${routePath}#${id}`;
  }

  return `#${id}`;
}

export function getLocationHash() {
  const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

  // indicates we're using HashRouter
  if (currentHash.startsWith('#/')) {
    const routeParts = currentHash.split('#');

    // In this case, only have a location hash if there is a 2nd segment e.g. #/page/path#hash
    if (routeParts[2]) {
      return currentHash.slice(1);
    }

    return '';
  }

  return currentHash.slice(1);
}

export const scrollToAnchor = (hash: string) => {
  if (hash && typeof document !== undefined) {
    window.requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView(true));
  }
};
