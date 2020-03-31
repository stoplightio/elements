import { IHttpRequest } from '@stoplight/types';
import { withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

import { IDocsComponentProps } from '..';
import { RequestMakerProvider, useRequestMaker } from '../../../hooks/useRequestMaker';
import { RequestEditor, RequestEndpoint, ResponseViewer } from '../../RequestMaker';

export type HttpRequestProps = IDocsComponentProps<Partial<IHttpRequest>>;

const HttpRequestComponent = React.memo<HttpRequestProps>(({ data, className }) => {
  const store = useRequestMaker(data, true);

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

export const HttpRequest = withErrorBoundary<HttpRequestProps>(HttpRequestComponent, ['data'], 'TryIt');
