import get from 'lodash/get';
import last from 'lodash/last';
import * as React from 'react';
import { getNodeTitle } from '../utils/node';

export interface IVisGraphNode {
  id: string;
  label: string;
  color: string;
  shape: string;
}

export interface IVisGraphEdge {
  to: string;
  from: string;
}

export interface IVisGraph {
  nodes: IVisGraphNode[];
  edges: IVisGraphEdge[];
}

export function useComputeVisGraph(graph: any, rootNode: IVisGraphNode, activeNodeId?: string) {
  return React.useMemo(() => computeVisGraph(graph, rootNode, activeNodeId), [graph, activeNodeId]);
}

function computeVisGraph(graph: any, rootNode: IVisGraphNode, activeNodeId?: string) {
  const visGraph: IVisGraph = {
    nodes: [rootNode],
    edges: [],
  };

  if (!graph) return visGraph;

  // Loop over graph nodes and add them to the visgraph
  for (const id in graph.nodes) {
    // Ignore root node since it's already been added to the visGraph
    if (id === 'root' || !graph.nodes.hasOwnProperty(id)) continue;

    const encodedId = encodeURI(id);

    visGraph.nodes.push({
      id: encodedId,
      label: getNodeTitle(encodedId, get(graph.nodes[id], 'data')),
      shape: 'box',
      color: activeNodeId === encodedId ? '#66b1e7' : '#d3d3d3',
    });
  }

  // Loop over outgoing edges and create a visGraph edge for each target
  for (const source in graph.outgoingEdges) {
    if (!graph.outgoingEdges[source] || !graph.outgoingEdges[source].length) continue;

    const from = encodeURI(source);

    visGraph.edges.push(
      ...graph.outgoingEdges[source].map((target: string) => {
        const refKey = last(get(graph.nodes[target], ['propertyPaths', source, 0]));

        return {
          from,
          to: encodeURI(target),
          label: typeof refKey === 'string' ? refKey : 'reference',
          font: {
            align: 'top',
          },
        };
      }),
    );
  }

  return visGraph;
}
