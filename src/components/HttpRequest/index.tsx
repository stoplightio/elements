import { IHttpRequest } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
import ErrorBoundary, { ErrorBoundaryProps, FallbackProps } from 'react-error-boundary';

export interface IHttpRequestProps extends ErrorBoundaryProps {
  className?: string;
  value: IHttpRequest;
}

export const HttpRequestComponent: React.FunctionComponent<IHttpRequestProps> = ({ className, value }) => {
  if (!value) return null;

  return <div className={cn('HttpRequest', className)} />;
};
HttpRequestComponent.displayName = 'HttpRequest.Component';

const HttpRequestFallback: React.FunctionComponent<FallbackProps> = ({ error }) => {
  return (
    <div className="p-4">
      <b>Error</b>
      {error && `: ${error.message}`}
    </div>
  );
};
HttpRequestFallback.displayName = 'HttpRequest.Fallback';

export const HttpRequest: React.FunctionComponent<IHttpRequestProps> = ({
  className,
  value,
  onError,
  FallbackComponent = HttpRequestFallback,
}) => {
  return (
    <ErrorBoundary onError={onError} FallbackComponent={FallbackComponent}>
      <HttpRequestComponent className={className} value={value} />
    </ErrorBoundary>
  );
};
HttpRequest.displayName = 'HttpRequest';
