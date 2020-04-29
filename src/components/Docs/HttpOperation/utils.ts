import { INodeExample, INodeExternalExample } from '@stoplight/types';
import { isObject } from 'lodash';

export function getExamplesObject(examples: Array<INodeExample | INodeExternalExample>) {
  return examples.reduce((collection, item) => {
    const value = 'externalValue' in item ? item.externalValue : item.value;
    if (value) {
      collection[item.key] = value;
    }

    return collection;
  }, {});
}

export function getExamplesFromSchema(data: unknown) {
  let examples = [];

  if (isObject(data)) {
    if ('x-examples' in data) {
      examples = data['x-examples'];
    } else if ('examples' in data) {
      examples = data['examples'];
    }
  }

  return examples;
}
