import * as SMDAST from '@stoplight/markdown';
import { isArray } from '@stoplight/mosaic';
import { IHttpOperation, IHttpRequest, IHttpService } from '@stoplight/types';
import { isObject } from 'lodash';

import { JSONSchema } from '../types';

export function isSMDASTRoot(maybeAst: unknown): maybeAst is SMDAST.IRoot {
  return isObject(maybeAst) && maybeAst['type'] === 'root' && isArray(maybeAst['children']);
}

export function isJSONSchema(maybeSchema: unknown): maybeSchema is JSONSchema {
  // TODO (CL): Do we actually need a more specific guard?
  // TODO (MT): MAYBE
  return isObject(maybeSchema);
}

export function isHttpService(maybeHttpService: unknown): maybeHttpService is IHttpService {
  // TODO (CL): Do we actually need a more specific guard?
  // TODO (MT): YES
  return isObject(maybeHttpService);
}

export function isHttpOperation(maybeHttpOperation: unknown): maybeHttpOperation is IHttpOperation {
  // TODO (CL): Do we actually need a more specific guard?
  // TODO (MT): YES
  return isObject(maybeHttpOperation);
}

export function isHttpRequest(maybeHttpRequest: unknown): maybeHttpRequest is IHttpRequest {
  return isObject(maybeHttpRequest) && 'method' in maybeHttpRequest && 'url' in maybeHttpRequest;
}
