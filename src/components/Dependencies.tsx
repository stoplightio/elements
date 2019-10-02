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

export interface IDependencies {
  srn: string;
  data: any;
  name?: string;
  className?: string;
}

export const Dependencies: React.FC<IDependencies> = ({ className, name, srn, data }) => {
  const components = useComponents();
  const host = React.useContext(HostContext);
  const { graph, result } = useResolver(NodeType.Model, data || {});
  const [focusedNodeId, setFocusedNodeId] = React.useState<string | null>('root');
  const [focusedNodeSchema, setFocusedNodeSchema] = React.useState<object | null>();
  const graphData = useGraphData(graph, focusedNodeId);

  const onClickNode = React.useCallback(
    (nodeId: string) => {
      if (!graph) return;

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
    },
    [graph, focusedNodeId, setFocusedNodeId, setFocusedNodeSchema],
  );

  if (!graph || !graphData.nodes.length) return null;

  const decodedNodeId = decodeURI(focusedNodeId || '');

  let nodeTitle = '';
  if (focusedNodeId === 'root') {
    nodeTitle = name || getTitle(srn, result);
  } else if (decodedNodeId) {
    nodeTitle = getTitle(decodedNodeId, focusedNodeSchema);
  }

  return (
    <div className={cn(className, 'Page__dependencies relative flex')}>
      <Graph
        id={srn.replace(/[^a-zA-Z]+/g, '-')}
        data={graphData}
        onClickNode={onClickNode}
        config={{
          // For more information on the config: https://goodguydaniel.com/react-d3-graph/docs/index.html#config-global
          directed: true,
          nodeHighlightBehavior: true,
          linkHighlightBehavior: true,

          height: 500,
          width: focusedNodeSchema ? 500 : 1000,

          minZoom: 1.5,
          maxZoom: 1.5,
          focusZoom: 1.5,

          d3: {
            gravity: -100,
          },

          link: {
            highlightColor: '#94c4e6',
          },

          node: {
            symbolType: 'circle',

            highlightColor: '#94c4e6',
            highlightStrokeColor: '#94c4e6',
            highlightFontWeight: 'bold',

            labelProperty(node: { id: string }) {
              if (node.id === 'root') {
                return name || getTitle(srn, result);
              }

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
          className="absolute top-0 right-0 border dark:border-darken-3 bg-white dark:bg-gray-7"
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

          <JsonSchemaViewer className="border-t" schema={focusedNodeSchema} maxRows={20} />
        </div>
      )}
    </div>
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
