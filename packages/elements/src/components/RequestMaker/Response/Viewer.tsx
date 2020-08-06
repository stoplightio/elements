import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';

import { Button, Tab, Tabs } from '@blueprintjs/core';
import { safeStringify } from '@stoplight/json';
import { CodeViewer, Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import { keys } from 'lodash';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMaker';
import { getHttpCodeColor } from '../../../utils/http';
import { TabTitle } from '../TabTitle';
import { ResponseBody } from './Body';
import { ResponseHeaders } from './Headers';

const panelClassName = 'bg-white dark:bg-transparent border-t';

export enum ResponseTab {
  BODY = 'body',
  HEADERS = 'headers',
  ORIGINAL = 'original',
}

export type ResponseProps = {
  tabs?: ResponseTab[];
  className?: string;
};

const defaultTabs = [ResponseTab.BODY, ResponseTab.HEADERS, ResponseTab.ORIGINAL];

export const ResponseViewer = observer<ResponseProps>(({ tabs = defaultTabs, className }) => {
  const [selectedTabId, setSelectedTabId] = React.useState('response-body');
  const requestMakerStore = useRequestMakerStore();
  const responseStore = useRequestMakerStore('response');

  if (responseStore.statusCode === 0 && !requestMakerStore.isSending && !responseStore.error) {
    return null;
  }

  const color = getHttpCodeColor(responseStore.statusCode);

  return (
    <div
      className={cn(
        'RequestMaker__ResponseViewer relative border-l border-r border-b bg-gray-1 dark:bg-transparent rounded-b',
        className,
      )}
    >
      {requestMakerStore.isSending && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-lighten-8">
          <div className="text-lg font-medium">Sending Request...</div>

          <Button className="w-32 mt-5" onClick={() => requestMakerStore.cancel()}>
            Cancel
          </Button>
        </div>
      )}

      <Tabs
        id="RequestMaker__ResponseViewer-tabs"
        className="relative RequestMaker__ResponseViewer-tabs"
        selectedTabId={selectedTabId}
        onChange={(newTabId, prevTabId, e) => {
          // Prevent other tabs from changing when the selection occurs
          // Related issue: https://github.com/reactjs/react-tabs/issues/237
          e.preventDefault();
          e.stopPropagation();
          setSelectedTabId(String(newTabId));
        }}
      >
        {tabs.includes(ResponseTab.BODY) && (
          <Tab
            id="response-body"
            title={<TabTitle title="Response Body" />}
            panelClassName={panelClassName}
            panel={<ResponseBody />}
          />
        )}

        {tabs.includes(ResponseTab.HEADERS) && (
          <Tab
            id="response-headers"
            title={<TabTitle title="Response Headers" count={keys(responseStore.headers).length} />}
            panelClassName={panelClassName}
            panel={<ResponseHeaders />}
          />
        )}

        {tabs.includes(ResponseTab.ORIGINAL) && (
          <Tab
            id="response-original"
            title={<TabTitle title="Original Request" />}
            panelClassName={panelClassName}
            panel={
              <div className="RequestMaker__RequestViewer">
                {responseStore.originalRequest !== undefined && (
                  <CodeViewer
                    language="json"
                    value={safeStringify(responseStore.originalRequest, undefined, 2)}
                    showLineNumbers
                    className="p-5"
                  />
                )}
              </div>
            }
          />
        )}

        <Tabs.Expander />

        <div className="flex flex-wrap items-center py-1 text-sm">
          {responseStore.isMockedResponse && (
            <div className="flex mx-3">
              <Tag intent="success">Mocked Response</Tag>
            </div>
          )}

          <div className="flex mx-3">
            <div className="mr-2">Status:</div>
            <div className={`text-${color} whitespace-no-wrap`}>{responseStore.statusText}</div>
          </div>

          <div className="flex mx-3">
            <div className="mr-2">Time:</div>
            <div className={`text-${color}`}>
              {responseStore.responseTime}
              ms
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
});

ResponseViewer.displayName = 'RequestMaker.ResponseViewer';
