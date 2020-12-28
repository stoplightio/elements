import { withErrorBoundary } from '@stoplight/react-error-boundary';
import cn from 'classnames';
import * as React from 'react';

import { useParsedValue } from '../../hooks/useParsedValue';
import { OnRequestSent, OnResponseReceived } from '../../stores/request-maker';
import { createRequestMakerStore } from '../../utils/createRequestMakerStore';
import { isHttpOperation } from '../../utils/guards';
import { RequestEditor, RequestEndpoint, RequestMakerProvider, ResponseViewer } from '../RequestMaker';

export interface ITryItProps {
  nodeType: string;
  nodeData: unknown;
  mockUrl?: string;
  className?: string;
  onRequestSent?: OnRequestSent;
  onResponseReceived?: OnResponseReceived;
}

const TryItComponent = React.memo<ITryItProps>(
  ({ nodeType, nodeData, mockUrl, className, onRequestSent, onResponseReceived }) => {
    const data = useParsedValue(nodeData);

    let operation = {};
    if (nodeType === 'http_operation' && isHttpOperation(data)) {
      operation = data;
    }

    const store = React.useMemo(() => createRequestMakerStore(operation, true, mockUrl), [operation, mockUrl]);

    if (onRequestSent) {
      store.onRequestSent = onRequestSent;
    }

    if (onResponseReceived) {
      store.onResponseReceived = onResponseReceived;
    }

    return (
      <div className={cn('TryIt', className)}>
        <RequestMakerProvider value={store}>
          <RequestEndpoint className="rounded" />

          <RequestEditor className="mt-10 border-t rounded" />

          <ResponseViewer className="mt-10 border-t rounded" />
        </RequestMakerProvider>
      </div>
    );
  },
);
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, { recoverableProps: ['nodeData'] });
