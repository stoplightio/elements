import { RequestMakerStore } from '@stoplight/request-maker';
import { IHttpOperation, IHttpRequest } from '@stoplight/types';
import { get } from 'lodash';
import { MD5 } from 'object-hash';

// Maps a hash of the operation to the request maker object
const RequestMakers = new Map<string, RequestMakerStore>();

export function useRequestMaker(value: IHttpOperation | IHttpRequest, validate: boolean = false): RequestMakerStore {
  const id = MD5(value);

  let operation: IHttpOperation | undefined;
  let request: IHttpRequest | undefined;

  // TODO (CL): Need a better way to handle this
  if (get(value, 'id') === '?http-operation-id?') {
    operation = value as IHttpOperation;
  } else {
    request = value as IHttpRequest;
  }

  let requestMaker = RequestMakers.get(id);
  if (!requestMaker) {
    requestMaker = new RequestMakerStore({ operation, request, validate });
    RequestMakers.set(id, requestMaker);
  }

  return requestMaker;
}
