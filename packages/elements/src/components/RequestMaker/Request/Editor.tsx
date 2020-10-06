import { Tab, Tabs } from '@stoplight/ui-kit';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMakerStore';
import { getEnabledParams } from '../../../utils/params';
import { TabTitle } from '../TabTitle';
import { RequestBody } from './Body';
import { CodeGenerator } from './CodeGenerator';
import { RequestHeaders } from './Headers';
import { Mocking } from './Mocking';
import { RequestParameters } from './Parameters';

const panelClassName = 'bg-white dark:bg-transparent border-t';

export enum RequestEditorTab {
  HEADERS = 'headers',
  BODY = 'body',
  QUERY = 'query',
  PATH = 'path',
  CODE = 'code',
  MOCKING = 'mocking',
}

export type RequestEditorProps = {
  className?: string;
  tabs?: RequestEditorTab[];
};

const defaultAvailableTabs = Object.values(RequestEditorTab); // by default all tabs are available

export const RequestEditor = observer<RequestEditorProps>(({ tabs = defaultAvailableTabs, className }) => {
  const requestStore = useRequestMakerStore('request');
  const responseStore = useRequestMakerStore('response');
  const store = useRequestMakerStore();

  const shouldRenderQuery = tabs.includes(RequestEditorTab.QUERY);
  const shouldRenderHeaders = tabs.includes(RequestEditorTab.HEADERS);
  const shouldRenderBody = tabs.includes(RequestEditorTab.BODY);
  const shouldRenderPath = tabs.includes(RequestEditorTab.PATH);
  const shouldRenderCodeGen = tabs.includes(RequestEditorTab.CODE);
  const shouldRenderMocking = tabs.includes(RequestEditorTab.MOCKING) && store.operation;

  let defaultTab = RequestEditorTab.QUERY;
  if (shouldRenderQuery) {
    defaultTab = RequestEditorTab.QUERY;
  } else if (shouldRenderHeaders) {
    defaultTab = RequestEditorTab.HEADERS;
  } else if (shouldRenderBody) {
    defaultTab = RequestEditorTab.BODY;
  } else if (shouldRenderPath) {
    defaultTab = RequestEditorTab.PATH;
  } else if (shouldRenderCodeGen) {
    defaultTab = RequestEditorTab.CODE;
  } else if (shouldRenderMocking) {
    defaultTab = RequestEditorTab.MOCKING;
  }

  const [selectedTabId, setSelectedTabId] = React.useState(`request-${defaultTab}`);

  return (
    <div
      className={cn('RequestMaker__RequestEditor border-l border-r border-b bg-gray-1 dark:bg-transparent', className, {
        'rounded-b': responseStore.statusCode === 0,
      })}
    >
      <Tabs
        id="RequestMaker__RequestEditor-tabs"
        className="RequestMaker__RequestEditor-tabs"
        selectedTabId={selectedTabId}
        onChange={(newTabId, prevTabId, e) => {
          // Prevent other tabs from changing when the selection occurs
          // Related issue: https://github.com/reactjs/react-tabs/issues/237
          e.preventDefault();
          e.stopPropagation();
          setSelectedTabId(String(newTabId));
        }}
        renderActiveTabPanelOnly
      >
        {shouldRenderQuery && (
          <Tab
            id="request-query"
            title={
              <TabTitle
                title="Params"
                count={
                  getEnabledParams(requestStore.queryParams).length + getEnabledParams(requestStore.pathParams).length
                }
              />
            }
            panelClassName={panelClassName}
            panel={
              <>
                {requestStore.pathParams.length > 0 && <RequestParameters type="path" allowAdditions={false} />}
                <RequestParameters type="query" />
              </>
            }
          />
        )}

        {shouldRenderHeaders && (
          <Tab
            id="request-headers"
            title={<TabTitle title="Headers" count={getEnabledParams(requestStore.headerParams).length} />}
            panelClassName={panelClassName}
            panel={<RequestHeaders />}
          />
        )}

        {shouldRenderBody && (
          <Tab
            id="request-body"
            title={<TabTitle title="Body" count={requestStore.bodyCount} />}
            panelClassName={panelClassName}
            panel={<RequestBody />}
          />
        )}

        {shouldRenderCodeGen && (
          <Tab
            id="code-editor"
            title={<TabTitle title="Code Gen" />}
            panelClassName={panelClassName}
            panel={<CodeGenerator />}
          />
        )}

        {shouldRenderMocking && (
          <Tab
            id="mock-editor"
            title={<TabTitle title="Mocking" />}
            panelClassName={panelClassName}
            panel={<Mocking />}
          />
        )}

        <Tabs.Expander />
      </Tabs>
    </div>
  );
});

RequestEditor.displayName = 'RequestMaker.RequestEditor';
