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

export function extractQueryParams(query: string, queryParams: QueryParam[]) {
  const newParams: QueryParam[] = [];

  // Parse query params
  const queryParsed = URI.parseQuery(query || '');

  // Preserve the disabled query params
  const disabledQueryParams = map(queryParams, (p, i) => ({
    ...p,
    index: i,
  })).filter(q => !q.isEnabled);

  // Add the enabled query params
  for (const key in queryParsed) {
    if (!Object.hasOwnProperty.call(queryParsed, key)) continue;

    const queryParam = queryParams.find(q => q.name === key);
    if (queryParam) {
      newParams.push({
        ...queryParam,
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

  return newParams;
}
