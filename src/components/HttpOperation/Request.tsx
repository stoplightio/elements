import { HttpSecurityScheme, IHttpOperationRequest } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { flatten } from 'lodash';
import { Body } from './Body';
import { Parameters } from './Parameters';
import { Securities } from './Securities';

export interface IRequestProps {
  request?: IHttpOperationRequest;
  security?: HttpSecurityScheme[][];
  className?: string;
}

export const Request: React.FunctionComponent<IRequestProps> = ({ request, security, className }) => {
  if (!request || typeof request !== 'object') return null;

  const { path, headers, query, body } = request;

  return (
    <div className={cn('HttpOperation__Request', className)}>
      {security && <Securities className="mb-10" title="Security Parameters" securities={flatten(security)} />}

      {path && <Parameters className="mb-10" title="Path Parameters" parameters={path} />}

      <Parameters className="mb-10" title="Headers" parameters={headers} />

      <Parameters className="mb-10" title="Query Parameters" parameters={query} />

      {body && <Body className="mb-10" body={body} />}
    </div>
  );
};
Request.displayName = 'HttpOperation.Request';
