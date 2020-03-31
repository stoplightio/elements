import { Icon } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';
import { DataSetNodes, Network } from 'vis-network/standalone';

import { NodeTypePrettyName } from '../../constants';
import { Docs } from '../../containers/Docs';
import { useComputeVisGraph } from '../../hooks/useComputeVisGraph';
import { IBranchNode, INodeEdge } from '../../types';
import { GoToRef } from './GoToRef';
import { Graph } from './Graph';

export interface IOutboundDependencies {
  node: IBranchNode;
  edges: INodeEdge[];

  getNetwork?: (network?: Network) => void;
  className?: string;
}

export const OutboundDependencies = ({ className, node, edges, getNetwork }: IOutboundDependencies) => {
  const rootNodeId = node.id;
  const visGraph = useComputeVisGraph(node, edges);
  const visNodes = React.useRef<DataSetNodes>();
  const visNetwork = React.useRef<Network>();

  const [activeNode, setActiveNode] = React.useState<INodeEdge | undefined>();

  const onClickNode = React.useCallback(
    (e: any) => {
      const nodeId = e.nodes[0];
      if (!nodeId) return;

      if (activeNode) {
        // Reset the previous active node
        visNodes.current?.updateOnly({
          id: activeNode.toBranchNodeId,
          icon: {
            color: activeNode.toBranchNodeId === node.id ? '#ef932b' : '#cfd9e0',
          },
        });
      }

      if (activeNode?.toBranchNodeId === nodeId) {
        // Unselect nodes and edges
        visNetwork.current?.unselectAll();
        setActiveNode(undefined);
      } else {
        // Update the active node's color
        visNodes.current?.updateOnly({
          id: nodeId,
          icon: {
            color: '#66b1e7',
          },
        });
        setActiveNode(edges.find((edge) => edge.toBranchNodeId === nodeId));
      }
    },
    [activeNode, edges, node.id],
  );

  React.useEffect(() => {
    visNetwork.current?.unselectAll();
    setActiveNode(undefined);
  }, [rootNodeId]);

  if (!visGraph || !visGraph.nodes.length) {
    return <div>This {NodeTypePrettyName[node.snapshot.type]} does not have any outbound dependencies.</div>;
  }

  return (
    <div className={cn(className, 'w-full h-full')}>
      <Graph
        id={node.id}
        graph={visGraph}
        events={{
          click: onClickNode,
        }}
        getNetwork={(network) => {
          visNetwork.current = network;

          if (getNetwork) {
            getNetwork(network);
          }
        }}
        getNodes={(n) => {
          visNodes.current = n;
        }}
      />

      {activeNode && (
        <div className={cn('absolute bottom-0 right-0 left-0 pb-16 px-16')}>
          <div className="flex bg-gray-2 border-b px-4">
            <GoToRef className="flex-1" uri={activeNode.toBranchNodeUri}>
              {activeNode.toBranchNodeName}
            </GoToRef>

            <Icon
              className="ml-2 cursor-pointer text-gray-5 hover:text-gray-6"
              icon="small-cross"
              onClick={() => setActiveNode(undefined)}
            />
          </div>

          <Docs node={activeNode.toBranchNodeUri} />
        </div>
      )}
    </div>
  );
};
