import cn from 'classnames';
import * as React from 'react';
import { Network } from 'vis-network/standalone';

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
  const visNetwork = React.useRef<Network>();

  const [activeNodeId, setActiveNodeId] = React.useState<number | undefined>();
  const [activeNodeEdge, setActiveNodeEdge] = React.useState<INodeEdge | undefined>();

  const onClickNode = React.useCallback(
    (e: any) => {
      const nodeId = e.nodes[0];
      if (!nodeId) return;

      const foundEdge = edges.find((edge) => edge.toBranchNodeId === nodeId || edge.fromBranchNodeId === nodeId);
      if (foundEdge) {
        setActiveNodeId(nodeId);
        setActiveNodeEdge(foundEdge);
      }
    },
    [edges],
  );

  React.useEffect(() => {
    // Whenever the root node changes, unset the active node edge
    setActiveNodeEdge(undefined);
  }, [rootNodeId]);

  React.useEffect(() => {
    if (visNetwork.current) {
      visNetwork.current.setSelection({ edges: [], nodes: [activeNodeId || node.id] });
    }
  }, [activeNodeId, node.id]);

  if (!visGraph || !visGraph.nodes.length) {
    return <div>This {NodeTypePrettyName[node.snapshot.type]} does not have any outbound dependencies.</div>;
  }

  return (
    <div className={cn(className, 'w-full h-full')}>
      <Graph
        id={rootNodeId}
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
      />

      <NodeDialog
        direction={activeNodeId === activeNodeEdge?.toBranchNodeId ? 'to' : 'from'}
        edge={activeNodeEdge}
        onClose={() => setActiveNodeEdge(undefined)}
      />
    </div>
  );
};
