import { Button, ControlGroup, InputGroup, Tooltip } from '@blueprintjs/core';
import { IHttpOperation } from '@stoplight/types';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { BasicAuth } from './BasicAuth';
import { Body } from './Body';
import { useStore } from './context';
import { Parameters } from './Parameters';

export const Request: React.FunctionComponent<{ value: IHttpOperation; className?: string }> = ({
  value,
  className,
}) => {
  return (
    <div className={cn('TryIt__Request', className)}>
      {value.security && value.security.length > 0 && <BasicAuth className="mb-10" security={value.security} />}

      {value.request && value.request.path && (
        <Parameters className="mb-10" title="Path Parameters" type="path" parameters={value.request.path} />
      )}

      {value.request && value.request.headers && (
        <Parameters className="mb-10" title="Headers" type="header" parameters={value.request.headers} />
      )}

      {value.request && value.request.query && (
        <Parameters className="mb-10" title="Query Parameters" type="query" parameters={value.request.query} />
      )}

      {value.request && value.request.body && <Body className="mb-10" value={value.request.body} />}

      <Send />
    </div>
  );
};

const Send = observer(() => {
  const store = useStore();

  const [url, setUrlState] = React.useState(store.url);
  const handleChange = React.useCallback(e => setUrlState(e.currentTarget.value), [setUrlState]);
  const handleBlur = React.useCallback(e => (store.url = e.currentTarget.value), [store]);
  const sendRequest = React.useCallback(() => store.send(), [store]);
  const resetRequest = React.useCallback(() => store.reset(), [store]);

  React.useEffect(() => setUrlState(store.url), [store.url]);

  return (
    <ControlGroup className="TryIt__Send">
      <Button className="w-40" icon="play" intent="primary" loading={!!store.isSending} onClick={sendRequest}>
        Send
      </Button>

      <InputGroup
        className="flex-1"
        value={url}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            // Handle blur
            store.url = url;
            sendRequest();
          }
        }}
      />

      <Button icon="eraser" onClick={resetRequest} />
    </ControlGroup>
  );
});
