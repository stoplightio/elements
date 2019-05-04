import cn from 'classnames';
import * as React from 'react';
import ErrorBoundary, { ErrorBoundaryProps, FallbackProps } from 'react-error-boundary';

import { IHttpOperation } from '@stoplight/types';

import { Info } from './Info';
import { Request } from './Request';
import { Responses } from './Responses';

export interface IHttpOperationProps extends ErrorBoundaryProps {
  className?: string;
  value: IHttpOperation;
}

const HttpOperationComponent: React.FunctionComponent<IHttpOperationProps> = ({ className, value }) => {
  if (typeof value !== 'object' || value === null) {
    throw new TypeError(
      `Expected http operation value to be an object but received ${value === null ? 'null' : typeof value}`
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

      <Request request={value.request} />

      <Responses responses={value.responses} />
    </div>
  );
};
HttpOperationComponent.displayName = 'HttpOperation.Component';

const HttpOperationFallback: React.FunctionComponent<FallbackProps> = ({ error }) => {
  return (
    <div className="p-4">
      <b>Error</b>
      {error && `: ${error.message}`}
    </div>
  );
};
HttpOperationFallback.displayName = 'HttpOperation.Fallback';

export const HttpOperation: React.FunctionComponent<IHttpOperationProps> = ({
  className,
  value,
  onError,
  FallbackComponent = HttpOperationFallback,
}) => {
  return (
    <ErrorBoundary onError={onError} FallbackComponent={FallbackComponent}>
      <HttpOperationComponent className={className} value={value} />
    </ErrorBoundary>
  );
};
HttpOperation.displayName = 'HttpOperation';
