import cn from 'classnames';
import * as React from 'react';
import { DataSetNodes, Network } from 'vis-network/standalone';

import { NodeTypePrettyName } from '../../constants';
import { useComputeVisGraph } from '../../hooks/useComputeVisGraph';
import { IBranchNode, INodeEdge } from '../../types';
import { Graph } from './Graph';
import { NodeDialog } from './NodeDialog';

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
  const defaultNode = edges.find(
    (e) => e.fromBranchNodeId === rootNodeId && e.fromBranchNodeName === node.snapshot.name,
  );

  const [activeNode, setActiveNode] = React.useState<INodeEdge | undefined>();
  const prevActiveNodeId = React.useRef<number | undefined>();

  const onClickNode = React.useCallback(
    (e: any) => {
      const nodeId = e.nodes[0];
      if (!nodeId) return;

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
    [activeNode, edges],
  );

  React.useEffect(() => {
    if (prevActiveNodeId.current) {
      visNodes.current?.updateOnly({
        id: prevActiveNodeId.current,
        icon: {
          color: prevActiveNodeId.current === rootNodeId ? '#ef932b' : '#cfd9e0',
        },
      });
    }

    if (activeNode) {
      prevActiveNodeId.current = activeNode.toBranchNodeId;
    } else {
      visNodes.current?.updateOnly({
        id: rootNodeId,
        icon: {
          color: '#66b1e7',
        },
      });
      setActiveNode(defaultNode);
    }
  }, [activeNode, rootNodeId, edges, node.snapshot.name, defaultNode]);

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

      <NodeDialog
        direction="to"
        edge={activeNode === defaultNode ? undefined : activeNode}
        onClose={() => setActiveNode(undefined)}
      />
    </div>
  );
};
