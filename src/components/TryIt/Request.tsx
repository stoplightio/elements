import { Button, ControlGroup, InputGroup, Tooltip } from '@blueprintjs/core';
import { IHttpOperation } from '@stoplight/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { BasicAuth } from './BasicAuth';
import { Body } from './Body';
import { useStore } from './context';
import { Parameters } from './Parameters';

export const Request: React.FunctionComponent<{ value: IHttpOperation }> = ({ value }) => {
  return (
    <div className="TryIt__Request">
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

  const sendRequest = React.useCallback(() => store.send(), [store]);
  const resetRequest = React.useCallback(() => store.reset(), [store]);
  const setUrl = React.useCallback(e => (store.url = e.currentTarget.value), [store]);

  return (
    <ControlGroup className="TryIt__Send">
      <Button className="w-40" icon="play" intent="primary" loading={!!store.isSending} onClick={sendRequest}>
        Send
      </Button>

      <InputGroup className="flex-1" value={store.url} onChange={setUrl} />

      <Button icon="eraser" onClick={resetRequest} />
    </ControlGroup>
  );
});
