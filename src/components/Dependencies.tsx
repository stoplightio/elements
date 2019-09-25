import { RefGraph } from '@stoplight/json-ref-resolver/refGraph';
import { RowRenderer, TreeList, TreeListEvents, TreeListRow, TreeStore } from '@stoplight/tree-list';
import { NodeType } from '@stoplight/types';
import { JSONSchema4 } from 'json-schema';
import * as React from 'react';
import URI from 'urijs';

import { deserializeSrn } from '@stoplight/path';
import { useComponents } from '../hooks/useComponents';
import { useResolver } from '../hooks/useResolver';

export const Dependencies: React.FunctionComponent<{ srn?: string; data?: any; className?: string }> = ({
  srn,
  data,
  className,
}) => {
  const result = useResolver(NodeType.Model, data || {});
  const components = useComponents();

  // TODO: Figure out how to get the root srn into the graph.
  const store = new TreeStore({ nodes: buildDependencies(result.graph, { node: srn }) });
  store.on(TreeListEvents.NodeClick, (e, n) => {
    store.toggleExpand(n, !store.isNodeExpanded(n));
  });

  const rowRenderer = React.useCallback<RowRenderer>((node: IDependency, state) => {
    const nodeSrn = (new URI(node.name).query(true) as { srn?: string }).srn;

    let url = node.name;
    let title = node.name;
    if (nodeSrn) {
      url = nodeSrn;

      const { file } = deserializeSrn(nodeSrn);
      if (file) title = file;
    }

    return (
      <div className="flex items-center pr-2 w-full">
        <TreeListRow node={node} {...state} />

        <span className="ml-auto">
          {components.link
            ? components.link(
                {
                  parent: null,
                  defaultComponents: components,
                  path: [],
                  node: {
                    url,
                    title,
                  },
                  children: ['Go To Ref'],
                },
                'link',
              )
            : null}
        </span>
      </div>
    );
  }, []);

  return (
    <div className={className}>
      <TreeList maxRows={25} store={store} rowRenderer={rowRenderer} />
    </div>
  );
};

interface IDependency {
  id: string;
  level: number;
  name: string;
  canHaveChildren?: boolean;
}

const buildDependencies = (
  graph: RefGraph<string>,
  {
    deps = [],
    node = 'root',
    level = 0,
  }: {
    deps?: IDependency[];
    node?: string;
    level?: number;
  } = {},
) => {
  const children = (graph && graph.nodeChildren(node)) || [];

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
    const nodeSrn = (new URI(child.id).query(true) as { srn?: string }).srn;
    const dep: IDependency = {
      id: `${deps.length + 1}`,
      level: level + 1,
      name: nodeSrn || child.id,
    };

    deps.push(dep);
    const childDeps = buildDependencies(graph, {
      deps,
      node: dep.id,
      level: level + 1,
    });
    if (childDeps.length) dep.canHaveChildren = true;
  }

  return deps;
};
