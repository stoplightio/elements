import { JsonTreeListNode } from '../types';

export const renderTree = (root: unknown) => renderNode([], root, 0);

const getType = (node: unknown) => {
  if (node === null) {
    return 'null';
  } else if (Array.isArray(node)) {
    return 'array';
  } else {
    return typeof node;
  }
};

const renderNode = (treeList: JsonTreeListNode[], node: unknown, level = 0, name = '') => {
  const type = getType(node);

  const baseNode: JsonTreeListNode = {
    id: Math.random().toString(36),
    level,
    name,
    type,
    metadata: {},
  };

  treeList.push(baseNode);

  if (type === 'array' || type === 'object') {
    baseNode.canHaveChildren = true;

    if (type === 'array') {
      baseNode.metadata!.value = (node as any[]).length;
      for (const [i, n] of (node as any[]).entries()) {
        renderNode(treeList, n, level + 1, String(i));
      }
    } else {
      baseNode.metadata!.value = Object.keys(node as object).length;
      for (const [i, property] of Object.entries(node as object)) {
        renderNode(treeList, property, level + 1, i);
      }
    }
  } else {
    baseNode.metadata!.value = node;
  }

  return treeList;
};
