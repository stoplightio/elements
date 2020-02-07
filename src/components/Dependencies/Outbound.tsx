import { Icon } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';
import { Network, Options } from 'vis';

// @ts-ignore: For documentation, see https://visjs.github.io/vis-network/docs/network/
import { default as Graph } from 'react-graph-vis';

import { NodeType } from '@stoplight/types';
import { useParsedData } from '../../hooks';
import { useComputeVisGraph } from '../../hooks/useComputeVisGraph';
import { useNodeRaw } from '../../hooks/useNodesRaw';
import { IGraphNode, INodeGraph, INodeInfo } from '../../types';
import { NodeTypePrettyName } from '../../utils/node';
import { IModelProps, Model } from '../Model';
import { GoToRef } from './GoToRef';

export interface IOutboundDependencies {
  node: INodeInfo;
  graph: INodeGraph;

  className?: string;
  padding?: string;
}

const visOptions: Options = {
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

export const OutboundDependencies = React.forwardRef<Network, IOutboundDependencies>((props, visNetworkRef) => {
  const { className, node, padding, graph } = props;

  const [activeNode, setActiveNode] = React.useState<Pick<IGraphNode, 'groupNodeId' | 'name' | 'srn'> | undefined>();
  const visGraph = useComputeVisGraph(node, activeNode?.groupNodeId, graph);

  const onClickNode = React.useCallback(
    e => {
      const nodeId = e.nodes[0];
      if (!nodeId) return;

      if (activeNode && activeNode.groupNodeId === nodeId) {
        setActiveNode(undefined);
      } else if (node.id === nodeId) {
        setActiveNode({
          groupNodeId: node.id,
          name: node.name,
          srn: node.srn,
        });
      } else {
        const n = graph?.nodes?.find((nd: IGraphNode) => nd.groupNodeId === nodeId);
        if (!n) return;

        setActiveNode(n);
      }
    },
    [graph, activeNode],
  );

  React.useEffect(() => {
    setActiveNode(undefined);
  }, [node?.id]);

  if (!visGraph || !visGraph.nodes.length) {
    return <div>This {NodeTypePrettyName[node.type]} does not have any outbound depdendencies.</div>;
  }

  return (
    <div className={cn(className, 'w-full h-full')}>
      <Graph
        id={node.srn.replace(/[^a-zA-Z]+/g, '-')}
        graph={visGraph}
        events={{
          click: onClickNode,
        }}
        getNetwork={visNetworkRef}
        options={visOptions}
      />

      {activeNode && (
        <div className={cn('absolute bottom-0 left-0 right-0 max-w-4xl', `px-${padding} pb-${padding}`)}>
          <ModelContainer
            srn={activeNode.srn}
            name={activeNode.name}
            actions={
              <>
                <div className="ml-2">
                  <GoToRef title={name} srn={activeNode.srn} />
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
});

// This is basically a Model container. Not sure if we want to extract this out right now or not.
const ModelContainer = ({ srn, name, actions }: { srn: string; name: string; actions: IModelProps['actions'] }) => {
  const { data, isValidating } = useNodeRaw(srn, { deref: 'bundle' });
  const value = useParsedData(NodeType.Model, data);

  if (!value || isValidating) {
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
