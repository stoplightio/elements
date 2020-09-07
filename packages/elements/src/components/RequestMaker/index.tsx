import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import * as React from 'react';

import { RequestMakerProvider } from '../../hooks/useRequestMaker';
import { createRequestMakerStore } from '../../utils/createRequestMakerStore';
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

export const RequestMaker: React.FC<RequestMakerProps> = props => {
  const input = props.request || props.operation;
  const store = React.useMemo(() => createRequestMakerStore(input), [input]);
  return (
    <RequestMakerProvider value={store}>
      <RequestEndpoint />

      <RequestEditor />

      <ResponseViewer />
    </RequestMakerProvider>
  );
};

export { RequestMakerProvider };
