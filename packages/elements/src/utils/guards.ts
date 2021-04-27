import { IHttpOperation, IHttpRequest, IHttpService } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
import { isObject } from 'lodash';

export function isJSONSchema(maybeSchema: unknown): maybeSchema is JSONSchema7 {
  // TODO (CL): Do we actually need a more specific guard?
  return isObject(maybeSchema);
}

export function isHttpService(maybeHttpService: unknown): maybeHttpService is IHttpService {
  // TODO (CL): Do we actually need a more specific guard?
  return isObject(maybeHttpService);
}

export function isHttpOperation(maybeHttpOperation: unknown): maybeHttpOperation is IHttpOperation {
  // TODO (CL): Do we actually need a more specific guard?
  return isObject(maybeHttpOperation);
}

export function isHttpRequest(maybeHttpRequest: unknown): maybeHttpRequest is IHttpRequest {
  return isObject(maybeHttpRequest) && 'method' in maybeHttpRequest && 'url' in maybeHttpRequest;
}
