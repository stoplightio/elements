import { ICode } from '@stoplight/markdown/ast-types/smdast';
import { defaultComponentMapping, ICodeAnnotations, IComponentMappingProps } from '@stoplight/markdown-viewer';
import { HttpParamStyles, IHttpOperation, IHttpRequest } from '@stoplight/types';
import { get, isObject } from 'lodash';
import React from 'react';
import URI from 'urijs';

import { useParsedValue } from '../../../hooks/useParsedValue';
import { isHttpOperation, isHttpRequest, isJSONSchema } from '../../../utils/guards';
import { SchemaAndDescription } from '../../SchemaAndDescription';
import { TryIt } from '../../TryIt';

export const CodeComponent = (props: IComponentMappingProps<ICode<ICodeAnnotations>>) => {
  const {
    node: { annotations, value, resolved, meta },
  } = props;
  const nodeType = get(annotations, 'type') || meta;

  const parsedValue = useParsedValue(resolved ?? value);

  if (nodeType === 'json_schema') {
    if (!isJSONSchema(parsedValue)) {
      return null;
    }

    return <SchemaAndDescription title={annotations?.title} schema={parsedValue} />;
  }

  if (nodeType === 'http') {
    if (!isObject(parsedValue) || (!isHttpRequest(parsedValue) && !isHttpOperation(parsedValue))) {
      return null;
    }

    return <TryIt httpOperation={isHttpOperation(parsedValue) ? parsedValue : parseHttpRequest(parsedValue)} />;
  }

  const DefaultCode = defaultComponentMapping.code!;
  return <DefaultCode {...props} />;
};

export function parseHttpRequest(data: IHttpRequest): IHttpOperation {
  const uri = URI(data.url);
  return {
    id: '?http-operation-id?',
    method: data.method,
    path: uri.is('absolute') ? uri.path() : data.url,
    servers: [{ url: uri.is('absolute') ? uri.origin() : data.baseUrl }],
    request: {
      ...(data.query && Object.keys(data.query).length
        ? {
            query: Object.entries(data.query).map(([key, value]) => ({
              name: key,
              style: HttpParamStyles.Form,
              schema: { default: Array.isArray(value) && value.length > 0 ? value[0] : value },
            })),
          }
        : null),
      ...(data.headers && Object.keys(data.headers).length
        ? {
            headers: Object.entries(data.headers).map(([key, value]) => ({
              name: key,
              style: HttpParamStyles.Simple,
              schema: { default: value },
            })),
          }
        : null),
      ...(data.body
        ? { body: { contents: [{ mediaType: 'application/json', schema: { default: data.body } }] } }
        : null),
    },
    responses: [],
  };
}
