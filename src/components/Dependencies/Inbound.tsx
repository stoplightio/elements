import { decodePointerFragment } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import { Button, Icon, Tab, Tabs, Tooltip } from '@stoplight/ui-kit';
import { FixedSizeList } from '@stoplight/ui-kit/ScrollList';
import cn from 'classnames';
import { findKey, groupBy, sortBy, toUpper } from 'lodash';
import * as React from 'react';

import { NodeTypeIcons, NodeTypePrettyName } from '../../constants';
import { ActiveInfoContext } from '../../containers/Provider';
import { INodeEdge } from '../../types';
import { GoToRef } from './GoToRef';

export interface IInboundDependencies {
  edges: INodeEdge[];

  className?: string;
}

export const InboundDependencies: React.FC<IInboundDependencies> = ({ edges, className }) => {
  const edgesByNodeType = groupBy(edges, 'fromBranchNodeType');
  const firstTab = edges.length ? findKey(edgesByNodeType, (nodes) => nodes?.length) : undefined;
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
        id="InboundDependencies"
        className="p-6 border rounded dark:border-darken-3"
        selectedTabId={selectedTabId ?? firstTab}
        onChange={onChangeTab}
        renderActiveTabPanelOnly
        vertical
      >
        <InboundDependencyTab type={NodeType.Model} edges={edgesByNodeType[NodeType.Model]} />
        <InboundDependencyTab type={NodeType.HttpService} edges={edgesByNodeType[NodeType.HttpService]} />
        <InboundDependencyTab type={NodeType.HttpOperation} edges={edgesByNodeType[NodeType.HttpOperation]} />
        <InboundDependencyTab type={NodeType.Article} edges={edgesByNodeType[NodeType.Article]} />
      </Tabs>
    </div>
  );
};

const InboundDependencyTab = ({ type, edges }: { type: NodeType; edges?: INodeEdge[] }) => {
  return (
    <Tab
      id={`InboundDependencyTab-${type}`}
      title={
        <div className="flex items-center">
          <Icon className="mr-2" icon={NodeTypeIcons[type]} iconSize={14} />
          {NodeTypePrettyName[type]}s {edges?.length ? <>({edges.length})</> : null}
        </div>
      }
      panel={<DependencyTable className={`InboundDependencies__DependencyTable`} edges={edges} />}
      panelClassName="w-full overflow-auto"
      disabled={!edges?.length}
    />
  );
};

const DependencyTable = ({ className, edges = [] }: { edges?: INodeEdge[]; className?: string }) => {
  const info = React.useContext(ActiveInfoContext);

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
              <GoToRef className="reset" uri={edge.toBranchNodeUri}>
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
                    <div className="text-sm opacity-75 text-gray-6">{info.project}</div>
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
