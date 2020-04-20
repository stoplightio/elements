import { decodePointerFragment } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import { Button, Icon, Tab, Tabs, Tooltip } from '@stoplight/ui-kit';
import { FixedSizeList } from '@stoplight/ui-kit/ScrollList';
import cn from 'classnames';
import { findKey, groupBy, sortBy, toUpper } from 'lodash';
import * as React from 'react';

import { IGraphNode, INodeGraph, INodeInfo } from '../../types';
import { NodeTypeIcons, NodeTypePrettyName } from '../../utils/node';
import { GoToRef } from './GoToRef';

export interface IOutboundDependencies {
  node: INodeInfo;
  graph: INodeGraph;

  className?: string;
  padding?: string;
}

export const InboundDependencies: React.FC<IOutboundDependencies> = ({ graph, className, node }) => {
  const nodesByType = groupBy(graph.nodes, 'type');
  const firstTab = findKey(nodesByType, nodes => nodes?.length);
  const [selectedTabId, setSelectedTabId] = React.useState();

  const onChangeTab = React.useCallback(
    (newTabId, prevTabId, e) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedTabId(newTabId);
    },
    [setSelectedTabId],
  );

  return (
    <div className={cn(className, 'InboundDependencies')}>
      <Tabs
        className="p-6 border rounded dark:border-darken-3"
        id="InboundDependencies"
        selectedTabId={selectedTabId ?? firstTab}
        onChange={onChangeTab}
        renderActiveTabPanelOnly
        vertical
      >
        <Tab
          id={NodeType.Model}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.Model]} iconSize={14} />
              Models {nodesByType[NodeType.Model]?.length ? <>({nodesByType[NodeType.Model].length})</> : <>(0)</>}
            </div>
          }
          panel={
            nodesByType[NodeType.Model]?.length ? (
              <DependencyTable className={`InboundDependencies__DependencyTable`} nodes={nodesByType[NodeType.Model]} />
            ) : (
              <div>There are no models that depend on this {NodeTypePrettyName[node.type]}</div>
            )
          }
          panelClassName="w-full overflow-auto"
        />

        <Tab
          id={NodeType.HttpService}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.HttpService]} iconSize={14} />
              APIs{' '}
              {nodesByType[NodeType.HttpService]?.length ? <>({nodesByType[NodeType.HttpService].length})</> : <>(0)</>}
            </div>
          }
          panel={
            nodesByType[NodeType.HttpService]?.length ? (
              <DependencyTable
                className={`InboundDependencies__DependencyTable`}
                nodes={nodesByType[NodeType.HttpService]}
              />
            ) : (
              <div>There are no services that depend on this {NodeTypePrettyName[node.type]}</div>
            )
          }
          panelClassName="w-full overflow-auto"
        />

        <Tab
          id={NodeType.HttpOperation}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.HttpOperation]} iconSize={14} />
              Endpoints{' '}
              {nodesByType[NodeType.HttpOperation]?.length ? (
                <>({nodesByType[NodeType.HttpOperation].length})</>
              ) : (
                <>(0)</>
              )}
            </div>
          }
          panel={
            nodesByType[NodeType.HttpOperation]?.length ? (
              <DependencyTable
                className={`InboundDependencies__DependencyTable`}
                nodes={nodesByType[NodeType.HttpOperation]}
              />
            ) : (
              <div>There are no endpoints that depend on this {NodeTypePrettyName[node.type]}</div>
            )
          }
          panelClassName="w-full overflow-auto"
        />

        <Tab
          id={NodeType.Article}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.Article]} iconSize={14} />
              Articles{' '}
              {nodesByType[NodeType.Article]?.length ? <>({nodesByType[NodeType.Article].length})</> : <>(0)</>}
            </div>
          }
          panel={
            nodesByType[NodeType.Article]?.length ? (
              <DependencyTable
                className={`InboundDependencies__DependencyTable`}
                nodes={nodesByType[NodeType.Article]}
              />
            ) : (
              <div>There are no articles that depend on this {NodeTypePrettyName[node.type]}</div>
            )
          }
          panelClassName="w-full overflow-auto"
        />
      </Tabs>
    </div>
  );
};

const DependencyTable = ({ className, nodes = [] }: { nodes?: IGraphNode[]; className?: string }) => {
  const listProps = {
    itemData: { nodes: sortBy(nodes, 'uri') },
    itemSize: 60,
    maxRows: 10,
    itemCount: nodes.length,
    height: '100%',
    width: '100%',
  };

  return (
    <div className={cn('h-full', className)}>
      <FixedSizeList {...listProps}>
        {({ style, index, data }: { index: number; data: { nodes: IGraphNode[] }; style: React.CSSProperties }) => {
          const node = data.nodes[index];

          let subtitle = node.uri;
          if (node.type === NodeType.HttpOperation) {
            const parts = node.uri.split('/paths/')[1].split('/');
            const method = parts.slice(-1)[0];
            const path = parts.slice(0, parts.length);
            subtitle = `${toUpper(method)} ${decodePointerFragment(path.join('/'))}`;
          }

          return (
            <div key={index} style={style}>
              <GoToRef className="reset" srn={node.srn} group={node.groupSlug} title={node.name}>
                <div
                  className={cn('h-full flex flex-col justify-center px-4 hover:bg-gray-2 dark-hover:bg-lighten-3 ', {
                    'border-t dark:border-darken-3': index > 0,
                    'bg-gray-1 dark:bg-lighten-2': index % 2,
                  })}
                >
                  <div className="flex items-center">
                    <div className="font-medium">{node.name}</div>
                    {node.version !== '0.0' && <div className="px-2 text-sm text-gray-6">v{node.version}</div>}
                    <div className="flex-1"></div>
                    <div className="text-sm text-gray-6 opacity-75">{node.projectName}</div>
                  </div>

                  <div className="flex items-center opacity-75">
                    <div className="flex-1 text-sm truncate text-gray-6" title={subtitle}>
                      {subtitle}
                    </div>

                    <Tooltip content="Go to Ref">
                      <Button icon={<Icon icon="share" iconSize={12} />} small minimal />
                    </Tooltip>
                  </div>
                </div>
              </GoToRef>
            </div>
          );
        }}
      </FixedSizeList>
    </div>
  );
};
