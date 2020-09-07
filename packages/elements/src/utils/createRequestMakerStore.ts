// Maps a hash of the operation/request to the RequestMakerStore
import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import { has } from 'lodash';
import { MD5 } from 'object-hash';

import { RequestMakerStore } from '../stores/request-maker';

const RequestMakers = new Map<string, RequestMakerStore>();

function isPartialOperation(value: Partial<IHttpOperation> | Partial<IHttpRequest>): value is Partial<IHttpOperation> {
  // TODO (CL): Need a better way to determine if value is an http operation or http request
  return has(value, 'id') || has(value, 'iid') || has(value, 'request') || has(value, 'servers');
}

export function createRequestMakerStore(
  value: Partial<IHttpOperation | IHttpRequest>,
  checkCache: boolean = false,
  mockUrl?: string,
): RequestMakerStore {
  let operation: Partial<IHttpOperation> | undefined;
  let request: Partial<IHttpRequest> | undefined;

  if (typeof value === 'object') {
    if (isPartialOperation(value)) {
      operation = value;
    } else {
      request = value;
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
