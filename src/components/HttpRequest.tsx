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
import { ControlGroup } from '@stoplight/ui-kit';
import cn from 'classnames';
import get from 'lodash/get';
import * as React from 'react';
import { useResolver } from '../hooks/useResolver';

export interface IHttpRequestProps {
  value: string;
  className?: string;
}

export const HttpRequest: React.FunctionComponent<IHttpRequestProps> = React.memo(({ value, className }) => {
  const { result } = useResolver('http', value);

  let request;
  let operation;

  // TODO (CL): Need a better way to handle this
  if (get(result, 'id') === '?http-operation-id?') {
    operation = result;
  } else {
    request = result;
  }

  const store = new RequestMaker({ request, operation });

  return (
    <RequestMakerProvider value={store}>
      <div className={cn('HttpRequest', className)}>
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
});
