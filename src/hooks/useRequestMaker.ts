import { RequestMakerStore } from '@stoplight/request-maker';
import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import { has } from 'lodash';
import { MD5 } from 'object-hash';

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
