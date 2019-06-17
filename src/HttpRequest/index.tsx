import { IHttpRequest } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
import { ErrorBoundaryProps, withErrorBoundary } from '../withErrorBoundary';

export interface IHttpRequestProps extends ErrorBoundaryProps {
  className?: string;
  value: IHttpRequest;
}

export const HttpRequestComponent: React.FunctionComponent<IHttpRequestProps> = ({ className, value }) => {
  if (!value) return null;

  return <div className={cn('HttpRequest', className)} />;
};
HttpRequestComponent.displayName = 'HttpRequest.Component';

export const HttpRequest = withErrorBoundary<IHttpRequestProps>(HttpRequestComponent, 'HttpRequest');
