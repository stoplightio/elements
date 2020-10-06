import { InputGroup } from '@stoplight/ui-kit';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import URI from 'urijs';

import { useRequestMakerStore } from '../../../hooks/useRequestMakerStore';
import { RequestMethod } from './Method';
import { RequestSend } from './Send';

export const RequestEndpoint = observer<{
  className?: string;
}>(({ className }) => {
  const store = useRequestMakerStore();
  const requestStore = useRequestMakerStore('request');
  const [url, setUrl] = React.useState<string | undefined>();

  React.useEffect(() => {
    // can't use URI.joinPaths because templatedPath might not be a valid URI (parameters)
    const query = new URI(requestStore.url).search();
    const pathAndQuery = `${requestStore.templatedPath}${query}`;
    setUrl(`${requestStore.baseUrl}${pathAndQuery}`);
  }, [requestStore.url, requestStore.templatedPath, requestStore.baseUrl]);

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    requestStore.url = e.target.value;
  };

  return (
    <div className={cn('RequestMaker__RequestEndpoint flex border rounded-t', className)}>
      <RequestMethod className="w-32 border-r" />

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
