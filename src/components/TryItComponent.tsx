import {
  ActionBar,
  Parameters,
  RequestEditor,
  RequestEditorTab,
  RequestMaker,
  RequestMakerProvider,
  ResponseViewer,
  SendButton,
} from '@stoplight/request-maker';
import { IHttpOperation } from '@stoplight/types';
import { IErrorBoundary, withErrorBoundary } from '@stoplight/ui-kit/withErrorBoundary';
import cn from 'classnames';
import * as React from 'react';

export interface ITryItProps extends IErrorBoundary {
  className?: string;
  operation: IHttpOperation;
}

const TryItComponent: React.FunctionComponent<ITryItProps> = ({ className, operation }) => {
  if (!operation) return null;

  const store = new RequestMaker({ operation });
  return (
    <RequestMakerProvider value={store}>
      <div className={cn('TryIt', className)}>
        <Parameters className="mb-10" title="Path Parameters" type="path" fixedName />
        <Parameters className="mb-10" title="Headers" type="header" fixedName />
        <Parameters className="mb-10" title="Query Parameters" type="query" fixedName />
        <RequestEditor tabs={[RequestEditorTab.BODY]} className="mb-10" />
        <div className="flex mb-10">
          <ActionBar className="flex-auto" />
          <SendButton />
        </div>
        <ResponseViewer />
      </div>
    </RequestMakerProvider>
  );
};
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, ['operation'], 'TryIt');
