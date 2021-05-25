import { CustomComponentMapping, DefaultSMDComponents } from '@stoplight/markdown-viewer';
import { HttpParamStyles, IHttpOperation, IHttpRequest } from '@stoplight/types';
import { isObject } from 'lodash';
import React from 'react';
import URI from 'urijs';

import { useParsedValue } from '../../../hooks/useParsedValue';
import { isHttpOperation, isJSONSchema } from '../../../utils/guards';
import { SchemaAndDescription } from '../../SchemaAndDescription';
import { TryIt } from '../../TryIt';

type PartialHttpRequest = Pick<IHttpRequest, 'method' | 'url'> & Partial<IHttpRequest>;

function isPartialHttpRequest(maybeHttpRequest: unknown): maybeHttpRequest is PartialHttpRequest {
  return (
    isObject(maybeHttpRequest) &&
    'method' in maybeHttpRequest &&
    typeof maybeHttpRequest['method'] === 'string' &&
    'url' in maybeHttpRequest &&
    typeof maybeHttpRequest['url'] === 'string'
  );
}

export const CodeComponent: CustomComponentMapping['code'] = props => {
  const { title, children, jsonSchema, http, resolved } = props;

  const parsedValue = useParsedValue(resolved ?? (Array.isArray(children) ? children[0] : children));

  if (jsonSchema) {
    if (!isJSONSchema(parsedValue)) {
      return null;
    }

    return <SchemaAndDescription title={title} schema={parsedValue} />;
  }

  if (http) {
    if (!isObject(parsedValue) || (!isPartialHttpRequest(parsedValue) && !isHttpOperation(parsedValue))) {
      return null;
    }

    return <TryIt httpOperation={isHttpOperation(parsedValue) ? parsedValue : parseHttpRequest(parsedValue)} />;
  }

  const DefaultCode = DefaultSMDComponents.code!;

  return <DefaultCode {...props} />;
};

export function parseHttpRequest(data: PartialHttpRequest): IHttpOperation {
  const uri = URI(data.url);
  return {
    id: '?http-operation-id?',
    method: data.method,
    path: uri.is('absolute') ? uri.path() : data.url,
    servers: [{ url: uri.is('absolute') ? uri.origin() : data.baseUrl || '' }],
    request: {
      query: Object.entries(data.query || {}).map(([key, value]) => ({
        name: key,
        style: HttpParamStyles.Form,
        schema: { default: Array.isArray(value) && value.length > 0 ? value[0] : value },
      })),
      headers: Object.entries(data.headers || {}).map(([key, value]) => ({
        name: key,
        style: HttpParamStyles.Simple,
        schema: { default: value },
      })),
      ...(data.body
        ? { body: { contents: [{ mediaType: 'application/json', schema: { default: data.body } }] } }
        : null),
    },
    responses: [],
  };
}
