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
}

const TryItComponent: React.FunctionComponent<ITryItProps> = ({ className, value, padding = '12' }) => {
  const { result } = useResolver<IHttpOperation>(NodeType.HttpOperation, value);
  const store = useRequestMaker(result, true);

  return <RMTryIt className={cn(className, padding && `p-${padding}`)} store={store} editable={false} />;
};
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, ['value'], 'TryIt');
