import { IHttpOperation } from '@stoplight/types';
import { Button, Card, CodeViewer } from '@stoplight/ui-kit';
import * as React from 'react';

import { getHttpCodeColor } from '../../utils/http';

interface BasicSendProps {
  httpOperation: IHttpOperation;
}

interface ResponseState {
  status: number;
  statusText: string;
  bodyText: string;
}

interface ErrorState {
  error: Error;
}

export const BasicSend: React.FC<BasicSendProps> = ({ httpOperation }) => {
  const [response, setResponse] = React.useState<ResponseState | ErrorState | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const server = httpOperation.servers?.[0]?.url;

  const sendRequest = async () => {
    try {
      setLoading(true);
      const response = await fetch(server + httpOperation.path, { method: httpOperation.method });
      setResponse({
        status: response.status,
        statusText: response.statusText,
        bodyText: await response.text(),
      });
    } catch (e) {
      setResponse({ error: e });
    } finally {
      setLoading(false);
    }
  };

  if (!server) return null;
  return (
    <Card className="p-0">
      <p className="flex flex-row bg-gray-7 font-mono rounded-t-lg py-2 pl-4">
        <div className="text-white uppercase pr-2">{httpOperation.method}</div>
        <div className="text-gray-2">{httpOperation.path}</div>
      </p>
      <div className="bg-gray-5 px-4 py-3">
        <Button className="bp3-small rounded" loading={loading} intent="primary" onClick={sendRequest}>
          Send
        </Button>
      </div>
      {response && !('error' in response) && (
        <div className="font-sans font-light">
          <div className="bg-gray-6 text-gray-2 px-4 py-3">Response</div>
          <div className="bg-gray-5">
            <div className={`p-4 text-${getHttpCodeColor(response.status)}`}>
              {`${response.status} ${response.statusText}`}
            </div>
            {response.bodyText && (
              <CodeViewer
                showLineNumbers
                value={response.bodyText || ''}
                language="html"
                className="pr-8 pb-4 font-sans whitespace-pre-wrap break-words"
              ></CodeViewer>
            )}
          </div>
        </div>
      )}
      {response && 'error' in response && (
        <div className="font-sans font-light">
          <div className="bg-gray-6 text-gray-2 px-4 py-3">Error</div>
          <div className="bg-gray-5">
            <div className="p-4">{response.error.message}</div>
          </div>
        </div>
      )}
    </Card>
  );
};
