import { INodeExample, INodeExternalExample } from '@stoplight/types';
import { isObject } from 'lodash';
import * as React from 'react';

import { IMagicNode } from '../../../AST/basics';
import { IResponseExample } from '../../../AST/ResponseExample';
import { SelectionContext } from './SelectionContext';

export function getExamplesObject(examples: Array<INodeExample | INodeExternalExample>) {
  return examples.reduce((collection, item) => {
    const value = 'externalValue' in item ? item.externalValue : item.value;
    if (value) {
      collection[item.key] = value;
    }

    return collection;
  }, {});
}

export function getExamplesObjectFromAST(examples: Array<IResponseExample>) {
  const collection = {};
  for (const item of examples) {
    let key = '';
    let value = '';
    for (const child of item.children) {
      switch (child.type) {
        case 'key':
          key = child.value;
          break;
        case 'example':
          value = child.value;
          break;
        case 'url':
          value = child.value;
          break;
      }
    }
    if (key && value) {
      collection[key] = value;
    }
  }
  return collection;
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

export function useSelection<T extends IMagicNode>(data?: T) {
  const SC = React.useContext(SelectionContext);
  if (!data) return {};
  return {
    'data-id': data.id,
    ...(SC.has(data.id) ? { 'data-selected': '' } : {}),
  };
}
