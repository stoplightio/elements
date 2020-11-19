import { safeStringify } from '@stoplight/json';
import { IHttpOperation } from '@stoplight/types';
import { Button, Card, CodeViewer } from '@stoplight/ui-kit';
import * as React from 'react';

import { getHttpCodeColor } from '../../utils/http';

interface BasicSendProps {
  httpOperation: IHttpOperation;
}

export const BasicSend: React.FC<BasicSendProps> = ({ httpOperation }) => {
  const [response, setResponse] = React.useState<Response | undefined>(undefined);
  const [responseBody, setResponseBody] = React.useState<unknown | undefined>(undefined);

  const sendRequest = () => {
    const server = httpOperation.servers ? httpOperation.servers[0]?.url : null;
    server
      ? fetch(server + httpOperation.path, {
          method: httpOperation.method,
        })
          .then(data => {
            setResponse(data);
            return data.json();
          })
          .then(data => {
            setResponseBody(data);
          })
      : alert('Provide server url');
  };

  return httpOperation.servers ? (
    <Card className="w-2/5 p-0">
      <p className="flex flex-row bg-gray-7 font-mono rounded-t-lg py-2 pl-4">
        <div className="text-white uppercase pr-2">{httpOperation.method}</div>
        <div className="text-gray-2">{httpOperation.path}</div>
      </p>
      <div className="bg-gray-5 px-4 py-3">
        <Button className="bp3-small rounded" intent="primary" onClick={sendRequest}>
          Send
        </Button>
      </div>
      {response ? (
        <div className="font-sans font-light">
          <div className="bg-gray-6 text-gray-2 px-4 py-3">Response</div>
          <div className="bg-gray-5">
            <div className={`p-4 text-${getHttpCodeColor(response.status)}`}>
              {`${response.status} ${response.statusText}`}
            </div>
            {responseBody ? (
              <CodeViewer
                showLineNumbers
                value={safeStringify(responseBody, undefined, 2) || ''}
                language="html"
                className="pl-4 pb-4 text-gray-1 font-sans"
              ></CodeViewer>
            ) : null}
          </div>
        </div>
      ) : null}
    </Card>
  ) : null;
};
