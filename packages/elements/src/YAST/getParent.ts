import * as Y from 'yjs';

export function getParent(node: Y.AbstractType<any>): Y.Map<any> {
  if (node instanceof Y.Array) {
    if (!node._item?.parent) throw Error('Parent not found');
    return node._item.parent as Y.Map<any>;
  }
  if (node instanceof Y.Map) {
    if (!node._item?.parent) throw Error('Parent not found');
    const arr = node._item.parent as Y.Array<any>;
    if (!arr._item?.parent) throw Error('Parent not found');
    return arr._item.parent as Y.Map<any>;
  }
  throw Error('invalid node');
}

// @ts-ignore
window.getParent = getParent;
