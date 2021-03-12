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
  // `examples` are available in JSON Schema v6 and v7. For v4 we can use `x-examples`.
  // `example` is not supported by any version but we can use `x-example` extension.
  return isObject(data)
    ? {
        ...(isObject(data['x-examples']) && { ...data['x-examples'] }),
        ...(isObject(data['examples']) && { ...data['examples'] }),
        ...('x-example' in data && { default: data['x-example'] }),
      }
    : void 0;
}
