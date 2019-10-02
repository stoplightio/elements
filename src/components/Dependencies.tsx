import { Classes, Icon } from '@blueprintjs/core';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
// @ts-ignore
import { Graph } from 'react-d3-graph';

import { HostContext } from '../containers/Provider';
import { useComponents } from '../hooks/useComponents';
import { useResolver } from '../hooks/useResolver';

export const Dependencies: React.FC<{ srn: string; data: any; className?: string }> = ({ srn, data, className }) => {
  const components = useComponents();
  const host = React.useContext(HostContext);
  const { graph, result } = useResolver(NodeType.Model, data || {});
  const [focusedNodeId, setFocusedNodeId] = React.useState<string | null>('root');
  const [focusedNodeSchema, setFocusedNodeSchema] = React.useState<object | null>();
  const graphData = useGraphData(graph, focusedNodeId);

  if (!graph || !graphData.nodes.length) return null;

  const decodedNodeId = decodeURI(focusedNodeId || '');
  const nodeTitle = getTitle(decodedNodeId, focusedNodeSchema);

  return (
    <>
      <Graph
        id="test"
        data={graphData}
        onClickNode={(nodeId: string) => {
          if (nodeId === focusedNodeId) {
            setFocusedNodeId(null);
            setFocusedNodeSchema(null);
          } else {
            setFocusedNodeId(nodeId);

            if (nodeId === 'root') {
              setFocusedNodeSchema(result);
            } else if (graph.hasNode(decodeURI(nodeId))) {
              setFocusedNodeSchema(graph.getNodeData(decodeURI(nodeId)));
            }
          }
        }}
        config={{
          directed: true,
          nodeHighlightBehavior: true,
          linkHighlightBehavior: true,

          height: 500,
          width: 1000,

          link: {
            highlightColor: '#94c4e6',
          },

          node: {
            symbolType: 'square',

            highlightColor: '#94c4e6',
            highlightStrokeColor: '#94c4e6',
            highlightFontWeight: 'bold',

            labelProperty(node: { id: string }) {
              const decodedId = decodeURI(node.id);

              let nodeData;
              if (graph.hasNode(decodedId)) {
                nodeData = graph.getNodeData(decodedId);
              }

              return getTitle(decodedId, nodeData);
            },
          },
        }}
      />

      {focusedNodeSchema && typeof focusedNodeSchema === 'object' && (
        <div
          className="fixed bottom-0 right-0 border dark:border-darken-3 bg-white dark:bg-gray-7 m-10"
          style={{ width: 500 }}
        >
          <div className="flex items-center p-2" style={{ height: 30 }}>
            <Icon icon="cube" color="#ef932b" iconSize={14} />

            <div className={cn(Classes.TEXT_MUTED, 'px-2')} style={{ fontSize: 12 }}>
              {nodeTitle}
            </div>

            <div className="flex-1"></div>

            {components.link ? (
              components.link(
                {
                  node: {
                    title: nodeTitle,
                    url: decodedNodeId.replace(host, ''),
                  },
                  // @ts-ignore
                  children: 'Go To Ref',
                },
                focusedNodeId,
              )
            ) : (
              <a className={cn('text-sm', Classes.TEXT_MUTED)} href={decodedNodeId} target="_blank">
                Go To Ref
              </a>
            )}

            <Icon
              className="ml-2 text-gray-5 cursor-pointer"
              icon="small-cross"
              onClick={() => {
                setFocusedNodeId(null);
                setFocusedNodeSchema(null);
              }}
            />
          </div>

          <JsonSchemaViewer className="border-t" schema={focusedNodeSchema} maxRows={10} />
        </div>
      )}
    </>
  );
};

function getTitle(id: string, data?: any) {
  let title = id;

  if (data) {
    if (data.title) {
      title = data.title;
    } else {
      const splitPath = id.split('/');
      title = capitalize(splitPath[splitPath.length - 1]);
    }
  }

  return title;
}

function useGraphData(graph: any, focusedNodeId: string | null) {
  return React.useMemo(() => {
    const graphData: any = {
      nodes: [],
      links: [],
    };

    if (graph) {
      graphData.nodes.push(
        ...Object.keys(graph.nodes).map(id => {
          const encodedId = encodeURI(id);

          let color = '#d3d3d3';
          if (id === 'root') {
            color = '#ef932b';
          } else if (focusedNodeId === encodedId) {
            color = '#66b1e7';
          }

          return {
            id: encodedId,
            color,
          };
        }),
      );

      for (const source in graph.outgoingEdges) {
        if (!graph.outgoingEdges[source] || !graph.outgoingEdges[source].length) continue;

        graphData.links.push(
          ...graph.outgoingEdges[source].map((target: string) => ({
            source: encodeURI(source),
            target: encodeURI(target),
          })),
        );
      }
    }

    return graphData;
  }, [graph, focusedNodeId]);
}
