import { IHttpOperation } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { Info } from './Info';
import { Request } from './Request';
import { Responses } from './Responses';

export interface IHttpOperationProps extends IErrorBoundary {
  className?: string;
  value: IHttpOperation;
}

const HttpOperationComponent: React.FunctionComponent<IHttpOperationProps> = ({ className, value }) => {
  if (typeof value !== 'object' || value === null) {
    throw new TypeError(
      `Expected http operation value to be an object but received ${value === null ? 'null' : typeof value}`,
    );
  }

  return (
    <div className={cn('HttpOperation', className)}>
      <Info
        method={value.method}
        path={value.path}
        summary={value.summary}
        description={value.description}
        servers={value.servers}
      />

      <Request className="mt-10" request={value.request} />

      <Responses className="mt-10" responses={value.responses} />
    </div>
  );
};
HttpOperationComponent.displayName = 'HttpOperation.Component';

export const HttpOperation = withErrorBoundary<IHttpOperationProps>(HttpOperationComponent, ['value'], 'HttpOperation');
