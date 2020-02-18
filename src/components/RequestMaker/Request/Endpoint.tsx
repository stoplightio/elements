import { InputGroup, MenuItem } from '@stoplight/ui-kit';
import { ItemRenderer, Suggest } from '@stoplight/ui-kit/Select';
import cn from 'classnames';
import { map, toLower, uniqBy } from 'lodash';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useRequestMakerStore } from '../../../hooks/useRequestMaker';
import { highlightText } from '../../../utils/highlightText';
import { RequestMethod } from './Method';
import { RequestSend } from './Send';

const ServerSuggest = Suggest.ofType<string>();

const serverUrlRenderer: ItemRenderer<string> = (serverUrl, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  return (
    <MenuItem active={modifiers.active} key={serverUrl} onClick={handleClick} text={highlightText(serverUrl, query)} />
  );
};

const addServerUrlRenderer = (query: string, active: boolean, handleClick: React.MouseEventHandler<HTMLElement>) => {
  return (
    <MenuItem icon="add" text={`Use "${query}"`} active={active} onClick={handleClick} shouldDismissPopover={false} />
  );
};

export const RequestEndpoint = observer<{
  className?: string;
}>(({ className }) => {
  const store = useRequestMakerStore();
  const requestStore = useRequestMakerStore('request');
  const [url, setUrl] = React.useState();

  // the current value of the base url selector text box
  const [baseUrlTransientValue, setBaseUrlTransientValue] = React.useState();

  const onServerSuggest = (serverUrl: string) => {
    if (requestStore.servers && !requestStore.servers.find(s => s.url === serverUrl)) {
      requestStore.publicServers = uniqBy(
        [
          ...requestStore.publicServers,
          {
            url: serverUrl,
          },
        ],
        'url',
      );
    }

    setBaseUrlTransientValue('');
    if (!requestStore.shouldMock) {
      requestStore.publicBaseUrl = serverUrl;
    }
  };

  const showServerSuggestor = requestStore.servers && requestStore.servers.length > 0;

  React.useEffect(() => {
    setUrl(showServerSuggestor ? requestStore.uri : `${requestStore.baseUrl}${requestStore.uri}`);
  }, [requestStore.uri, requestStore.baseUrl]);

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showServerSuggestor) {
      requestStore.uri = e.target.value;
    } else {
      requestStore.url = e.target.value;
    }
  };

  return (
    <div className={cn('RequestMaker__RequestEndpoint flex border rounded-t', className)}>
      <RequestMethod className="w-32 border-r" />

      {showServerSuggestor && (
        <ServerSuggest
          selectedItem={requestStore.baseUrl}
          className="border-r RequestMaker__RequestHost"
          query={baseUrlTransientValue || ''}
          onQueryChange={setBaseUrlTransientValue}
          inputValueRenderer={item => item}
          createNewItemFromQuery={newUrl => newUrl}
          createNewItemRenderer={addServerUrlRenderer}
          items={map(requestStore.servers, server => server.url)}
          itemRenderer={serverUrlRenderer}
          itemPredicate={(q, item) => {
            if (requestStore.baseUrl === baseUrlTransientValue) return true;

            return toLower(item).indexOf(q.toLowerCase()) >= 0;
          }}
          onItemSelect={onServerSuggest}
          resetOnClose={false}
          resetOnQuery={false}
          resetOnSelect={false}
          popoverProps={{
            minimal: true,
          }}
          inputProps={{
            placeholder: 'Enter request URL',
            large: true,
          }}
        />
      )}

      <InputGroup
        className="flex-1 border-r shadow-none RequestMaker__RequestPath"
        placeholder="/"
        value={url || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
        onBlur={onUrlChange}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            // Trigger the onBlur event to prevent from sending stale data
            onUrlChange(e as any);
            store.send();
          }
        }}
        large
      />

      <RequestSend />
    </div>
  );
});

RequestEndpoint.displayName = 'RequestMaker.RequestEndpoint';
