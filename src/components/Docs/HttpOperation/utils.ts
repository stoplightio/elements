import { INodeExample, INodeExternalExample } from '@stoplight/types';

export function getExamplesObject(examples: Array<INodeExample | INodeExternalExample>) {
  return examples.reduce((collection, item) => {
    const value = 'externalValue' in item ? item.externalValue : item.value;
    if (value) {
      collection[item.key] = value;
    }

    return collection;
  }, {});
}
