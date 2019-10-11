import { pointerToPath } from '@stoplight/json';
import { IResolveResult } from '@stoplight/json-ref-resolver/types';
import { last } from 'lodash';
import * as React from 'react';
import { IVisGraph, IVisGraphNode } from '../types';
import { getNodeTitle } from '../utils/node';

export function useComputeVisGraph(rootNode: IVisGraphNode, graph?: IResolveResult['graph'], activeNodeId?: string) {
  return React.useMemo(() => computeVisGraph(rootNode, graph, activeNodeId), [graph, activeNodeId]);
}

export function computeVisGraph(rootNode: IVisGraphNode, graph?: IResolveResult['graph'], activeNodeId?: string) {
  const visGraph: IVisGraph = {
    nodes: [rootNode],
    edges: [],
  };

  if (!graph) return visGraph;

  // Loop over graph nodes and add them to the visgraph
  for (const id of graph.overallOrder()) {
    const encodedId = encodeURI(id);
    const node = graph.getNodeData(id);

    // Ignore root node since it's already been added to the visGraph
    if (id !== 'root') {
      visGraph.nodes.push({
        id: encodedId,
        label: getNodeTitle(encodedId, node.data),
        color: activeNodeId === encodedId ? '#66b1e7' : '#f5f8fa',
        font: {
          color: activeNodeId === encodedId ? '#ffffff' : '#10161a',
        },
      });
    }

    const edgeMap = {};

    // Loop over the ref map to combine multiple edges into one
    for (const propertyPath in node.refMap) {
      if (!node.refMap.hasOwnProperty(propertyPath)) continue;

      // ignore numbered properties as they're probably inside a combiner
      const propertyKey = String(last(pointerToPath(propertyPath)));
      if (!isNaN(parseInt(propertyKey))) continue;

      const encodedRef = encodeURI(node.refMap[propertyPath]);

      if (edgeMap.hasOwnProperty(encodedRef)) {
        // Don't add this property key if it already exists
        if (!edgeMap[encodedRef].includes(propertyKey)) {
          edgeMap[encodedRef].push(propertyKey);
        }
      } else {
        edgeMap[encodedRef] = [propertyKey];
      }
    }

    // Loop over edges and add them to the graph
    for (const targetId in edgeMap) {
      if (!edgeMap.hasOwnProperty(targetId)) continue;

      visGraph.edges.push({
        from: encodedId,
        to: targetId,
        label: edgeMap[targetId].length ? edgeMap[targetId].join(',\n') : 'reference',
        font: {
          align: edgeMap[targetId].length > 1 ? 'horizontal' : 'top',
        },
      });
    }
  }

  return visGraph;
}
