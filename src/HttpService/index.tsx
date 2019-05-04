import { IHttpService } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
import ErrorBoundary, { ErrorBoundaryProps, FallbackProps } from 'react-error-boundary';

export interface IHttpServiceProps extends ErrorBoundaryProps {
  className?: string;
  value: IHttpService;
}

export const HttpServiceComponent: React.FunctionComponent<IHttpServiceProps> = ({ className, value }) => {
  if (!value) return null;

  return <div className={cn('HttpService', className)} />;
};
HttpServiceComponent.displayName = 'HttpService.FallbackComponent';

const HttpServiceFallback: React.FunctionComponent<FallbackProps> = ({ error }) => {
  return (
    <div className="p-4">
      <b>Error</b>
      {error && `: ${error.message}`}
    </div>
  );
};
HttpServiceFallback.displayName = 'HttpService.Fallback';

export const HttpService: React.FunctionComponent<IHttpServiceProps> = ({
  className,
  value,
  onError,
  FallbackComponent = HttpServiceFallback,
}) => {
  return (
    <ErrorBoundary onError={onError} FallbackComponent={FallbackComponent}>
      <HttpServiceComponent className={className} value={value} />
    </ErrorBoundary>
  );
};
HttpService.displayName = 'HttpService';
