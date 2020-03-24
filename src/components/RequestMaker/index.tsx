import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import * as React from 'react';

import { RequestMakerProvider, useRequestMaker } from '../../hooks/useRequestMaker';
import { RequestEditor, RequestEndpoint } from './Request';
import { ResponseViewer } from './Response';

export * from './Request';
export * from './Response';

type RequestMakerProps =
  | {
      request: Partial<IHttpRequest>;
      operation?: unknown;
    }
  | {
      operation: Partial<IHttpOperation>;
      request?: undefined;
    };

export const RequestMaker: React.FC<RequestMakerProps> = (props) => {
  const store = useRequestMaker(props.request || props.operation);
  return (
    <RequestMakerProvider value={store}>
      <RequestEndpoint />

      <RequestEditor />

      <ResponseViewer />
    </RequestMakerProvider>
  );
};

export { RequestMakerProvider };
