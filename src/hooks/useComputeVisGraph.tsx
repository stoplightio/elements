import { sortBy, uniqBy } from 'lodash';
import * as React from 'react';
import URI from 'urijs';
import { Edge, Node } from 'vis';
import { INodeGraph, INodeInfo, IVisGraph } from '../types';
import { getNodeTitle } from '../utils/node';

export function useComputeVisGraph(rootNode?: INodeInfo, activeNodeId?: number, graph?: INodeGraph) {
  return React.useMemo(() => {
    if (!graph || !rootNode) return;

    return computeVisGraph(rootNode, graph, activeNodeId);
  }, [rootNode, activeNodeId, graph]);
}

export function computeVisGraph(rootNode: INodeInfo, graph: INodeGraph, activeNodeId?: number): IVisGraph {
  const visGraph: IVisGraph = {
    nodes: [
      {
        id: rootNode.id,
        level: 0,
        label: rootNode.name,
        title: rootNode.srn,
        color: activeNodeId === rootNode.id ? '#66b1e7' : '#ef932b',
        font: {
          color: '#ffffff',
        },
      },
    ],
    edges: [],
  };

  for (const node of graph.nodes) {
    // in case root node is circular and appears again, don't add the root node twice or graph will throw error
    if (node.groupNodeId === rootNode.id) continue;

    let fontColor = '#10161a';
    let color = '#f5f8fa';
    if (activeNodeId === node.groupNodeId) {
      color = '#66b1e7';
      fontColor = '#ffffff';
    }

    visGraph.nodes.push({
      id: node.groupNodeId,
      level: node.depth,
      label: node.name,
      title: node.srn,
      color,
      font: {
        color: fontColor,
      },
    });
  }

  for (const edge of graph.edges) {
    let edgeColor = { color: '#cfd9e0', opacity: 0.8 };
    if (activeNodeId === edge.fromGroupNodeId || activeNodeId === edge.toGroupNodeId) {
      edgeColor = { color: '#66b1e7', opacity: 1 };
    }

    visGraph.edges.push({
      id: `${edge.fromGroupNodeId}-${edge.toGroupNodeId}-${edge.fromPath}-${edge.toPath}`,
      from: edge.fromGroupNodeId,
      to: edge.toGroupNodeId,
      title: edge.fromPath,
      color: edgeColor,
      font: {
        align: 'top',
      },
    });
  }

  visGraph.nodes = sortBy(visGraph.nodes, 'label');
  visGraph.edges = uniqBy(visGraph.edges, 'id');

  return visGraph;
}
