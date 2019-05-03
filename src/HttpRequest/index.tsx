import { IHttpRequest } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

export interface IHttpRequestProps {
  className?: string;
  value: IHttpRequest;
}

export const HttpRequest: React.FunctionComponent<IHttpRequestProps> = ({ className, value }) => {
  if (!value) return null;

  return <div className={cn('HttpRequest', className)} />;
};
HttpRequest.displayName = 'HttpRequest';
