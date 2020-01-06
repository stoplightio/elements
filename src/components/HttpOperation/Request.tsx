import { HttpSecurityScheme, IHttpOperationRequest } from '@stoplight/types';
import cn from 'classnames';
import { flatten } from 'lodash';
import * as React from 'react';
import { HttpSecuritySchemes } from '../HttpSecuritySchemes';
import { Body } from './Body';
import { Parameters } from './Parameters';

export interface IRequestProps {
  request?: IHttpOperationRequest;
  security?: HttpSecurityScheme[][];
  className?: string;
}

export const Request: React.FunctionComponent<IRequestProps> = ({ request, security, className }) => {
  if (!request || typeof request !== 'object') return null;

  const { path, headers, query, cookie, body } = request;

  return (
    <div className={cn('HttpOperation__Request', className)}>
      <HttpSecuritySchemes className="mb-10" title="Authorization" securities={flatten(security)} />

      <Parameters className="mb-10" title="Path Parameters" parameters={path} />
      <Parameters className="mb-10" title="Query Parameters" parameters={query} />
      <Parameters className="mb-10" title="Cookie Parameters" parameters={cookie} />
      <Parameters className="mb-10" title="Header Parameters" parameters={headers} />

      {body && <Body className="mb-10" body={body} />}
    </div>
  );
};
Request.displayName = 'HttpOperation.Request';
