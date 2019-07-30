import { IHttpOperation } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { StoreProvider } from './context';
import { Request } from './Request';
import { Response } from './Response';

export interface ITryItProps extends IErrorBoundary {
  className?: string;
  value: IHttpOperation;
}

const TryItComponent: React.FunctionComponent<ITryItProps> = ({ className, value }) => {
  if (!value) return null;

  return (
    <StoreProvider value={value}>
      <div className={cn('TryIt', className)}>
        <Request className="mb-10" value={value} />

        <Response />
      </div>
    </StoreProvider>
  );
};
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, ['value'], 'TryIt');
