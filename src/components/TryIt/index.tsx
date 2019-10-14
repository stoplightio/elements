import { IHttpOperation } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { StoreProvider } from './context';
import { Request } from './Request';
import { Response } from './Response';

export interface ITryItProps extends IErrorBoundary {
  value: IHttpOperation;

  padding?: string;
  className?: string;
}

const TryItComponent: React.FunctionComponent<ITryItProps> = ({ className, padding, value }) => {
  if (!value) return null;

  return (
    <StoreProvider value={value}>
      <div className={cn('TryIt', className, padding && `p-${padding}`)}>
        <Request value={value} />

        <Response className="mt-10" />
      </div>
    </StoreProvider>
  );
};
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, ['value'], 'TryIt');
