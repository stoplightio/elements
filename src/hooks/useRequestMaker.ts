import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import { has } from 'lodash';
import { MD5 } from 'object-hash';
import * as React from 'react';

import { RequestMakerStore } from '../stores/request-maker';
import { RequestStore } from '../stores/request-maker/request';
import { ResponseStore } from '../stores/request-maker/response';

// Maps a hash of the operation/request to the RequestMakerStore
const RequestMakers = new Map<string, RequestMakerStore>();

export function useRequestMaker(
  value: Partial<IHttpOperation | IHttpRequest>,
  checkCache: boolean = false,
  mockUrl?: string,
): RequestMakerStore {
  let operation: Partial<IHttpOperation> | undefined;
  let request: Partial<IHttpRequest> | undefined;

  if (typeof value === 'object') {
    // TODO (CL): Need a better way to determine if value is an http operation or http request
    if (has(value, 'id') || has(value, 'iid') || has(value, 'request') || has(value, 'servers')) {
      operation = value as IHttpOperation;
    } else {
      request = value as IHttpRequest;
    }
  }

  if (checkCache) {
    return getCachedRequestMaker({ operation, request, mockUrl });
  }

  return new RequestMakerStore({ operation, request, mockUrl });
}

function getCachedRequestMaker({
  operation,
  request,
  mockUrl,
}: {
  operation?: Partial<IHttpOperation>;
  request?: Partial<IHttpRequest>;
  mockUrl?: string;
}) {
  const id = MD5({ operation, request, mockUrl });

  let requestMaker = RequestMakers.get(id);
  if (!requestMaker) {
    requestMaker = new RequestMakerStore({ operation, request, mockUrl });
    RequestMakers.set(id, requestMaker);
  }

  return requestMaker;
}

const RequestMakerStoreContext = React.createContext<RequestMakerStore>(new RequestMakerStore());
RequestMakerStoreContext.displayName = 'RequestMakerStoreContext';
export const RequestMakerProvider = RequestMakerStoreContext.Provider;

export function useRequestMakerStore(): RequestMakerStore;
export function useRequestMakerStore(name: 'request'): RequestStore;
export function useRequestMakerStore(name: 'response'): ResponseStore;
export function useRequestMakerStore(name?: keyof RequestMakerStore) {
  const requestMaker: RequestMakerStore = React.useContext(RequestMakerStoreContext);
  if (name) {
    return requestMaker[name];
  } else {
    return requestMaker;
  }
}
