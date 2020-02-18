import { RequestEditor, RequestEndpoint, ResponseViewer } from '../RequestMaker';
import { IHttpRequest } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useRequestMaker } from '../../hooks/useRequestMaker';
import { useResolver } from '../../hooks/useResolver';

export interface IHttpRequestProps extends IErrorBoundary {
  value: string;
  className?: string;
}

const HttpRequestComponent = React.memo<IHttpRequestProps>(({ value, className }) => {
  const { result } = useResolver<IHttpRequest>('http', value);
  const store = useRequestMaker(result);

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

export const HttpRequest = withErrorBoundary<IHttpRequestProps>(HttpRequestComponent, ['value'], 'TryIt');
