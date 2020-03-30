import { safeStringify } from '@stoplight/json';
import { Button, ButtonGroup, Menu, MenuItem, Popover, Position, Switch } from '@stoplight/ui-kit';
import cn from 'classnames';
import copy from 'copy-to-clipboard';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMaker';

export interface ISendButton {
  className?: string;
}

export const RequestSend = observer<ISendButton>(({ className }) => {
  const store = useRequestMakerStore();

  const handleClick = () => {
    if (store.isMockEnabled) {
      return store.mock();
    }
    return store.send();
  };

  return (
    <ButtonGroup className={cn('RequestMaker__RequestSend', className)} large>
      <Button intent="primary" loading={store.isSending} onClick={handleClick}>
        Send
      </Button>
      <Popover minimal position={Position.BOTTOM_RIGHT}>
        <Button small intent="primary" icon="caret-down" />

        <Menu>
          <MenuItem
            text="Copy Request"
            icon="duplicate"
            onClick={() => copy(safeStringify(store.request.toPartialHttpRequest(), undefined, 2))}
          />

          <MenuItem text="Reset" icon="reset" onClick={() => store.reset()} disabled={!store.hasChanges} />
        </Menu>
      </Popover>
    </ButtonGroup>
  );
});

RequestSend.displayName = 'RequestMaker.RequestSend';
