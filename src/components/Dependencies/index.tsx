import { Classes, Icon, Spinner } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';
import useSWR from 'swr';
import { Network, Options } from 'vis';

// @ts-ignore: For documentation, see https://visjs.github.io/vis-network/docs/network/
import { default as Graph } from 'react-graph-vis';

import { deserializeSrn, serializeSrn } from '@stoplight/path';
import { NodeType } from '@stoplight/types';
import { Button, Tooltip } from '@stoplight/ui-kit';
import { HostContext } from '../../containers/Provider';
import { useParsedData } from '../../hooks';
import { useComponents } from '../../hooks/useComponents';
import { useComputeVisGraph } from '../../hooks/useComputeVisGraph';
import { useNodeGraph } from '../../hooks/useNodeGraph';
import { IGraphNode, INodeInfo } from '../../types';
import { NodeTypePrettyName } from '../../utils/node';
import { IModelProps, Model } from '../Model';

export interface IDependencies {
  node: INodeInfo;

  className?: string;
  padding?: string;
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
    color: {
      color: '#cfd9e0',
      opacity: 0.8,
    },
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
  // Ideally this would be called from a container component, but that would require a breaking change. We could wait to refactor this component if we decided to add it in Studio.
  const { data: nodeGraph } = useNodeGraph(node.srn, { type: 'outbound' });

  const [activeNode, setActiveNode] = React.useState<IGraphNode | undefined>();
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const visNetwork = React.useRef<Network>();
  const visGraph = useComputeVisGraph(node.id, activeNode?.id, nodeGraph);

  let activeNodeSrn;
  if (activeNode) {
    activeNodeSrn = serializeSrn({
      ...deserializeSrn(node.srn),
      uri: activeNode.uri,
    });
  }

  const onClickNode = React.useCallback(
    e => {
      const nodeId = e.nodes[0];
      if (!nodeId) return;

      if (activeNode && activeNode.id === nodeId) {
        setActiveNode(undefined);
      } else {
        const n = nodeGraph?.nodes?.find((nd: IGraphNode) => nd.id === nodeId);
        if (!n) return;

        setActiveNode(n);
      }
    },
    [nodeGraph, activeNode],
  );

  React.useEffect(() => {
    setActiveNode(undefined);
  }, [node]);

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

      {activeNode && activeNodeSrn && (
        <div className={cn('absolute bottom-0 left-0 right-0 max-w-4xl', `px-${padding} pb-${padding}`)}>
          <ModelContainer
            srn={activeNodeSrn}
            name={activeNode.name}
            actions={
              <>
                <div className="ml-2">
                  <GoToRef title={name} srn={activeNodeSrn} />
                </div>

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

// This is basically a Model container. Not sure if we want to extract this out right now or not.
const ModelContainer = ({ srn, name, actions }: { srn: string; name: string; actions: IModelProps['actions'] }) => {
  const { data, isValidating } = useSWR<unknown>(`/nodes.raw?srn=${srn}`);
  const value = useParsedData(NodeType.Model, data);

  if (isValidating) {
    // Could probably show a loading spinner here instead of returning null
    return null;
  }

  return (
    <Model
      className="bg-white border dark:border-darken-3 dark:bg-gray-7"
      title={name}
      value={value}
      maxRows={10}
      actions={actions}
    />
  );
};

function GoToRef({ title, srn }: { title: string; srn: string }) {
  const host = React.useContext(HostContext);
  const components = useComponents();

  if (components.link) {
    return components.link(
      {
        node: {
          title,
          url: srn,
        },
        // @ts-ignore (CL): need to update the typing in MarkdownViewer to be ReactElement instead of ReactNode
        children: 'Go To Ref',
      },
      srn,
    );
  }

  return (
    <a className={cn('text-sm', Classes.TEXT_MUTED)} href={`${host}/nodes.raw?srn=${srn}`} target="_blank">
      Go To Ref
    </a>
  );
}
