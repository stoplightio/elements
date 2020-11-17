import { IHttpOperation } from '@stoplight/types';
import { Button, Card } from '@stoplight/ui-kit';
import * as React from 'react';

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
          // .then(data => {
          //   return data.json();
          // })
          // .then(data => setResponseBody(data))
          .then(data => setResponseBody(data))
      : alert('Provide server url');
  };

  return httpOperation.servers ? (
    <Card>
      <h2 className="bg-gray-7 text-gray">
        <strong className="text-white">{httpOperation.method}</strong>
        {httpOperation.path}
      </h2>
      <Button intent="primary" onClick={sendRequest}>
        Send
      </Button>
      {response ? <div>{response.status}</div> : null}
      {responseBody ? <div>{JSON.stringify(responseBody)}</div> : null}
    </Card>
  ) : null;
};
