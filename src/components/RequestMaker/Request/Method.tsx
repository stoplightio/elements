import { HttpMethod } from '@stoplight/types';
import { HTMLSelect } from '@stoplight/ui-kit';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useRequestMakerStore } from '../../../hooks/useRequestMaker';

const httpMethods = ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'];

export const RequestMethod = observer<{ className?: string }>(({ className }) => {
  const requestStore = useRequestMakerStore('request');

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    requestStore.method = e.currentTarget.value.toLowerCase() as HttpMethod;
  };

  return (
    <HTMLSelect
      className={cn('RequestMaker__RequestMethod', className)}
      value={requestStore.method.toUpperCase()}
      options={httpMethods}
      onChange={onChange}
      iconProps={{
        icon: 'caret-down',
      }}
      large
    />
  );
});

RequestMethod.displayName = 'RequestMaker.RequestMethod';
