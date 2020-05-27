import { sortBy } from 'lodash';
import * as React from 'react';
import { Edge, Node } from 'vis-network/standalone';

import { NodeTypeIconsUnicode } from '../constants';
import { ElementsBranchNode } from '../graphql/BranchNodeBySlug';
import { INodeEdge } from '../types';

export interface IVisGraph {
  nodes: Node[];
  edges: Edge[];
}

export function useComputeVisGraph(rootNode: ElementsBranchNode, edges: INodeEdge[]) {
  return React.useMemo(() => computeVisGraph(rootNode, edges), [rootNode, edges]);
}

export function computeVisGraph(rootNode: ElementsBranchNode, edges: INodeEdge[]): IVisGraph {
  const visGraph: IVisGraph = {
    nodes: [
      {
        level: 0,
        id: rootNode.id,
        title: rootNode.uri,
        label: rootNode.name,
        icon: {
          code: NodeTypeIconsUnicode[rootNode.type],
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
      color: '#c3cdd4',
    });
  }

  visGraph.nodes = sortBy(visGraph.nodes, 'label');

  return visGraph;
}
