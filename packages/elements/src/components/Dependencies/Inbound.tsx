import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { decodePointerFragment } from '@stoplight/json';
import { NodeType } from '@stoplight/types';
import { Tab, Tabs } from '@stoplight/ui-kit';
import { FixedSizeList } from '@stoplight/ui-kit/ScrollList';
import cn from 'classnames';
import { findKey, groupBy, sortBy, toUpper, uniqBy } from 'lodash';
import * as React from 'react';

import { NodeTypeIconDefs, NodeTypePrettyName } from '../../constants';
import { ActiveInfoContext } from '../../containers/Provider';
import { INodeEdge } from '../../types';
import { NodeDialog } from './NodeDialog';

export interface IInboundDependencies {
  edges: INodeEdge[];
  nodeType: NodeType;

  className?: string;
}

export const InboundDependencies = React.memo<IInboundDependencies>(({ edges, nodeType, className }) => {
  const edgesByNodeType = groupBy(uniqBy(edges, 'fromBranchNodeId'), 'fromBranchNodeType');
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
        id="InboundDependencies-tabs"
        className="border rounded dark:border-darken-3"
        selectedTabId={selectedTabId ?? `InboundDependencies-${firstTab}`}
        onChange={onChangeTab}
        renderActiveTabPanelOnly
        vertical
      >
        <Tab
          id={`InboundDependencies-${NodeType.Model}`}
          title={
            <div className="flex items-center">
              <FontAwesomeIcon className="mr-2 fa-fw" icon={NodeTypeIconDefs[NodeType.Model].iconName} />
              {NodeTypePrettyName[NodeType.Model]}s ({edgesByNodeType[NodeType.Model]?.length || 0})
            </div>
          }
          panel={
            edgesByNodeType[NodeType.Model]?.length ? (
              <DependencyTable
                className={`InboundDependencies__DependencyTable`}
                edges={edgesByNodeType[NodeType.Model]}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                There are no {NodeTypePrettyName[NodeType.Model]}s that depend on this {NodeTypePrettyName[nodeType]}
              </div>
            )
          }
          panelClassName="w-full"
        />

        <Tab
          id={`InboundDependencies-${NodeType.HttpService}`}
          title={
            <div className="flex items-center">
              <FontAwesomeIcon className="mr-2 fa-fw" icon={NodeTypeIconDefs[NodeType.HttpService]} />
              {NodeTypePrettyName[NodeType.HttpService]}s ({edgesByNodeType[NodeType.HttpService]?.length || 0})
            </div>
          }
          panel={
            edgesByNodeType[NodeType.HttpService]?.length ? (
              <DependencyTable
                className={`InboundDependencies__DependencyTable`}
                edges={edgesByNodeType[NodeType.HttpService]}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                There are no {NodeTypePrettyName[NodeType.HttpService]}s that depend on this{' '}
                {NodeTypePrettyName[nodeType]}
              </div>
            )
          }
          panelClassName="w-full"
        />

        <Tab
          id={`InboundDependencies-${NodeType.HttpOperation}`}
          title={
            <div className="flex items-center">
              <FontAwesomeIcon className="mr-2 fa-fw" icon={NodeTypeIconDefs[NodeType.HttpOperation]} />
              {NodeTypePrettyName[NodeType.HttpOperation]}s ({edgesByNodeType[NodeType.HttpOperation]?.length || 0})
            </div>
          }
          panel={
            edgesByNodeType[NodeType.HttpOperation]?.length ? (
              <DependencyTable
                className={`InboundDependencies__DependencyTable`}
                edges={edgesByNodeType[NodeType.HttpOperation]}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                There are no {NodeTypePrettyName[NodeType.HttpOperation]}s that depend on this{' '}
                {NodeTypePrettyName[nodeType]}
              </div>
            )
          }
          panelClassName="w-full"
        />

        <Tab
          id={`InboundDependencies-${NodeType.Article}`}
          title={
            <div className="flex items-center">
              <FontAwesomeIcon className="mr-2 fa-fw" icon={NodeTypeIconDefs[NodeType.Article]} />
              {NodeTypePrettyName[NodeType.Article]}s ({edgesByNodeType[NodeType.Article]?.length || 0})
            </div>
          }
          panel={
            edgesByNodeType[NodeType.Article]?.length ? (
              <DependencyTable
                className={`InboundDependencies__DependencyTable`}
                edges={edgesByNodeType[NodeType.Article]}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                There are no {NodeTypePrettyName[NodeType.Article]}s that depend on this {NodeTypePrettyName[nodeType]}
              </div>
            )
          }
          panelClassName="w-full"
        />
      </Tabs>
    </div>
  );
});

const DependencyTable = ({ className, edges = [] }: { edges?: INodeEdge[]; className?: string }) => {
  const info = React.useContext(ActiveInfoContext);
  const [activeNode, setActiveNode] = React.useState<INodeEdge | undefined>();

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
              <div
                className={cn(
                  'relative h-full flex flex-col justify-center px-4 hover:bg-gray-2 dark-hover:bg-lighten-3 cursor-pointer',
                  {
                    'border-t dark:border-darken-3': index > 0,
                    'bg-gray-1 dark:bg-lighten-2': index % 2,
                  },
                )}
                onClick={() => setActiveNode(edge)}
              >
                <div className="flex items-center">
                  <div className="font-medium">{edge.fromBranchNodeName}</div>
                  {edge.fromBranchNodeVersion !== '0.0' && (
                    <div className="px-2 text-sm text-gray-6">v{edge.fromBranchNodeVersion}</div>
                  )}
                  <div className="flex-1"></div>
                  <div className="text-sm opacity-75 text-gray-6">{info.project}</div>
                </div>

                <div className="flex items-center opacity-75">
                  <div className="flex-1 text-sm truncate text-gray-6" title={subtitle}>
                    {subtitle}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </FixedSizeList>

      <NodeDialog direction="from" edge={activeNode} onClose={() => setActiveNode(undefined)} />
    </div>
  );
};
