import { Classes, Icon } from '@blueprintjs/core';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

// @ts-ignore: For documentation, see https://visjs.github.io/vis-network/docs/network/
const Graph = require('react-graph-vis').default;

import { HostContext } from '../containers/Provider';
import { useComponents } from '../hooks/useComponents';
import { useComputeVisGraph } from '../hooks/useComputeVisGraph';
import { useResolver } from '../hooks/useResolver';
import { getNodeTitle } from '../utils/node';
import { Model } from './Model';

export interface IDependencies {
  srn: string;
  data: any;
  name?: string;
  className?: string;
  padding?: string;
}

interface IActiveNode {
  id: string;
  title: string;
  data: any;
}

export const Dependencies: React.FC<IDependencies> = ({ className, name, srn, data, padding }) => {
  const [activeNode, setActiveNode] = React.useState<IActiveNode | undefined>();
  const { graph, result } = useResolver(NodeType.Model, data || {});
  const rootTitle = name || getNodeTitle(srn, result);

  const onClickNode = React.useCallback(
    e => {
      if (!graph) return;

      const nodeId = e.nodes[0];
      if (!nodeId) return;

      if (activeNode && activeNode.id === nodeId) {
        setActiveNode(undefined);
      } else {
        const decodedNodeId = decodeURI(nodeId);
        const isRoot = nodeId === 'root';

        let nodeData;
        if (!isRoot && graph.hasNode(decodedNodeId)) {
          nodeData = graph.getNodeData(decodedNodeId).data;
        }

        setActiveNode({
          id: decodedNodeId,
          title: isRoot ? rootTitle : getNodeTitle(decodedNodeId, nodeData),
          data: isRoot ? result : nodeData,
        });
      }
    },
    [graph, activeNode, rootTitle],
  );

  // Compute the VIS graph from the resolver graph
  const visGraph = useComputeVisGraph(
    { id: 'root', label: rootTitle, color: '#ef932b', font: { color: '#ffffff' } },
    graph,
    activeNode && activeNode.id,
  );

  if (!graph || !visGraph.nodes.length) return null;

  return (
    <div className={cn(className, 'Page__dependencies relative h-full')}>
      <Graph
        id={srn.replace(/[^a-zA-Z]+/g, '-')}
        graph={visGraph}
        events={{
          click: onClickNode,
        }}
        options={graphOptions}
      />

      {activeNode && typeof activeNode.data === 'object' && (
        <div className={cn('absolute bottom-0 left-0 right-0', `px-${padding} pb-${padding}`)}>
          <Model
            className="border dark:border-darken-3 bg-white dark:bg-gray-7"
            title={activeNode.title}
            schema={activeNode.data}
            maxRows={10}
            actions={
              <>
                {activeNode.id !== 'root' && (
                  <div className="ml-2">
                    <GoToRef {...activeNode} />
                  </div>
                )}

                <Icon
                  className="ml-2 text-gray-5 cursor-pointer"
                  icon="small-cross"
                  onClick={() => setActiveNode(undefined)}
                />
              </>
            }
          />
        </div>
      )}
    </div>
  );
};

const graphOptions = {
  autoResize: true,
  physics: {
    stabilization: false,
    barnesHut: {
      springLength: 150,
      avoidOverlap: 0.5,
    },
  },
  edges: {
    color: '#738694',
    width: 3,
    font: {
      align: 'top',
      color: 'rgba(115, 134, 148, 0.6)',
      strokeWidth: 0,
    },

    arrowStrikethrough: false,
  },
  nodes: {
    shape: 'box',
    labelHighlightBold: false,
  },
};

function GoToRef({ title, id }: IActiveNode) {
  const host = React.useContext(HostContext);
  const components = useComponents();

  if (components.link) {
    return components.link(
      {
        node: {
          title,
          url: id.replace(`${host}/nodes.raw?srn=`, ''),
        },
        // @ts-ignore (CL): need to update the typing in MarkdownViewer to be ReactElement instead of ReactNode
        children: 'Go To Ref',
      },
      id,
    );
  }

  // TODO (CL): Replace relative/local refs with their export URL
  return (
    <a className={cn('text-sm', Classes.TEXT_MUTED)} href={id} target="_blank">
      Go To Ref
    </a>
  );
}
