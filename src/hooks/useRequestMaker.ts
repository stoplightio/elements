import { RequestMaker } from '@stoplight/request-maker';
import { IHttpOperation } from '@stoplight/types';
import { MD5 } from 'object-hash';

// Maps a hash of the operation to the request maker object
const RequestMakers = new Map<string, RequestMaker>();

export function useRequestMaker(operation: IHttpOperation, validate: boolean = false): RequestMaker {
  const id = MD5(operation);

  let requestMaker = RequestMakers.get(id);
  if (!requestMaker) {
    requestMaker = new RequestMaker({ operation, validate });
    RequestMakers.set(id, requestMaker);
  }

  return requestMaker;
}
