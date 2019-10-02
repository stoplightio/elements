import { Button } from '@blueprintjs/core';
import { IResolveResult } from '@stoplight/json-ref-resolver/types';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { NodeType } from '@stoplight/types';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import * as React from 'react';
// @ts-ignore
import { Graph } from 'react-d3-graph';
import { useResolver } from '../hooks/useResolver';

const useGraphData = (graph: any, focusedNodeId: string | null) => {
  return React.useMemo(() => {
    const graphData: any = {
      nodes: [],
      links: [],
    };

    if (graph) {
      graphData.nodes.push(
        ...Object.keys(graph.nodes).map(id => {
          const encodedId = encodeURI(id);

          return {
            id: encodedId,
            color: focusedNodeId === encodedId ? '#66b1e7' : '#d3d3d3',
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
};

export const Dependencies: React.FC<{ srn: string; data: any; className?: string }> = ({ srn, data, className }) => {
  const { graph } = useResolver(NodeType.Model, data || {});
  const [focusedNodeId, setFocusedNodeId] = React.useState<string | null>('root');
  const [focusedNodeSchema, setFocusedNodeSchema] = React.useState<object | null>();
  const graphData = useGraphData(graph, focusedNodeId);

  if (!graph || !graphData.nodes.length) return null;

  return (
    <>
      <Graph
        id="test"
        data={graphData}
        onClickNode={(nodeId: string) => {
          if (nodeId === focusedNodeId) {
            setFocusedNodeId(null);
            setFocusedNodeSchema(null);
          } else if (graph.hasNode(decodeURI(nodeId))) {
            setFocusedNodeId(nodeId);
            setFocusedNodeSchema(graph.getNodeData(decodeURI(nodeId)));
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

            // renderLabel: false,
            size: 200,

            // viewGenerator(node: any) {
            //   const decodedId = decodeURI(node.id);
            //   let title = decodedId;

            //   const nodeData = graph.getNodeData(decodedId);
            //   if (nodeData) {
            //     if (nodeData.title) {
            //       title = nodeData.title;
            //     } else if (/^#/.test(node.id)) {
            //       title = node.id;
            //     } else {
            //       const splitPath = decodedId.split('/');
            //       title = splitPath[splitPath.length - 1];
            //     }
            //   }

            //   return (
            //     <div className="bg-gray-3 border flex items-center justify-center">
            //       <div className="text-xs">{title}</div>
            //     </div>
            //   );
            // },

            labelProperty(node: { id: string }) {
              const decodedId = decodeURI(node.id);
              let title = decodedId;

              if (graph.hasNode(decodedId)) {
                const nodeData = graph.getNodeData(decodedId);
                if (nodeData) {
                  if (nodeData.title) {
                    title = nodeData.title;
                  } else if (/^#/.test(node.id)) {
                    title = node.id;
                  } else {
                    const splitPath = decodedId.split('/');
                    title = splitPath[splitPath.length - 1];
                  }
                }
              }

              return title;
            },
          },
        }}
      />

      {focusedNodeSchema && typeof focusedNodeSchema === 'object' && (
        <SimpleTabs className="bp3-elevation-2 fixed bottom-0 right-0 p-0 m-10" style={{ width: 500 }}>
          <SimpleTabList className="flex items-center">
            <SimpleTab>Schema</SimpleTab>

            <div className="flex-1"></div>

            <Button>Go to ref</Button>
          </SimpleTabList>

          <SimpleTabPanel>
            <JsonSchemaViewer className="p-4" schema={focusedNodeSchema} maxRows={10} />
          </SimpleTabPanel>
        </SimpleTabs>
      )}
    </>
  );
};
