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
  if (!isObject(data)) return;
  if (Array.isArray(data['examples'])) {
    return data['examples'];
  }

  return {
    ...(isObject(data['x-examples']) && { ...data['x-examples'] }),
    ...('x-example' in data && { default: data['x-example'] }),
  };
}
