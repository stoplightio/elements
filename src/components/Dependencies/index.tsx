import { Classes, Icon } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';
import { Network, Options } from 'vis';

// @ts-ignore: For documentation, see https://visjs.github.io/vis-network/docs/network/
import { default as Graph } from 'react-graph-vis';

import { Button, Tooltip } from '@stoplight/ui-kit';
import { HostContext } from '../../containers/Provider';
import { useComponents } from '../../hooks/useComponents';
import { useComputeVisGraph } from '../../hooks/useComputeVisGraph';
import { useResolver } from '../../hooks/useResolver';
import { INodeInfo } from '../../types';
import { getNodeTitle, NodeTypePrettyName } from '../../utils/node';
import { Model } from '../Model';

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

const visGraphOptions: Options = {
  autoResize: true,
  layout: {
    hierarchical: {
      enabled: true,
      levelSeparation: 300,
      direction: 'LR',
      sortMethod: 'directed',
    },
  },
  physics: {
    enabled: false,
  },
  edges: {
    smooth: true,
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
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const visNetwork = React.useRef<Network>();

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

  React.useEffect(() => {
    setActiveNode(undefined);
  }, [node]);

  // Compute the VIS graph from the resolver graph
  const visGraph = useComputeVisGraph(node, graph, activeNode && activeNode.id);

  if (!graph) return null;

  if (!visGraph || !visGraph.nodes.length) {
    return (
      <div className={cn(className, 'Page__dependencies relative h-full', padding ? `p-${padding}` : '')}>
        This {NodeTypePrettyName[node.type]} does not have any outbound depdendencies.
      </div>
    );
  }

  return (
    <div
      className={cn(className, 'Page__dependencies', {
        'fixed inset-0 bg-white dark:bg-gray-7 z-50': isFullScreen,
        'relative h-full': !isFullScreen,
      })}
    >
      <Tooltip
        content={isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
        className={cn('absolute top-0 right-0 mx-8', {
          '-mt-10': !isFullScreen,
          'mt-8 z-10': isFullScreen,
        })}
      >
        <Button
          minimal
          small
          active
          icon={<Icon icon={isFullScreen ? 'minimize' : 'fullscreen'} iconSize={10} />}
          onClick={() => {
            setIsFullScreen(!isFullScreen);

            if (visNetwork.current) {
              visNetwork.current.fit();
            }
          }}
        />
      </Tooltip>

      <Graph
        id={node.srn.replace(/[^a-zA-Z]+/g, '-')}
        graph={visGraph}
        events={{
          click: onClickNode,
        }}
        getNetwork={(network: Network) => {
          visNetwork.current = network;
        }}
        options={visGraphOptions}
      />

      {activeNode && typeof activeNode.data === 'object' && (
        <div className={cn('absolute bottom-0 left-0 right-0', `px-${padding} pb-${padding}`)}>
          <Model
            className="bg-white border dark:border-darken-3 dark:bg-gray-7"
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
