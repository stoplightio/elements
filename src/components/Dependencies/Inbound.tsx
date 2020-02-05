import { decodePointerFragment } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import { Button, Icon, Tab, Tabs, Tooltip } from '@stoplight/ui-kit';
import cn from 'classnames';
import { findKey, groupBy, sortBy, toUpper } from 'lodash';
import * as React from 'react';
import { IGraphNode, INodeGraph, INodeInfo } from '../../types';
import { NodeTypeIcons } from '../../utils/node';
import { GoToRef } from './GoToRef';

export interface IOutboundDependencies {
  node: INodeInfo;
  graph: INodeGraph;

  className?: string;
  padding?: string;
}

export const InboundDependencies: React.FC<IOutboundDependencies> = ({ node, graph, className, padding }) => {
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
    <div className={cn(className)}>
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
              Models {nodesByType[NodeType.Model]?.length ? <>({nodesByType[NodeType.Model].length})</> : null}
            </div>
          }
          panel={<DependencyTable nodes={nodesByType[NodeType.Model]} />}
          panelClassName="w-full overflow-auto"
          disabled={!nodesByType[NodeType.Model]?.length}
        />

        <Tab
          id={NodeType.HttpService}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.HttpService]} iconSize={14} />
              APIs{' '}
              {nodesByType[NodeType.HttpService]?.length ? <>({nodesByType[NodeType.HttpService].length})</> : null}
            </div>
          }
          panel={<DependencyTable nodes={nodesByType[NodeType.HttpService]} />}
          panelClassName="w-full overflow-auto"
          disabled={!nodesByType[NodeType.HttpService]?.length}
        />

        <Tab
          id={NodeType.HttpOperation}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.HttpOperation]} iconSize={14} />
              HTTP Operations{' '}
              {nodesByType[NodeType.HttpOperation]?.length ? <>({nodesByType[NodeType.HttpOperation].length})</> : null}
            </div>
          }
          panel={<DependencyTable nodes={nodesByType[NodeType.HttpOperation]} />}
          panelClassName="w-full overflow-auto"
          disabled={!nodesByType[NodeType.HttpOperation]?.length}
        />

        <Tab
          id={NodeType.Article}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.Article]} iconSize={14} />
              Articles {nodesByType[NodeType.Article]?.length ? <>({nodesByType[NodeType.Article].length})</> : null}
            </div>
          }
          panel={<DependencyTable nodes={nodesByType[NodeType.Article]} />}
          panelClassName="w-full overflow-auto"
          disabled={!nodesByType[NodeType.Article]?.length}
        />
      </Tabs>
    </div>
  );
};

const DependencyTable = ({ nodes = [] }: { nodes?: IGraphNode[] }) => {
  return (
    <div className="w-full overflow-auto">
      {sortBy(nodes, 'uri').map((node, index) => {
        let subtitle = node.uri;
        if (node.type === NodeType.HttpOperation) {
          const parts = node.uri.split('/paths/')[1].split('/');
          const method = parts.slice(-1)[0];
          const path = parts.slice(0, parts.length);
          subtitle = `${toUpper(method)} ${decodePointerFragment(path.join('/'))}`;
        }

        return (
          <div
            key={index}
            className={cn('py-4', {
              'pt-2': index === 0,
              'pb-2': index === nodes.length - 1,
              'border-t dark:border-darken-3': index > 0,
            })}
          >
            <div className="flex items-center">
              <div className="font-medium">{node.name}</div>
              {node.version !== '0.0' && <div className="px-2 text-sm text-gray-6">v{node.version}</div>}
              <div className="flex-1"></div>
              <div className="text-sm text-gray-6">{node.projectName}</div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 text-sm truncate text-gray-6" title={subtitle}>
                {subtitle}
              </div>

              <Tooltip content="Go to Ref">
                <GoToRef srn={node.srn} group={node.groupSlug} title={node.name}>
                  <Button icon={<Icon icon="share" iconSize={12} />} small minimal />
                </GoToRef>
              </Tooltip>
            </div>
          </div>
        );
      })}
    </div>
  );
};
