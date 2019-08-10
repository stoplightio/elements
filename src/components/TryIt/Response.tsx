import { HTMLTable, Spinner } from '@blueprintjs/core';
import { safeStringify } from '@stoplight/json';
import { CodeViewer } from '@stoplight/ui-kit';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { getHttpCodeColor, HttpCodeDescriptions } from '../../utils/http';
import { useStore } from './context';

export const Response = observer(() => {
  const { response: serverResponse, error, isSending } = useStore();

  const response = serverResponse || (error && error.response);

  if (!response) {
    if (error) {
      return (
        <div className="TryIt__Response">
          <ResponseHeader status={0} message={error.message} />
          <div className="bg-darken-2 text-darken-7 dark:text-gray-6 py-2 px-3 rounded">
            The API did not return a response. Is it running and accessible? If you are sending this request from a web
            browser, does the API support{' '}
            <a
              target="_blank"
              className="font-semibold text-darken-7 dark:text-gray-6"
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
            >
              CORS
            </a>
            ?
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="TryIt__Response">
      {response.status && <ResponseHeader status={response.status} />}
      <SimpleTabs id="TryIt__Response">
        <SimpleTabList>
          <SimpleTab>Body</SimpleTab>
          <SimpleTab>Headers</SimpleTab>
        </SimpleTabList>

        <SimpleTabPanel>
          {isSending ? (
            <Spinner />
          ) : (
            <CodeViewer
              className="overflow-auto p-3"
              language="json"
              value={safeStringify(response.data, undefined, 4)}
            />
          )}
        </SimpleTabPanel>

        <SimpleTabPanel>
          {isSending ? (
            <Spinner />
          ) : (
            <div className="p-4">
              <HTMLTable className="w-full" striped bordered>
                <thead>
                  <th>Key</th>
                  <th>Value</th>
                </thead>

                <tbody>
                  {Object.keys(response.headers).map(header => {
                    return (
                      <tr key={header}>
                        <td>{header}</td>
                        <td>{response.headers[header]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </HTMLTable>
            </div>
          )}
        </SimpleTabPanel>
      </SimpleTabs>
    </div>
  );
});

interface IResponseHeaderProps {
  status: number;
  message?: string;
}

const ResponseHeader: React.FunctionComponent<IResponseHeaderProps> = ({ status, message }) => {
  const color = status !== undefined ? getHttpCodeColor(status) : '';

  return (
    <div className={cn('text-xl font-bold mb-6 flex items-center')}>
      <div className={cn('flex h-8 items-center mr-6 px-3 rounded text-white', `bg-${color} dark:bg-${color}`)}>
        {status !== 0 ? status : 'ERR'}
      </div>

      <div>{message || HttpCodeDescriptions[status] || ''}</div>
    </div>
  );
};
