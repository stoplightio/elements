import { InputGroup } from '@blueprintjs/core';
import { IHttpOperation } from '@stoplight/types';
import cn from 'classnames';
import { flatten } from 'lodash';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from './context';

export const BasicAuth = observer<{ security: IHttpOperation['security']; className?: string }>(
  ({ security, className }) => {
    const store = useStore();

    if (!security || !security.length) return null;

    const basicAuth = flatten(security).find(s => s.type === 'http' && s.scheme === 'basic');
    if (!basicAuth) return null;

    return (
      <div className={cn('TryIt__BasicAuth', className)}>
        <div className="text-lg font-semibold">Authorization</div>

        <div className="flex mt-4">
          <div className="w-40">
            <div>Username</div>

            <div className="font-semibold text-red-6 text-xs uppercase">Required</div>
          </div>

          <InputGroup
            className="flex-1"
            value={store.auth ? store.auth.username : ''}
            onChange={(e: any) => {
              store.auth = {
                password: store.auth ? store.auth.password : '',
                username: e.currentTarget.value,
              };
            }}
          />
        </div>

        <div className="flex mt-4">
          <div className="w-40">
            <div>Password</div>

            <div className="font-semibold text-red-6 text-xs uppercase">Required</div>
          </div>

          <InputGroup
            type="password"
            className="flex-1"
            value={store.auth ? store.auth.password : ''}
            onChange={(e: any) => {
              store.auth = {
                username: store.auth ? store.auth.username : '',
                password: e.currentTarget.value,
              };
            }}
          />
        </div>
      </div>
    );
  },
);
BasicAuth.displayName = 'TryIt.BasicAuth';
