import {
  ActionBar,
  MethodSelector,
  RequestEditor,
  RequestMaker,
  RequestMakerProvider,
  ResponseViewer,
  SendButton,
} from '@stoplight/request-maker';
import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import { ControlGroup } from '@stoplight/ui-kit';
import * as React from 'react';

export interface IHttpRequestProps {
  operation?: IHttpOperation;
  request?: IHttpRequest;
  className?: string;
}

export const HttpRequest: React.FunctionComponent<IHttpRequestProps> = ({ request, operation, className }) => {
  const store = new RequestMaker({ request, operation });
  return (
    <RequestMakerProvider value={store}>
      <div className={className}>
        <ControlGroup className="mb-3">
          <SendButton className="HttpRequest__SendButton w-40" intent="primary" icon="play" />
          <MethodSelector className="HttpRequest__MethodSelector" />
          <ActionBar className="HttpRequest__ActionBar flex-auto" />
        </ControlGroup>

        <RequestEditor className="HttpRequest__RequestEditor mb-3" />

        <ResponseViewer className="HttpRequest__ResponseViewer" />
      </div>
    </RequestMakerProvider>
  );
};
