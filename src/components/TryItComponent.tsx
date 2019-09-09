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
import { ControlGroup } from '@stoplight/ui-kit';
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
        <Parameters className="TryIt__Parameters mb-10" title="Path Parameters" type="path" fixedName />
        <Parameters className="TryIt__Parameters mb-10" title="Headers" type="header" fixedName />
        <Parameters className="TryIt__Parameters mb-10" title="Query Parameters" type="query" fixedName />
        <div className="text-lg font-semibold mb-6">Body</div>
        <RequestEditor tabs={[RequestEditorTab.BODY]} className="TryIt__RequestEditor mb-10" />
        <ControlGroup className="TryIt__Send mb-10">
          <SendButton className="TryIt__SendButton w-40" intent="primary" icon="play" />
          <ActionBar className="TryIt__ActionBar flex-auto" />
        </ControlGroup>
        <ResponseViewer />
      </div>
    </RequestMakerProvider>
  );
};
TryItComponent.displayName = 'TryIt.Component';

export const TryIt = withErrorBoundary<ITryItProps>(TryItComponent, ['operation'], 'TryIt');
