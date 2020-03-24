import { JSONSchema4 } from 'json-schema';
import { isObject } from 'lodash';

export function isJSONSchema(maybeSchema: unknown): maybeSchema is JSONSchema4 {
  return isObject(maybeSchema);
}
