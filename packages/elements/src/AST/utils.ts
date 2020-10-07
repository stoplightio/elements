import { TypeMap } from '.';
import { IMagicNode } from './basics';

type grouped<T extends keyof TypeMap> = { [P in T]?: TypeMap[P][] };

export function groupNodes<T extends IMagicNode[]>(nodes: T) {
  const groups: grouped<T[number]['type']> = {};
  for (const node of nodes) {
    if (!groups[node.type]) groups[node.type] = [];
    groups[node.type].push(node);
  }
  return groups;
}
