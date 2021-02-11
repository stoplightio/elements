import { Group as GroupItem, isGroup, isItem, ITableOfContents, Item } from '@stoplight/elements-utils';
import { IHttpOperation, NodeType } from '@stoplight/types';
import { Collapse, Icon, Tab, Tabs } from '@stoplight/ui-kit';
import cn from 'classnames';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { HttpMethodColors } from '../../constants';
import { useParsedData } from '../../hooks/useParsedData';
import { getNodeType, IUriMap } from '../../utils/oas';
import { Docs, ParsedDocs } from '../Docs';
import { DeprecatedBadge } from '../Docs/HttpOperation/Badges';
import { TryIt } from '../TryIt';

type StackedLayoutProps = {
  uriMap: IUriMap;
  tree: ITableOfContents;
};

type ItemRowProps = {
  data: unknown;
  nodeType: NodeType;
  type: string;
  title: string;
};

const itemMatchesHash = (hash: string, item: Pick<ItemRowProps, 'title' | 'type'>) => {
  return hash.substr(1) === `${item.title}-${item.type}`;
};

export const StackedLayout: React.FC<StackedLayoutProps> = ({ uriMap, tree }) => {
  const groups = tree.items.filter(isGroup);

  return (
    <div className="w-full flex flex-col m-auto max-w-4xl">
      <div className="w-full border-b dark:border-gray-6">
        <Docs className="mx-auto" nodeData={uriMap['/'] as any} nodeType={NodeType.HttpService} />
      </div>
      {groups.map(group => (
        <Group key={group.title} group={group} uriMap={uriMap} />
      ))}
    </div>
  );
};

const Group: React.FC<{ group: GroupItem; uriMap: IUriMap }> = ({ group, uriMap }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { hash } = useLocation();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const urlHashMatches = hash.substr(1) === group.title;

  const onClick = React.useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  const mapItems = React.useCallback(
    (item: Item) => {
      const nodeData = uriMap[item.uri];
      const nodeType = getNodeType(item.uri);
      const type = nodeType === NodeType.HttpOperation ? (nodeData as IHttpOperation).method : 'model';
      const title = nodeType === NodeType.HttpOperation ? (nodeData as IHttpOperation).path : item.title;

      return {
        nodeData,
        nodeType,
        type,
        title,
        uri: item.uri,
      };
    },
    [uriMap],
  );

  const shouldExpand = React.useMemo(() => {
    return (
      urlHashMatches ||
      group.items
        .filter(isItem)
        .map(mapItems)
        .some(item => itemMatchesHash(hash, item))
    );
  }, [group, hash, urlHashMatches, mapItems]);

  React.useEffect(() => {
    if (shouldExpand) {
      setIsExpanded(true);
      if (urlHashMatches && scrollRef?.current?.offsetTop) {
        // scroll only if group is active
        window.scrollTo(0, scrollRef.current.offsetTop);
      }
    }
  }, [shouldExpand, urlHashMatches, group, hash]);

  return (
    <div>
      <div
        ref={scrollRef}
        onClick={onClick}
        className="mx-auto flex justify-between items-center border-b dark:border-gray-6 text-gray-7 dark:text-gray-7 hover:text-gray-6 px-2 py-4 cursor-pointer"
      >
        <div className="text-lg font-medium">{group.title}</div>
        <Icon className="mr-2" icon={isExpanded ? 'chevron-down' : 'chevron-right'} iconSize={14} />
      </div>

      <Collapse isOpen={isExpanded}>
        {group.items
          .filter(isItem)
          .map(mapItems)
          .map(({ nodeData, nodeType, type, title, uri }) => {
            return <ItemRow key={uri} data={nodeData} nodeType={nodeType} type={type} title={title} />;
          })}
      </Collapse>
    </div>
  );
};

type PanelTabId = 'docs' | 'tryit';

const ItemRow: React.FC<ItemRowProps> = ({ data, nodeType, type, title }) => {
  const parsedNode = useParsedData(nodeType, data);

  const { hash } = useLocation();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [tabId, setTabId] = React.useState<PanelTabId>('docs');
  const color = HttpMethodColors[type] || 'gray';
  const isDeprecated = parsedNode?.type === 'http_operation' ? !!parsedNode.data.deprecated : false;

  const onClick = React.useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  React.useEffect(() => {
    if (itemMatchesHash(hash, { title, type })) {
      setIsExpanded(true);
      if (scrollRef?.current?.offsetTop) {
        window.scrollTo(0, scrollRef.current.offsetTop);
      }
    }
  }, [hash, title, type]);

  return (
    <div
      ref={scrollRef}
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
        {isDeprecated && <DeprecatedBadge />}
      </div>

      {parsedNode && (
        <Collapse isOpen={isExpanded}>
          {parsedNode?.type === 'http_operation' ? (
            <Tabs
              className="PreviewTabs mx-auto"
              selectedTabId={tabId}
              onChange={(tabId: PanelTabId) => setTabId(tabId)}
              renderActiveTabPanelOnly
            >
              <Tab id="docs" title="Docs" className="p-4" panel={<ParsedDocs node={parsedNode} headless />} />
              <Tab id="tryit" title="Try It" className="p-4" panel={<TryIt httpOperation={parsedNode.data} />} />
            </Tabs>
          ) : (
            <ParsedDocs className="mx-auto p-4" node={parsedNode} headless />
          )}
        </Collapse>
      )}
    </div>
  );
};
