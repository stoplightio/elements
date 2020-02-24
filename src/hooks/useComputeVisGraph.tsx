import { pointerToPath } from '@stoplight/json';
import { IResolveResult } from '@stoplight/json-ref-resolver/types';
import { last, sortBy, uniqBy, uniqWith } from 'lodash';
import * as React from 'react';
import URI from 'urijs';
import { Edge, Node } from 'vis';
import { INodeInfo } from '../types';
import { getNodeTitle } from '../utils/node';

export interface IVisGraph {
  nodes: Node[];
  edges: Edge[];
}

export function useComputeVisGraph(
  rootNode: INodeInfo,
  graph?: IResolveResult['graph'],
  activeNodeId: string = 'root',
  maxDepth: number = 100,
) {
  return React.useMemo(() => {
    if (!graph) return;

    return computeVisGraph(rootNode, graph, activeNodeId, maxDepth);
  }, [graph, rootNode, activeNodeId, maxDepth]);
}

export function computeVisGraph(
  rootNode: INodeInfo,
  graph: IResolveResult['graph'],
  activeNodeId: string,
  maxDepth: number = 100,
) {
  if (!graph) return;

  const visGraph = buildVisGraphFromRefMap(rootNode.srn, 'root', graph, 0, activeNodeId, maxDepth);

  visGraph.nodes.push({
    id: 'root',
    level: 0,
    label: rootNode.name,
    color: '#ef932b',
    font: {
      color: '#ffffff',
    },
  });

  // Filter out any duplicate nodes, keeping the lowest level
  visGraph.nodes = uniqBy(sortBy(visGraph.nodes, ['level', 'label']), 'id');

  // Filter out any duplicate edges
  visGraph.edges = uniqWith(visGraph.edges, (edgeA, edgeB) => {
    return edgeA.to === edgeB.to && edgeA.from === edgeB.from;
  });

  return visGraph;
}

function buildVisGraphFromRefMap(
  rootNodeSrn: string,
  nodeId: string,
  graph: IResolveResult['graph'],
  level: number = 0,
  activeNodeId?: string,
  maxDepth: number = 100,
) {
  const visGraph: IVisGraph = {
    nodes: [],
    edges: [],
  };

  let node;
  try {
    node = graph.getNodeData(encodeURI(decodeURI(nodeId)));
  } catch (error) {
    return visGraph;
  }

  const isRootNode = isRootNodeSrn(nodeId, rootNodeSrn);

  if (level === maxDepth) return visGraph;

  if (!isRootNode) {
    let color = '#f5f8fa';
    if (activeNodeId === nodeId) {
      color = '#66b1e7';
    }

    visGraph.nodes.push({
      id: nodeId,
      level,
      label: getNodeTitle(nodeId, node.data),
      color,
      font: {
        color: activeNodeId === nodeId ? '#ffffff' : '#10161a',
      },
    });
  }

  const edgeMap = {};

  // Loop over the ref map to combine duplicate edges
  for (const propertyPath in node.refMap) {
    if (!node.refMap.hasOwnProperty(propertyPath)) continue;

    const propertyKey = String(last(pointerToPath(propertyPath)));
    // numbered properties are probably part of a combiner so just show "reference" instead
    const propertyName = isNaN(parseInt(propertyKey)) ? propertyKey : 'reference';

    const encodedRef = encodeURI(node.refMap[propertyPath]);

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

    let color = { color: '#cfd9e0', opacity: 0.8 };
    let label = '';
    if (activeNodeId === nodeId || activeNodeId === targetId) {
      color = { color: '#66b1e7', opacity: 1 };
      if (edgeMap[targetId].length > 1) {
        label = `${edgeMap[targetId][0]} + ${edgeMap[targetId].length - 1}`;
      } else if (edgeMap[targetId].length) {
        label = edgeMap[targetId][0];
      } else {
        label = 'reference';
      }
    }

    const result = buildVisGraphFromRefMap(rootNodeSrn, targetId, graph, level + 1, activeNodeId);
    visGraph.nodes = visGraph.nodes.concat(result.nodes);
    visGraph.edges = visGraph.edges.concat(result.edges);

    visGraph.edges.push({
      from: isRootNode ? 'root' : nodeId,
      to: isRootNodeSrn(targetId, rootNodeSrn) ? 'root' : targetId,
      label,
      title: edgeMap[targetId] && edgeMap[targetId].length ? edgeMap[targetId].join(',\n') : 'reference',
      color,
      font: {
        align: 'top',
      },
    });
  }

  return visGraph;
}

function isRootNodeSrn(id: string, rootNodeSrn: string) {
  if (!rootNodeSrn) return false;
  if (id === 'root') return true;
  try {
    const parsedQuery: { srn?: string } = URI.parseQuery(URI.parse(id).query || '');
    return parsedQuery.srn === rootNodeSrn;
  } catch {
    return false;
  }
}
