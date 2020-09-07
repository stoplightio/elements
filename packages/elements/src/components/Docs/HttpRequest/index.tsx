import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpRequest } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { RequestMakerProvider } from '../../../hooks/useRequestMakerStore';
import { createRequestMakerStore } from '../../../utils/createRequestMakerStore';
import { RequestEditor, RequestEndpoint, ResponseViewer } from '../../RequestMaker';

export type HttpRequestProps = IDocsComponentProps<Partial<IHttpRequest>>;

const HttpRequestComponent = React.memo<HttpRequestProps>(({ data, className }) => {
  const store = React.useMemo(() => createRequestMakerStore(data, true), [data]);

  return (
    <div className={cn('RequestMaker', className)}>
      <RequestMakerProvider value={store}>
        <RequestEndpoint />

        <RequestEditor />

        <ResponseViewer />
      </RequestMakerProvider>
    </div>
  );
});

export const HttpRequest = withErrorBoundary<HttpRequestProps>(HttpRequestComponent, { recoverableProps: ['data'] });
