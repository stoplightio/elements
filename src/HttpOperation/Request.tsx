import { IHttpOperationRequest } from '@stoplight/types';
import * as React from 'react';

import { Body } from './Body';
import { Parameters } from './Parameters';

export interface IRequestProps {
  request?: IHttpOperationRequest;
}

export const Request: React.FunctionComponent<IRequestProps> = ({ request }) => {
  if (!request || typeof request !== 'object') return null;

  const { path, headers, query, body } = request;

  return (
    <div>
      <Parameters className="mt-10" title="Path Parameters" parameters={path} />

      <Parameters className="mt-10" title="Headers" parameters={headers} />

      <Parameters className="mt-10" title="Query Parameters" parameters={query} />

      {body && <Body className="mt-10" body={body} />}
    </div>
  );
};
Request.displayName = 'HttpOperation.Request';
