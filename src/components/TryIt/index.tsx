import { RequestEditor, RequestEndpoint, RequestMakerProvider, ResponseViewer } from '@stoplight/request-maker';
import { IHttpOperation, NodeType } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';
import { useRequestMaker } from '../../hooks/useRequestMaker';
import { useResolver } from '../../hooks/useResolver';

export interface ITryItProps extends IErrorBoundary {
  value: any;
  mockUrl?: string;
  padding?: string;
  className?: string;
}

const TryItComponent: React.FunctionComponent<ITryItProps> = ({ value, mockUrl, padding = '12', className }) => {
  const { result } = useResolver<IHttpOperation>(NodeType.HttpOperation, value);
  const store = useRequestMaker(result, mockUrl, true);

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
