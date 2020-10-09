import * as Y from 'yjs';

export function getId(node: Y.Map<any> | Y.Array<any>) {
  if (!node._item?.id) {
    throw Error('Unable to get id. Node is either a root node or not integrated into the document yet.');
  }
  return `${node._item.id.client}-${node._item.id.clock}`;
}

// @ts-ignore
window.getId = getId;
