import { TreeList, TreeListEvents, TreeStore } from '@stoplight/tree-list';
import { NodeType } from '@stoplight/types';
import { JSONSchema4 } from 'json-schema';
import * as React from 'react';

import { httpResolver, useResolver } from '../hooks/useResolver';

export const Dependencies: React.FunctionComponent<{ srn?: string; schema?: JSONSchema4 }> = ({ srn, schema }) => {
  useResolver(NodeType.Model, schema || {});

  const store = new TreeStore({ nodes: buildDependencies() });
  store.on(TreeListEvents.NodeClick, (e, n) => {
    store.toggleExpand(n, !store.isNodeExpanded(n));
  });

  return <TreeList store={store} style={{ height: 500 }} />;
};

interface IDependency {
  id: string;
  level: number;
  name: string;
  canHaveChildren?: boolean;
}

const buildDependencies = (deps: IDependency[] = [], node: string = 'root', level: number = 0) => {
  const children = httpResolver.graph.nodeChildren(node);

  if (deps.length === 0) {
    const root: IDependency = {
      id: '1',
      level,
      name: node,
    };
    if (children && children.length) root.canHaveChildren = true;

    deps.push(root);
  }

  if (!children || !children.length) return [];

  for (const child of children) {
    const dep: IDependency = {
      id: `${deps.length + 1}`,
      level: level + 1,
      name: child.id,
    };

    deps.push(dep);
    const childDeps = buildDependencies(deps, dep.id, level + 1);
    if (childDeps.length) dep.canHaveChildren = true;
  }

  return deps;
};
