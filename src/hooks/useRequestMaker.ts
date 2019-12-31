import { RequestMakerStore } from '@stoplight/request-maker';
import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import { has } from 'lodash';
import { MD5 } from 'object-hash';

// Maps a hash of the operation/requst to the RequestMakerStore
const RequestMakers = new Map<string, RequestMakerStore>();

export function useRequestMaker(
  value: Partial<IHttpOperation | IHttpRequest>,
  checkCache?: boolean,
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
    return getCachedRequestMaker({ operation, request });
  }

  return new RequestMakerStore({ operation, request });
}

function getCachedRequestMaker({
  operation,
  request,
}: {
  operation?: Partial<IHttpOperation>;
  request?: Partial<IHttpRequest>;
}) {
  const id = MD5({ operation, request });

  let requestMaker = RequestMakers.get(id);
  if (!requestMaker) {
    requestMaker = new RequestMakerStore({ operation, request });
    RequestMakers.set(id, requestMaker);
  }

  return requestMaker;
}
