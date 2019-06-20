import { IHttpRequest } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

export interface IHttpRequestProps extends IErrorBoundary {
  className?: string;
  value: IHttpRequest;
}

export const HttpRequestComponent: React.FunctionComponent<IHttpRequestProps> = ({ className, value }) => {
  if (!value) return null;

  return <div className={cn('HttpRequest', className)} />;
};
HttpRequestComponent.displayName = 'HttpRequest.Component';

export const HttpRequest = withErrorBoundary<IHttpRequestProps>(HttpRequestComponent, ['value'], 'HttpRequest');
