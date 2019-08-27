import {
  ActionBar,
  CollapsibleContent,
  RequestEditor,
  RequestMaker,
  RequestMakerProvider,
  ResponseViewer,
  SendButton,
} from '@stoplight/request-maker';
import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import * as React from 'react';

export interface IHttpRequestProps {
  operation?: IHttpOperation;
  request?: IHttpRequest;
}

export const HttpRequest: React.FunctionComponent<IHttpRequestProps> = ({ request, operation }) => {
  const store = new RequestMaker({ request, operation });
  return (
    <RequestMakerProvider value={store}>
      <div className="flex">
        <ActionBar className="flex-auto" />
        <SendButton />
      </div>
      <CollapsibleContent title="Request">
        <RequestEditor />
      </CollapsibleContent>
      <CollapsibleContent title="Response">
        <ResponseViewer />
      </CollapsibleContent>
    </RequestMakerProvider>
  );
};
