import { HttpSecurityScheme, IHttpHeaderParam, IHttpOperationRequest, IHttpQueryParam } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { flatten } from 'lodash';
import { Body } from './Body';
import { Parameters } from './Parameters';

export interface IRequestProps {
  request?: IHttpOperationRequest;
  security?: HttpSecurityScheme[][];
  className?: string;
}

export const Request: React.FunctionComponent<IRequestProps> = ({ request, security, className }) => {
  if (!request || typeof request !== 'object') return null;

  const { path, headers, query, body } = request;

  let securityData;
  if (security) {
    securityData = getSecurityData(security);
  }

  return (
    <div className={cn('HttpOperation__Request', className)}>
      {path && <Parameters className="mb-10" title="Path Parameters" parameters={path} />}

      <Parameters
        className="mb-10"
        title="Headers"
        parameters={securityData ? securityData.headerParams.concat(headers || []) : headers}
      />

      <Parameters
        className="mb-10"
        title="Query Parameters"
        parameters={securityData ? securityData.queryParams.concat(query || []) : query}
      />

      {body && <Body className="mb-10" body={body} />}
    </div>
  );
};
Request.displayName = 'HttpOperation.Request';

const getSecurityData = (httpSecuritySchemes: HttpSecurityScheme[][]) => {
  const queryParams: IHttpQueryParam[] = [];
  const headerParams: IHttpHeaderParam[] = [];

  for (const security of flatten(httpSecuritySchemes)) {
    if ('in' in security) {
      const param = {
        name: security.name,
        description: security.description,
        style: '',
        required: true,
        schema: {
          type: 'string',
        },
      };

      if (security.in === 'query') {
        param.style = 'form';
        queryParams.push(param as IHttpQueryParam);
      } else if (security.in === 'header') {
        param.style = 'simple';
        headerParams.push(param as IHttpHeaderParam);
      }
    }
  }

  return { queryParams, headerParams };
};
