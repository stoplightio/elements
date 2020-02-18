import * as React from 'react';

import { IHttpOperation, IHttpRequest } from '@stoplight/types';

import { RequestMakerProvider, useRequestMaker } from '../../hooks';
import { RequestEditor, RequestEndpoint } from './Request';
import { ResponseViewer } from './Response';

export * from './Request';
export * from './Response';

type RequestMakerProps =
  | {
      request: Partial<IHttpRequest>;
      operation?: Partial<IHttpOperation>;
    }
  | {
      operation: Partial<IHttpOperation>;
      request?: Partial<IHttpRequest>;
    };

export const RequestMaker: React.FC<RequestMakerProps> = props => {
  const store = useRequestMaker(props.request || props.operation || {});
  return (
    <RequestMakerProvider value={store}>
      <RequestEndpoint />

      <RequestEditor />

      <ResponseViewer />
    </RequestMakerProvider>
  );
};

export { RequestMakerProvider };
