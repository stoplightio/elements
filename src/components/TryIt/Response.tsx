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
  const { response, isSending } = useStore();

  if (!response) {
    return null;
  }

  const color = response.status ? getHttpCodeColor(response.status) : '';

  return (
    <div className="TryIt__Response">
      {response.status && (
        <div className={cn('text-xl font-bold mb-6 flex items-center')}>
          <div className={cn('flex h-8 items-center mr-6 px-3 rounded text-white', `bg-${color} dark:bg-${color}`)}>
            {response.status}
          </div>

          <div>{HttpCodeDescriptions[response.status] || ''}</div>
        </div>
      )}

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
