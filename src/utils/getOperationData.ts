import { JSONSchema } from '@stoplight/prism-http';
import { HttpMethod, IHttpOperation, IHttpParam } from '@stoplight/types';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { filter, flatten, get, has } from 'lodash';

import { RequestStore } from '../stores/request-maker/request';

const sampler = require('openapi-sampler');

export function getOperationData(operation: Partial<IHttpOperation>): Partial<RequestStore> {
  const queryParams = getParamsFromOperation(operation, 'query');
  const headerParams = getParamsFromOperation(operation, 'headers');
  let auth;

  for (const security of flatten(operation.security)) {
    const schema: JSONSchema = {
      type: 'string',
      description: security.description,
    };

    if (security.type === 'http' && security.scheme === 'bearer') {
      headerParams.push({
        name: 'authorization',
        value: 'Bearer',
        isEnabled: true,
        schema,
        required: true,
      });
    } else if (security.type === 'http' && security.scheme === 'basic') {
      auth = { username: '', password: '' };
    } else if ('in' in security) {
      const param = {
        name: security.name,
        value: '',
        isEnabled: true,
        schema,
        required: true,
      };

      if (security.in === 'query') {
        queryParams.push(param);
      } else if (security.in === 'header') {
        headerParams.push(param);
      }
    }
  }

  const body = pipe(
    getBodyFromOperation(operation),
    E.getOrElse((e) => {
      console.warn('Unable to generate request body', e);
      return '';
    }),
  );

  return {
    publicServers: operation.servers || [],
    publicBaseUrl: get(operation, 'servers[0].url', ''),
    method: (operation.method as HttpMethod) || 'get',
    templatedPath: operation.path || '',
    body,
    contentType: body ? 'raw' : 'none',
    pathParams: getParamsFromOperation(operation, 'path'),
    queryParams,
    headerParams,
    auth,
  };
}

function getParamsFromOperation(operation: Partial<IHttpOperation>, type: 'query' | 'path' | 'headers') {
  return filter(get(operation, `request.${type}`, []), (p) => get(p, 'name')).map((p: IHttpParam) => ({
    name: p.name,
    value: has(p.schema, 'default') ? String(get(p.schema, 'default')) : '',
    isEnabled: p.required || has(p.schema, 'default'),
    ...(p.required && { required: p.required }),
    ...(p.schema && { schema: p.schema }),
  }));
}

function getBodyFromOperation(operation: Partial<IHttpOperation>) {
  if (!operation?.request?.body?.contents?.[0]?.schema) {
    return E.right('');
  }
  return pipe(
    E.right(operation.request.body.contents[0].schema),
    E.chain((schema) =>
      E.tryCatch(
        () => sampler.sample(schema),
        (e) => (e instanceof Error ? e : new Error('Unknown error while generating sample request body.')),
      ),
    ),
  );
}
