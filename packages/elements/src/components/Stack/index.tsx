import { IHttpOperation, NodeType } from '@stoplight/types';
import { Collapse, Icon, Tab, Tabs } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { HttpMethodColors } from '../../constants';
import { Group as GroupItem, ITableOfContentsTree, TableOfContentItem } from '../../types';
import { getNodeType, IUriMap } from '../../utils/oas';
import { Docs } from '../Docs';
import { TryIt } from '../TryIt';

type StackLayoutProps = {
  uriMap: IUriMap;
  tree: ITableOfContentsTree;
};

type ItemRowProps = {
  data: unknown;
  nodeType: NodeType;
  type: string;
  title: string;
};

export const StackLayout: React.FC<StackLayoutProps> = ({ uriMap, tree }) => {
  const groups = tree.items.filter(item => item.type === 'group') as GroupItem[];

  return (
    <div className="w-full flex flex-col">
      <div className="w-full border-b dark:border-gray-6">
        <Docs className="mx-auto" nodeData={uriMap['/']} nodeType={NodeType.HttpService} />
      </div>
      {groups.map(group => (
        <Group key={group.title} group={group} uriMap={uriMap} />
      ))}
    </div>
  );
};

const Group: React.FC<{ group: GroupItem; uriMap: IUriMap }> = ({ group, uriMap }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const onClick = React.useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  return (
    <div className="mt-6">
      <div
        onClick={onClick}
        className="mx-auto max-w-6xl flex justify-between border-b dark:border-gray-6 text-gray-5 dark:text-gray-5 hover:text-gray-6 pb-3 cursor-pointer"
      >
        <h1 className="flex items-center">
          <Icon className="mr-2" icon="tag" iconSize={14} />
          <span className="text-lg">{group.title}</span>
        </h1>
        <Icon className="mr-2" icon={isExpanded ? 'chevron-down' : 'chevron-right'} iconSize={14} />
      </div>
      <Collapse className="mt-6" isOpen={isExpanded} keepChildrenMounted>
        {group.items
          .filter(item => item.type === 'item')
          .sort(sortNodes)
          .map(item => {
            if (item.type !== 'item') return;
            const nodeData = uriMap[item.uri];
            const nodeType = getNodeType(item.uri);

            return (
              <ItemRow
                key={item.title}
                data={nodeData}
                nodeType={nodeType}
                type={nodeType === NodeType.HttpOperation ? (nodeData as IHttpOperation).method : 'model'}
                title={nodeType === NodeType.HttpOperation ? (nodeData as IHttpOperation).path : item.title}
              />
            );
          })}
      </Collapse>
    </div>
  );
};

type PanelTabId = 'docs' | 'tryit';

const ItemRow: React.FC<ItemRowProps> = ({ data, nodeType, type, title }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [tabId, setTabId] = React.useState<PanelTabId>('docs');
  const color = HttpMethodColors[type] || 'gray';
  const showTabs = nodeType === NodeType.HttpOperation;

  const onClick = React.useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  return (
    <div className="w-full">
      <h2
        onClick={onClick}
        className="mx-auto max-w-6xl flex items-center text-gray-5 dark:text-gray-3 hover:text-gray-6  mt-10 cursor-pointer"
      >
        <div className={cn(`uppercase mr-5 font-semibold border rounded px-2`, `text-${color}`, `border-${color}`)}>
          {type || 'UNKNOWN'}
        </div>

        <div className="flex-1 font-medium break-all">{title}</div>
      </h2>
      <Collapse isOpen={isExpanded} keepChildrenMounted>
        {showTabs ? (
          <Tabs
            className="PreviewTabs mx-auto max-w-6xl mb-6"
            selectedTabId={tabId}
            onChange={(tabId: PanelTabId) => setTabId(tabId)}
            renderActiveTabPanelOnly
          >
            <Tab
              id="docs"
              title="Docs"
              className="pt-10"
              panel={<Docs nodeType={nodeType} nodeData={data} headless />}
            />
            <Tab id="tryit" title="Try It" className="pt-10" panel={<TryIt nodeType={nodeType} nodeData={data} />} />
          </Tabs>
        ) : (
          <Docs className="mx-auto max-w-6xl pt-10" nodeType={nodeType} nodeData={data} headless />
        )}
      </Collapse>
    </div>
  );
};

function sortNodes(a: TableOfContentItem, b: TableOfContentItem) {
  if (a.type !== 'item' || b.type !== 'item') return 0;
  const typeA = getNodeType(a.uri);
  const typeB = getNodeType(b.uri);
  return typeA === NodeType.Model && typeB === NodeType.HttpOperation ? 1 : -1;
}
