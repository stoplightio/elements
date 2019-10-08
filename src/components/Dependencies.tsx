import { Classes, Icon } from '@blueprintjs/core';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
// @ts-ignore
import Graph from 'react-graph-vis';

import { HostContext } from '../containers/Provider';
import { useComponents } from '../hooks/useComponents';
import { useComputeVisGraph } from '../hooks/useComputeVisGraph';
import { useResolver } from '../hooks/useResolver';
import { getNodeTitle } from '../utils/node';
import { Model } from './Model';

export interface IDependencies {
  srn: string;
  data: any;
  name?: string;
  className?: string;
}

export const Dependencies: React.FC<IDependencies> = ({ className, name, srn, data }) => {
  const components = useComponents();
  const host = React.useContext(HostContext);
  const { graph, result } = useResolver(NodeType.Model, data || {});

  const rootTitle = name || getNodeTitle(srn, result);
  const rootNode = { id: 'root', label: rootTitle, color: '#ef932b', shape: 'box' };

  const [activeNode, setActiveNode] = React.useState<{ id: string; title: string; data: any } | undefined>({
    id: 'root',
    title: rootTitle,
    data: result,
  });

  const onClickNode = React.useCallback(
    e => {
      if (!graph) return;

      const nodeId = e.nodes[0];

      if (!nodeId || (activeNode && activeNode.id === nodeId)) {
        setActiveNode(undefined);
      } else {
        const decodedNodeId = decodeURI(nodeId);
        const isRoot = nodeId === 'root';

        let nodeData;
        if (!isRoot && graph.hasNode(decodedNodeId)) {
          nodeData = graph.getNodeData(decodedNodeId);
        }

        setActiveNode({
          id: decodedNodeId,
          title: isRoot ? rootTitle : getNodeTitle(decodedNodeId, nodeData),
          data: isRoot ? result : nodeData,
        });
      }
    },
    [graph, activeNode],
  );

  // Compute the VIS graph from the resolver graph
  const visGraph = useComputeVisGraph(graph, rootNode, activeNode && activeNode.id);

  if (!graph || !visGraph.nodes.length) return null;

  return (
    <div className={cn(className, 'Page__dependencies relative')}>
      <Graph
        id={srn.replace(/[^a-zA-Z]+/g, '-')}
        graph={visGraph}
        events={{
          click: onClickNode,
        }}
        options={graphOptions}
      />

      {activeNode && typeof activeNode.data === 'object' && (
        <Model
          className="border dark:border-darken-3 bg-white dark:bg-gray-7 w-128"
          schema={activeNode.data}
          actions={
            <>
              {components.link ? (
                components.link(
                  {
                    node: {
                      title: activeNode.title,
                      url: activeNode.id.replace(host, ''),
                    },
                    // @ts-ignore
                    children: 'Go To Ref',
                  },
                  activeNode.id,
                )
              ) : (
                <a className={cn('text-sm', Classes.TEXT_MUTED)} href={activeNode.id} target="_blank">
                  Go To Ref
                </a>
              )}

              <Icon
                className="ml-2 text-gray-5 cursor-pointer"
                icon="small-cross"
                onClick={() => setActiveNode(undefined)}
              />
            </>
          }
        />
      )}
    </div>
  );
};

const graphOptions = {
  layout: {
    hierarchical: true,
  },
  edges: {
    color: '#000000',
  },
  height: '500px',
};
