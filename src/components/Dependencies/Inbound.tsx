import { decodePointerFragment } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import { Button, Icon, Tab, Tabs, Tooltip } from '@stoplight/ui-kit';
import { FixedSizeList } from '@stoplight/ui-kit/ScrollList';
import cn from 'classnames';
import { findKey, groupBy, sortBy, toUpper } from 'lodash';
import * as React from 'react';
import { IBranchNode, INodeEdge } from '../../types';
import { NodeTypeIcons } from '../../utils/node';
import { GoToRef } from './GoToRef';

export interface IOutboundDependencies {
  node: IBranchNode;
  edges: INodeEdge[];

  className?: string;
  padding?: string;
}

export const InboundDependencies: React.FC<IOutboundDependencies> = ({ node, edges, className, padding }) => {
  const edgesByNodeType = groupBy(edges, 'fromBranchNodeType');
  const firstTab = edges.length ? findKey(edgesByNodeType, nodes => nodes?.length) : undefined;
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
              Models {edgesByNodeType[NodeType.Model]?.length ? <>({edgesByNodeType[NodeType.Model].length})</> : null}
            </div>
          }
          panel={
            <DependencyTable
              className={`InboundDependencies__DependencyTable`}
              node={node}
              edges={edgesByNodeType[NodeType.Model]}
            />
          }
          panelClassName="w-full overflow-auto"
          disabled={!edgesByNodeType[NodeType.Model]?.length}
        />

        <Tab
          id={NodeType.HttpService}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.HttpService]} iconSize={14} />
              APIs{' '}
              {edgesByNodeType[NodeType.HttpService]?.length ? (
                <>({edgesByNodeType[NodeType.HttpService].length})</>
              ) : null}
            </div>
          }
          panel={
            <DependencyTable
              className={`InboundDependencies__DependencyTable`}
              node={node}
              edges={edgesByNodeType[NodeType.HttpService]}
            />
          }
          panelClassName="w-full overflow-auto"
          disabled={!edgesByNodeType[NodeType.HttpService]?.length}
        />

        <Tab
          id={NodeType.HttpOperation}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.HttpOperation]} iconSize={14} />
              HTTP Operations{' '}
              {edgesByNodeType[NodeType.HttpOperation]?.length ? (
                <>({edgesByNodeType[NodeType.HttpOperation].length})</>
              ) : null}
            </div>
          }
          panel={
            <DependencyTable
              className={`InboundDependencies__DependencyTable`}
              node={node}
              edges={edgesByNodeType[NodeType.HttpOperation]}
            />
          }
          panelClassName="w-full overflow-auto"
          disabled={!edgesByNodeType[NodeType.HttpOperation]?.length}
        />

        <Tab
          id={NodeType.Article}
          title={
            <div className="flex items-center">
              <Icon className="mr-2" icon={NodeTypeIcons[NodeType.Article]} iconSize={14} />
              Articles{' '}
              {edgesByNodeType[NodeType.Article]?.length ? <>({edgesByNodeType[NodeType.Article].length})</> : null}
            </div>
          }
          panel={
            <DependencyTable
              className={`InboundDependencies__DependencyTable`}
              node={node}
              edges={edgesByNodeType[NodeType.Article]}
            />
          }
          panelClassName="w-full overflow-auto"
          disabled={!edgesByNodeType[NodeType.Article]?.length}
        />
      </Tabs>
    </div>
  );
};

const DependencyTable = ({
  className,
  node,
  edges = [],
}: {
  node: IBranchNode;
  edges?: INodeEdge[];
  className?: string;
}) => {
  // TODO (CL): Handle no edges
  const listProps = {
    itemData: { edges: sortBy(edges, 'uri') },
    itemSize: 60,
    maxRows: 10,
    itemCount: edges.length,
    height: '100%',
    width: '100%',
  };

  return (
    <div className={cn('h-full', className)}>
      <FixedSizeList {...listProps}>
        {({ style, index, data }: { index: number; data: { edges: INodeEdge[] }; style: React.CSSProperties }) => {
          const edge = data.edges[index];

          let subtitle = edge.fromBranchNodeUri;
          if (edge.fromBranchNodeType === NodeType.HttpOperation) {
            const parts = edge.fromBranchNodeUri.split('/paths/')[1].split('/');
            const method = parts.slice(-1)[0];
            const path = parts.slice(0, parts.length);
            subtitle = `${toUpper(method)} ${decodePointerFragment(path.join('/'))}`;
          }

          return (
            <div key={index} style={style}>
              <GoToRef
                className="reset"
                title={edge.fromBranchNodeName}
                workspace={node.branch.project.workspace.slug}
                project={node.branch.project.slug}
                uri={edge.toBranchNodeUri}
                branch={node.branch.slug}
              >
                <div
                  className={cn('h-full flex flex-col justify-center px-4 hover:bg-gray-2 dark-hover:bg-lighten-3 ', {
                    'border-t dark:border-darken-3': index > 0,
                    'bg-gray-1 dark:bg-lighten-2': index % 2,
                  })}
                >
                  <div className="flex items-center">
                    <div className="font-medium">{edge.fromBranchNodeName}</div>
                    {/* {node.version !== '0.0' && <div className="px-2 text-sm text-gray-6">v{node.version}</div>} */}
                    <div className="flex-1"></div>
                    <div className="text-sm text-gray-6 opacity-75">{node.branch.project.slug}</div>
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
