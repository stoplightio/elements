import { IHttpOperation, NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useRequestMaker } from '../../hooks/useRequestMaker';
import { useResolver } from '../../hooks/useResolver';
import { RequestEditor, RequestEndpoint, RequestMakerProvider, ResponseViewer } from '../RequestMaker';

export interface ITryItProps extends IErrorBoundary {
  value: any;

  padding?: string;
  className?: string;
}

const TryItComponent: React.FunctionComponent<ITryItProps> = ({ className, value, padding = '12' }) => {
  const { result } = useResolver<IHttpOperation>(NodeType.HttpOperation, value);
  const store = useRequestMaker(result, true);

  return (
    <div className={cn('Page__content TryIt', `p-${padding}`, className)}>
      <RequestMakerProvider value={store}>
        <RequestEndpoint className="rounded" />

        <RequestEditor className="mt-10 border-t rounded" />

        <ResponseViewer className="mt-10 border-t rounded" />
      </RequestMakerProvider>
    </div>
  );
};
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, ['value'], 'TryIt');
