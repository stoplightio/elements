import { IHttpOperation, NodeType } from '@stoplight/types';
import { Collapse, Icon, Tab, Tabs } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';

import { HttpMethodColors } from '../../constants';
import { Group as GroupItem, ITableOfContentsTree, TableOfContentItem } from '../../types';
import { getNodeType, IUriMap } from '../../utils/oas';
import { Docs } from '../Docs';
import { TryIt } from '../TryIt';

type StackedLayoutProps = {
  uriMap: IUriMap;
  tree: ITableOfContentsTree;
};

type ItemRowProps = {
  data: unknown;
  nodeType: NodeType;
  type: string;
  title: string;
};

export const StackedLayout: React.FC<StackedLayoutProps> = ({ uriMap, tree }) => {
  const groups = tree.items.filter(item => item.type === 'group') as GroupItem[];

  return (
    <div className="w-full flex flex-col m-auto max-w-4xl">
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
    <div>
      <div
        onClick={onClick}
        className="mx-auto flex justify-between items-center border-b dark:border-gray-6 text-gray-7 dark:text-gray-7 hover:text-gray-6 px-2 py-4 cursor-pointer"
      >
        <div className="text-lg font-medium">{group.title}</div>
        <Icon className="mr-2" icon={isExpanded ? 'chevron-down' : 'chevron-right'} iconSize={14} />
      </div>

      <Collapse isOpen={isExpanded}>
        {group.items
          .filter(item => item.type === 'item')
          .sort(sortNodes)
          .map(item => {
            if (item.type !== 'item') return;
            const nodeData = uriMap[item.uri];
            const nodeType = getNodeType(item.uri);

            return (
              <ItemRow
                key={item.uri}
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
    <div
      className={cn('w-full my-2 border border-transparent hover:border-gray-2 hover:bg-darken-1', {
        'border-gray-2 bg-darken-1': isExpanded,
      })}
    >
      <div
        onClick={onClick}
        className="mx-auto flex items-center text-gray-7 dark:text-gray-3 hover:text-gray-8 p-2 cursor-pointer text-lg"
      >
        <div
          className={cn(
            `w-24 uppercase mr-5 text-center text-base font-semibold border rounded px-2 bg-white`,
            `text-${color}`,
            `border-${color}`,
          )}
        >
          {type || 'UNKNOWN'}
        </div>

        <div className="flex-1 font-medium break-all">{title}</div>
      </div>

      <Collapse isOpen={isExpanded}>
        {showTabs ? (
          <Tabs
            className="PreviewTabs mx-auto"
            selectedTabId={tabId}
            onChange={(tabId: PanelTabId) => setTabId(tabId)}
            renderActiveTabPanelOnly
          >
            <Tab id="docs" title="Docs" className="p-4" panel={<Docs nodeType={nodeType} nodeData={data} headless />} />
            <Tab id="tryit" title="Try It" className="p-4" panel={<TryIt nodeType={nodeType} nodeData={data} />} />
          </Tabs>
        ) : (
          <Docs className="mx-auto p-4" nodeType={nodeType} nodeData={data} headless />
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
