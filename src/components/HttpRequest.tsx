import {
  ActionBar,
  MethodSelector,
  RequestEditor,
  RequestMaker,
  RequestMakerProvider,
  ResponseStatus,
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
        <ControlGroup>
          <SendButton className="HttpRequest__SendButton w-40" intent="primary" icon="play" />
          <MethodSelector className="HttpRequest__MethodSelector" />
          <ActionBar className="HttpRequest__ActionBar flex-auto" />
        </ControlGroup>

        <RequestEditor className="HttpRequest__RequestEditor mt-6" />

        <ResponseStatus className="HttpRequest__ResponseStatus mt-6" />

        <ResponseViewer className="HttpRequest__ResponseViewer mt-6" />
      </div>
    </RequestMakerProvider>
  );
};
