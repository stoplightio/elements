import { IHttpOperation } from '@stoplight/types';
import { Button, Card } from '@stoplight/ui-kit';
import * as React from 'react';

interface BasicSendProps {
  httpOperation: IHttpOperation;
}

export const BasicSend: React.FC<BasicSendProps> = ({ httpOperation }) => {
  const sendRequest = () => {
    const server = httpOperation.servers ? httpOperation.servers[0]?.url : null;
    console.log(server);
    server
      ? fetch(server, { method: httpOperation.method }).then(data => console.log(data))
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
    </Card>
  ) : null;
};
