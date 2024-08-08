import type { IMarkdownViewerProps } from '@stoplight/markdown-viewer';
import { isArray } from '@stoplight/mosaic';
import { IHttpOperation, IHttpService, IHttpWebhookOperation, INode } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
import { isObject, isPlainObject } from 'lodash';

export function isSMDASTRoot(maybeAst: unknown): maybeAst is IMarkdownViewerProps['markdown'] {
  return (
    isObject(maybeAst) &&
    maybeAst['type' as keyof IMarkdownViewerProps['markdown']] === 'root' &&
    isArray(maybeAst['children' as keyof IMarkdownViewerProps['markdown']])
  );
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

export function isHttpWebhookOperation(
  maybeHttpWebhookOperation: unknown,
): maybeHttpWebhookOperation is IHttpWebhookOperation {
  return (
    isStoplightNode(maybeHttpWebhookOperation) &&
    'method' in maybeHttpWebhookOperation &&
    'name' in maybeHttpWebhookOperation
  );
}

const properUrl = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
);

export function isProperUrl(url: string) {
  return properUrl.test(url);
}
