import { TryIt as RMTryIt } from '@stoplight/request-maker';
import { IHttpOperation, NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useRequestMaker } from '../../hooks/useRequestMaker';
import { useResolver } from '../../hooks/useResolver';

export interface ITryItProps extends IErrorBoundary {
  value: any;

  padding?: string;
  className?: string;
  validate?: boolean;
}

const TryItComponent: React.FunctionComponent<ITryItProps> = ({ className, value, validate, padding = '12' }) => {
  const { result } = useResolver<IHttpOperation>(NodeType.HttpOperation, value);
  const store = useRequestMaker(result, validate);

  if (!store) return null;

  return (
    <div className={cn('TryIt', className, padding && `p-${padding}`)}>
      <RMTryIt store={store} editable={false} />
    </div>
  );
};
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, ['value'], 'TryIt');
