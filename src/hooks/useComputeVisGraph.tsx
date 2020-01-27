import * as React from 'react';
import { INodeGraph, IVisGraph } from '../types';

export function useComputeVisGraph(rootNodeId?: number, activeNodeId?: number, graph?: INodeGraph) {
  return React.useMemo(() => {
    if (!graph || !rootNodeId) return;

    return computeVisGraph(rootNodeId, graph, activeNodeId);
  }, [rootNodeId, activeNodeId, graph]);
}

export function computeVisGraph(rootNodeId: number, graph: INodeGraph, activeNodeId?: number): IVisGraph {
  const visGraph: IVisGraph = {
    nodes: [
      // TODO (CL): Should the root node be included in the response from /nodes.graph?
      {
        id: rootNodeId,
        level: 0,
        label: 'root',
        color: activeNodeId === rootNodeId ? '#66b1e7' : '#ef932b',
        font: {
          color: '#ffffff',
        },
      },
    ],
    edges: [],
  };

  for (const node of graph.nodes) {
    let fontColor = '#10161a';
    let color = '#f5f8fa';
    if (activeNodeId === node.id) {
      color = '#66b1e7';
      fontColor = '#ffffff';
    }

    visGraph.nodes.push({
      id: node.id,
      level: node.depth,
      label: node.name,
      color,
      font: {
        color: fontColor,
      },
    });
  }

  for (const edge of graph.edges) {
    let edgeColor = { color: '#cfd9e0', opacity: 0.8 };
    if (activeNodeId === edge.fromId || activeNodeId === edge.toId) {
      edgeColor = { color: '#66b1e7', opacity: 1 };
    }

    visGraph.edges.push({
      id: `${edge.fromId}-${edge.toId}-${edge.fromPath}-${edge.toPath}`,
      from: edge.fromId,
      to: edge.toId,
      title: edge.fromPath,
      color: edgeColor,
      font: {
        align: 'top',
      },
    });
  }

  return visGraph;
}
