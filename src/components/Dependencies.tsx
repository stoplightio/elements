import { Button } from '@blueprintjs/core';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { NodeType } from '@stoplight/types';
import { SimpleTab, SimpleTabList, SimpleTabPanel, SimpleTabs } from '@stoplight/ui-kit/SimpleTabs';
import * as React from 'react';
// @ts-ignore
import { Graph } from 'react-d3-graph';
import { useResolver } from '../hooks/useResolver';

const useGraphData = (result: any, focusedNodeId: string | null) => {
  return React.useMemo(() => {
    const graphData: any = {
      nodes: [],
      links: [],
    };

    if (result.graph) {
      graphData.nodes.push(
        ...Object.keys(result.graph.nodes).map(id => {
          const encodedId = encodeURI(id);

          return {
            id: encodedId,
            color: focusedNodeId === encodedId ? '#66b1e7' : '#d3d3d3',
          };
        }),
      );

      for (const source in result.graph.outgoingEdges) {
        if (!result.graph.outgoingEdges[source] || !result.graph.outgoingEdges[source].length) continue;

        graphData.links.push(
          ...result.graph.outgoingEdges[source].map((target: string) => ({
            source: encodeURI(source),
            target: encodeURI(target),
          })),
        );
      }
    }

    return graphData;
  }, [result, focusedNodeId]);
};

export const Dependencies: React.FunctionComponent<{ srn: string; data?: any; className?: string }> = ({
  srn,
  data,
  className,
}) => {
  const [focusedNodeId, setFocusedNodeId] = React.useState<string | null>('root');
  const result = useResolver(NodeType.Model, data || {});
  const graphData = useGraphData(result, focusedNodeId);

  if (!graphData.nodes.length) return null;

  let schema;
  if (focusedNodeId) {
    schema = result.graph.getNodeData(decodeURI(focusedNodeId));
  }

  return (
    <>
      <Graph
        id="test"
        data={graphData}
        onClickNode={(nodeId: string) => {
          setFocusedNodeId(nodeId === focusedNodeId ? null : nodeId);
        }}
        config={{
          directed: true,
          nodeHighlightBehavior: true,
          linkHighlightBehavior: true,

          height: 500,
          width: 600,

          link: {
            highlightColor: '#94c4e6',
          },

          node: {
            symbolType: 'square',

            highlightColor: '#94c4e6',
            highlightFontWeight: 'bold',

            labelProperty(node: { id: string }) {
              const decodedId = decodeURI(node.id);
              let title = decodedId;

              const nodeData = result.graph.getNodeData(decodedId);
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

              return title;
            },
          },
        }}
      />

      {typeof schema === 'object' && (
        <SimpleTabs className="bp3-elevation-2 fixed bottom-0 right-0 p-0 m-10" style={{ width: 500 }}>
          <SimpleTabList className="flex items-center">
            <SimpleTab>Schema</SimpleTab>

            <div className="flex-1"></div>

            <Button>Go to ref</Button>
          </SimpleTabList>

          <SimpleTabPanel>
            <JsonSchemaViewer className="p-4" schema={schema} maxRows={10} />
          </SimpleTabPanel>
        </SimpleTabs>
      )}
    </>
  );
};
