import { Dictionary } from '@stoplight/types';

import { IAny, toAstNode, TypeMap } from '.';
import { IBool, IMagicNode, INumber, IProperty, IString, NodeType, NodeTypes } from './basics';

export type toASTType<T extends string | number | boolean> = T extends string
  ? IString<T>
  : T extends number
  ? INumber
  : T extends boolean
  ? IBool
  : never;

export function makeProperty<K extends string, T extends string | boolean | number>(
  parent: IMagicNode,
  key: K,
  value: T,
  id: () => string,
): IProperty<IString<K>, toASTType<T>> {
  const prop: IProperty<IString<K>, toASTType<T>> = { parent, id: id(), type: 'property' as 'property' };
  prop.key = {
    parent: prop,
    id: id(),
    type: 'string',
    value: key,
  };
  prop.key = {
    parent: prop,
    id: id(),
    type: 'string',
    value: key,
  };
  // @ts-ignore
  prop.value = {
    parent: prop,
    id: id(),
    type: typeof value,
    value,
  };
  return prop;
}

export type toASTFromType<T extends 'string' | 'boolean' | 'number'> = T extends 'string'
  ? IString<string>
  : T extends 'number'
  ? INumber
  : T extends 'boolean'
  ? IBool
  : never;

export function findProperty<K extends string, V extends 'string' | 'boolean' | 'number'>(
  key: K,
  kind: V,
  children: IAny[],
): IProperty<IString<K>, toASTFromType<V>> | undefined {
  for (const child of children) {
    if (
      child.type === 'property' &&
      child.key?.type === 'string' &&
      (child.key as IString).value === key &&
      child.value?.type === kind
    ) {
      return (child as unknown) as IProperty<IString<K>, toASTFromType<V>>;
    }
  }
  return;
}

export function findNodes<K extends string, V extends 'string' | 'boolean' | 'number'>(
  type: K,
  children: IAny[],
): IProperty<IString<K>, toASTFromType<V>>[] {
  const properties = [];
  for (const child of children) {
    if (child.type === type) {
      properties.push((child as unknown) as IProperty<IString<K>, toASTFromType<V>>);
    }
  }
  return properties;
}

type grouped<T extends keyof TypeMap> = { [P in T]?: TypeMap[P][] };

export function groupNodes<T extends IMagicNode[]>(nodes: T) {
  const groups: grouped<T[number]['type']> = {};
  for (const node of nodes) {
    if (!groups[node.type]) groups[node.type] = [];
    groups[node.type].push(node);
  }
  return groups;
}
