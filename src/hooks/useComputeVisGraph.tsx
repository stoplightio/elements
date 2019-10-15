import { pointerToPath } from '@stoplight/json';
import { IGraphNodeData, IResolveResult } from '@stoplight/json-ref-resolver/types';
import { last } from 'lodash';
import * as React from 'react';
import { IVisGraph, IVisGraphEdge } from '../types';
import { getNodeTitle } from '../utils/node';

export function useComputeVisGraph(graph?: IResolveResult['graph'], rootName?: string, activeNodeId?: string) {
  return React.useMemo(() => computeVisGraph(graph, rootName, activeNodeId), [graph, rootName, activeNodeId]);
}

export function computeVisGraph(graph?: IResolveResult['graph'], rootName?: string, activeNodeId?: string) {
  const visGraph: IVisGraph = {
    nodes: [],
    edges: [],
  };

  if (!graph) return visGraph;

  // Loop over graph nodes and add them to the visgraph
  for (const id of graph.overallOrder()) {
    const isRootNode = id === 'root';
    const encodedId = encodeURI(id);
    const node = graph.getNodeData(id);

    let color = '#f5f8fa';
    if (isRootNode) {
      color = '#ef932b';
    } else if (activeNodeId === encodedId) {
      color = '#66b1e7';
    }

    visGraph.nodes.push({
      id: encodedId,
      label: isRootNode && rootName ? rootName : getNodeTitle(encodedId, node.data),
      color,
      font: {
        color: isRootNode || activeNodeId === encodedId ? '#ffffff' : '#10161a',
      },
    });

    // Add node edges
    visGraph.edges = visGraph.edges.concat(getEdgesFromRefMap(encodedId, node.refMap));
  }

  return visGraph;
}

function getEdgesFromRefMap(nodeId: string, refMap: IGraphNodeData['refMap']) {
  const edges: IVisGraphEdge[] = [];
  const edgeMap = {};

  // Loop over the ref map to combine duplicate edges
  for (const propertyPath in refMap) {
    if (!refMap.hasOwnProperty(propertyPath)) continue;

    const propertyKey = String(last(pointerToPath(propertyPath)));
    // numbered properties are probably part of a combiner so just show "reference" instead
    const propertyName = isNaN(parseInt(propertyKey)) ? propertyKey : 'reference';

    const encodedRef = encodeURI(refMap[propertyPath]);

    if (edgeMap.hasOwnProperty(encodedRef)) {
      // Don't add this property key if it already exists
      if (!edgeMap[encodedRef].includes(propertyName)) {
        edgeMap[encodedRef].push(propertyName);
      }
    } else {
      edgeMap[encodedRef] = [propertyName];
    }
  }

  // Loop over edges and add them to the graph
  for (const targetId in edgeMap) {
    if (!edgeMap.hasOwnProperty(targetId)) continue;

    edges.push({
      from: nodeId,
      to: targetId,
      label: edgeMap[targetId].length ? edgeMap[targetId].join(',\n') : 'reference',
      font: {
        align: edgeMap[targetId].length > 1 ? 'horizontal' : 'top',
      },
    });
  }

  return edges;
}
