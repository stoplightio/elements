import { Classes, Icon } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';

// @ts-ignore: For documentation, see https://visjs.github.io/vis-network/docs/network/
import { default as Graph } from 'react-graph-vis';

import { ProgressBar } from '@stoplight/ui-kit';
import { HostContext } from '../../containers/Provider';
import { useComponents } from '../../hooks/useComponents';
import { useComputeVisGraph } from '../../hooks/useComputeVisGraph';
import { useResolver } from '../../hooks/useResolver';
import { INodeInfo } from '../../types';
import { getNodeTitle, NodeTypePrettyName } from '../../utils/node';
import { Model } from '../Model';

import 'vis-network/dist/vis-network.css';

export interface IDependencies {
  node: INodeInfo;

  className?: string;
  padding?: string;
}

interface IActiveNode {
  id: string;
  title: string;
  data: any;
}

const visGraphOptions = {
  autoResize: true,
  physics: {
    stabilization: {
      iterations: 10000,
      updateInterval: 50,
    },
    timestep: 0.1,
    adaptiveTimestep: true,
    barnesHut: {
      gravitationalConstant: -5000,
      centralGravity: 0.3,
      springLength: 150,
      springConstant: 0.001,
      damping: 0.2,
      avoidOverlap: 0,
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

export const Dependencies: React.FC<IDependencies> = ({ className, node, padding }) => {
  const { graph } = useResolver(node.type, node.data || {});
  const [activeNode, setActiveNode] = React.useState<IActiveNode | undefined>();
  const [isStable, setIsStable] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

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
        if (graph.hasNode(decodedNodeId)) {
          nodeData = graph.getNodeData(decodedNodeId).data;
        }

        setActiveNode({
          id: decodedNodeId,
          title: isRoot && node.name ? node.name : getNodeTitle(decodedNodeId, nodeData),
          data: nodeData,
        });
      }
    },
    [graph, node.name, activeNode],
  );

  // Compute the VIS graph from the resolver graph
  const visGraph = useComputeVisGraph(graph, node.name, activeNode ? activeNode.id : 'root');

  if (!graph) return null;

  if (visGraph && !visGraph.nodes.length) {
    return (
      <div className={cn(className, 'Page__dependencies relative h-full', padding ? `p-${padding}` : '')}>
        This {NodeTypePrettyName[node.type]} does not have any outbound depdendencies.
      </div>
    );
  }

  return (
    <div className={cn(className, 'Page__dependencies relative h-full')}>
      {isLoading && (
        <div className="absolute inset-0 bg-lighten-9 flex items-center justify-center z-20">
          <ProgressBar value={isStable} />
        </div>
      )}
      <Graph
        id={node.srn.replace(/[^a-zA-Z]+/g, '-')}
        graph={visGraph}
        events={{
          click: onClickNode,
          stabilizationProgress: (data: any) => {
            setIsStable(data.iterations);
          },
          stabilized: (data: any) => {
            setIsLoading(false);
          },
        }}
        options={visGraphOptions}
      />

      {activeNode && typeof activeNode.data === 'object' && (
        <div className={cn('absolute bottom-0 left-0 right-0', `px-${padding} pb-${padding}`)}>
          <Model
            className="border dark:border-darken-3 bg-white dark:bg-gray-7"
            title={activeNode.title}
            value={activeNode.data}
            maxRows={10}
            actions={
              <>
                {activeNode.id !== 'root' && (
                  <div className="ml-2">
                    <GoToRef {...activeNode} />
                  </div>
                )}

                <Icon
                  className="ml-2 cursor-pointer text-gray-5 hover:text-gray-6"
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
