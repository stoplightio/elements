import { IHttpOperation } from '@stoplight/types';
import { Button, Card } from '@stoplight/ui-kit';
import * as React from 'react';

interface BasicSendProps {
  httpOperation: IHttpOperation;
}

export const BasicSend: React.FC<BasicSendProps> = ({ httpOperation }) => {
  const sendRequest = () => {
    alert('Yo! You won!');
  };

  return (
    <Card>
      <h2 className="bg-gray-7 text-gray">
        <strong className="text-white">{httpOperation.method}</strong>
        {httpOperation.path}
      </h2>
      <Button intent="primary" onClick={sendRequest}>
        Send
      </Button>
    </Card>
  );
};
