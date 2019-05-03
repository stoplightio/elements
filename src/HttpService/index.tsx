import { IHttpService } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

export interface IHttpServiceProps {
  className?: string;
  value: IHttpService;
}

export const HttpService: React.FunctionComponent<IHttpServiceProps> = ({ className, value }) => {
  if (!value) return null;

  return <div className={cn('HttpService', className)} />;
};
HttpService.displayName = 'HttpService';
