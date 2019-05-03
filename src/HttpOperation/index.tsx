import cn from 'classnames';
import * as React from 'react';

import { IHttpOperation } from '@stoplight/types';

import { Info } from './Info';
import { Request } from './Request';
import { Responses } from './Responses';

export interface IHttpOperationProps {
  className?: string;
  value: IHttpOperation;
}

export const HttpOperation: React.FunctionComponent<IHttpOperationProps> = ({ className, value }) => {
  if (!value) return null;

  return (
    <div className={cn('HttpOperation', className)}>
      <Info
        method={value.method}
        path={value.path}
        summary={value.summary}
        description={value.description}
        servers={value.servers}
      />

      <Request request={value.request} />

      <Responses responses={value.responses} />
    </div>
  );
};
HttpOperation.displayName = 'HttpOperation';
