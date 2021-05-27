import { DeprecatedBadge, Docs, HttpMethodColors, ParsedDocs, TryItWithRequestSamples } from '@stoplight/elements-core';
import { Box, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from '@stoplight/mosaic';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { OperationNode, ServiceNode } from '../../utils/oas/types';
import { computeTagGroups, TagGroup } from './utils';

type StackedLayoutProps = {
  serviceNode: ServiceNode;
  hideTryIt?: boolean;
};

const itemMatchesHash = (hash: string, item: OperationNode) => {
  return hash.substr(1) === `${item.name}-${item.data.method}`;
};

const TryItContext = React.createContext<{ hideTryIt?: boolean }>({ hideTryIt: false });
TryItContext.displayName = 'TryItContext';

export const APIWithStackedLayout: React.FC<StackedLayoutProps> = ({ serviceNode, hideTryIt }) => {
  const location = useLocation();
  const { groups } = computeTagGroups(serviceNode);

  return (
    <TryItContext.Provider value={{ hideTryIt }}>
      <div className="w-full flex flex-col m-auto max-w-4xl">
        <div className="w-full border-b dark:border-gray-6">
          <Docs
            className="mx-auto"
            nodeData={serviceNode.data}
            nodeTitle={serviceNode.name}
            nodeType={NodeType.HttpService}
            headless
            location={location}
          />
        </div>

        {groups.map(group => (
          <Group key={group.title} group={group} />
        ))}
      </div>
    </TryItContext.Provider>
  );
};

const Group = React.memo<{ group: TagGroup }>(({ group }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { hash } = useLocation();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const urlHashMatches = hash.substr(1) === group.title;

  const onClick = React.useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  const shouldExpand = React.useMemo(() => {
    return urlHashMatches || group.items.some(item => itemMatchesHash(hash, item));
  }, [group, hash, urlHashMatches]);

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
        <Icon className="mr-2" icon={isExpanded ? 'chevron-down' : 'chevron-right'} size="sm" />
      </div>

      <Collapse isOpen={isExpanded}>
        {group.items.map(item => {
          return <Item key={item.uri} item={item} />;
        })}
      </Collapse>
    </div>
  );
});

const Item = React.memo<{ item: OperationNode }>(({ item }) => {
  const location = useLocation();
  const { hash } = location;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const color = HttpMethodColors[item.data.method] || 'gray';
  const isDeprecated = !!item.data.deprecated;
  const { hideTryIt } = React.useContext(TryItContext);

  const onClick = React.useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  React.useEffect(() => {
    if (itemMatchesHash(hash, item)) {
      setIsExpanded(true);
      if (scrollRef?.current?.offsetTop) {
        window.scrollTo(0, scrollRef.current.offsetTop);
      }
    }
  }, [hash, item]);

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
          {item.data.method || 'UNKNOWN'}
        </div>

        <div className="flex-1 font-medium break-all">{item.name}</div>
        {isDeprecated && <DeprecatedBadge />}
      </div>

      <Collapse isOpen={isExpanded}>
        {hideTryIt ? (
          <Box as={ParsedDocs} node={item} headless p={4} />
        ) : (
          <Tabs appearance="line">
            <TabList>
              <Tab>Docs</Tab>
              <Tab>TryIt</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ParsedDocs node={item} headless location={location} />
              </TabPanel>
              <TabPanel>
                <TryItWithRequestSamples httpOperation={item.data} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Collapse>
    </div>
  );
});

const Collapse: React.FC<{ isOpen: boolean }> = ({ isOpen, children }) => {
  return <Box style={{ display: isOpen ? 'block' : 'none' }}>{children}</Box>;
};
