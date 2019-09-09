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
  console.log(document.getElementsByClassName('bp3-dark'));
  return (
    <RequestMakerProvider value={store}>
      <div className={className}>
        <ControlGroup className="mb-3">
          <MethodSelector className="HttpRequest__MethodSelector" />
          <ActionBar className="HttpRequest__ActionBar flex-auto" />
          <SendButton className="HttpRequest__SendButton w-24" intent="primary" />
        </ControlGroup>
        <RequestEditor className="HttpRequest__RequestEditor mb-3" />
        <ResponseViewer className="HttpRequest__ResponseViewer" />
      </div>
    </RequestMakerProvider>
  );
};
