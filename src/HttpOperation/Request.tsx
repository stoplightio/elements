import * as React from 'react';

import { IHttpOperationRequest } from '@stoplight/types';
import { Body } from './Body';
import { Parameters } from './Parameters';

export interface IRequestProps {
  request: IHttpOperationRequest;
}

export const Request: React.FunctionComponent<IRequestProps> = ({ request: { path, headers, query, body } }) => {
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
