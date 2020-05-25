import { JSONSchema } from '@stoplight/prism-http';
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

export function getExamplesFromSchema(data: JSONSchema) {
  // `examples` are available in JSON Schema v6 and v7. For v4 we can use `x-examples`.
  // `example` is not supported by any version but we can use `x-example` extension.
  return {
    ...('x-examples' in data && isObject(data['x-examples']) && { ...data['x-examples'] }),
    ...('examples' in data && isObject(data.examples) && { ...data.examples }),
    ...('x-example' in data && { default: data['x-example'] }),
  };
}
