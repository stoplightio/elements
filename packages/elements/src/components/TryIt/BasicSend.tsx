import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Panel, Text } from '@stoplight/mosaic';
import { IHttpOperation } from '@stoplight/types';
import { CodeViewer } from '@stoplight/ui-kit';
import * as React from 'react';

import { HttpCodeDescriptions } from '../../constants';
import { getHttpCodeColor } from '../../utils/http';

interface BasicSendProps {
  httpOperation: IHttpOperation;
}

interface ResponseState {
  status: number;
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
    <div>
      <Panel isCollapsible={false} className="p-0">
        <Panel.Titlebar bg="canvas-300">
          <div role="heading" className="sl-font-bold">
            <Text color="primary">PUT</Text>
            <Text ml={2}>/todos/todoId</Text>
          </div>
        </Panel.Titlebar>
        <Panel.Content>
          <Button appearance="primary" loading={loading} onClick={sendRequest}>
            Send
          </Button>
        </Panel.Content>
      </Panel>
      {response && !('error' in response) && (
        <Panel defaultIsOpen>
          <Panel.Titlebar>Response</Panel.Titlebar>
          <Panel.Content>
            <div>
              <div className={`mb-3 text-${getHttpCodeColor(response.status)}`}>
                {`${response.status} ${HttpCodeDescriptions[response.status] ?? ''}`}
              </div>
              {response.bodyText ? (
                <CodeViewer
                  showLineNumbers
                  value={response.bodyText || ''}
                  language="html"
                  className="pr-8 pb-4 font-sans whitespace-pre-wrap break-words"
                />
              ) : (
                <p>
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                  No response body returned
                </p>
              )}
            </div>
          </Panel.Content>
        </Panel>
      )}
      {response && 'error' in response && (
        <Panel defaultIsOpen>
          <Panel.Titlebar>Error</Panel.Titlebar>
          <Panel.Content>
            <p>{response.error.message}</p>
          </Panel.Content>
        </Panel>
      )}
    </div>
  );
};
