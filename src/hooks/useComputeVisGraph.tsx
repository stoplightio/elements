import { sortBy } from 'lodash';
import * as React from 'react';
import { IBranchNode, INodeEdge, IVisGraph } from '../types';
import { NodeTypeIconsUnicode } from '../utils/node';

export function useComputeVisGraph(rootNode: IBranchNode, edges: INodeEdge[]) {
  return React.useMemo(() => computeVisGraph(rootNode, edges), [rootNode, edges]);
}

export function computeVisGraph(rootNode: IBranchNode, edges: INodeEdge[]): IVisGraph {
  const visGraph: IVisGraph = {
    nodes: [
      {
        level: 0,
        id: rootNode.id,
        title: rootNode.node.uri,
        label: rootNode.snapshot.name,
        icon: {
          code: NodeTypeIconsUnicode[rootNode.snapshot.type],
          color: '#ef932b',
        },
      },
    ],
    edges: [],
  };

  const nodesInGraph = [rootNode.id];

  for (const edge of edges) {
    if (!nodesInGraph.includes(edge.fromBranchNodeId)) {
      nodesInGraph.push(edge.fromBranchNodeId);
      visGraph.nodes.push({
        level: edge.depth,
        id: edge.fromBranchNodeId,
        label: edge.fromBranchNodeName,
        title: edge.fromBranchNodeUri,
        icon: {
          code: NodeTypeIconsUnicode[edge.fromBranchNodeType],
        },
      });
    }

    if (!nodesInGraph.includes(edge.toBranchNodeId)) {
      nodesInGraph.push(edge.toBranchNodeId);
      visGraph.nodes.push({
        level: edge.depth,
        id: edge.toBranchNodeId,
        label: edge.toBranchNodeName,
        title: edge.toBranchNodeUri,
        icon: {
          code: NodeTypeIconsUnicode[edge.toBranchNodeType],
        },
      });
    }

    visGraph.edges.push({
      id: edge.id,
      from: edge.fromBranchNodeId,
      to: edge.toBranchNodeId,
      title: edge.fromBranchNodePath,
    });
  }

  visGraph.nodes = sortBy(visGraph.nodes, 'label');

  return visGraph;
}
