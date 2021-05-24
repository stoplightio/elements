import { MDAST } from '@stoplight/markdown';
import { isArray } from '@stoplight/mosaic';
import { IHttpOperation, IHttpService, INode } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
import { isObject, isPlainObject } from 'lodash';

export function isSMDASTRoot(maybeAst: unknown): maybeAst is MDAST.Root {
  return isObject(maybeAst) && maybeAst['type'] === 'root' && isArray(maybeAst['children']);
}

export function isJSONSchema(maybeSchema: unknown): maybeSchema is JSONSchema7 {
  // the trick is, JSONSchema doesn't define any required properties, so technically even an empty object is a valid JSONSchema
  return isPlainObject(maybeSchema);
}

function isStoplightNode(maybeNode: unknown): maybeNode is INode {
  return isObject(maybeNode) && 'id' in maybeNode;
}

export function isHttpService(maybeHttpService: unknown): maybeHttpService is IHttpService {
  return isStoplightNode(maybeHttpService) && 'name' in maybeHttpService && 'version' in maybeHttpService;
}

export function isHttpOperation(maybeHttpOperation: unknown): maybeHttpOperation is IHttpOperation {
  return isStoplightNode(maybeHttpOperation) && 'method' in maybeHttpOperation && 'path' in maybeHttpOperation;
}

export function isProperUrl(url: string) {
  const properUrl = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
  );

  return url.match(properUrl);
}
