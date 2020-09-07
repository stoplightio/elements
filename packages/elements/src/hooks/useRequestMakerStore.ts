import * as React from 'react';

import { RequestMakerStore } from '../stores/request-maker';
import { RequestStore } from '../stores/request-maker/request';
import { ResponseStore } from '../stores/request-maker/response';

const RequestMakerStoreContext = React.createContext<RequestMakerStore>(new RequestMakerStore());
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
