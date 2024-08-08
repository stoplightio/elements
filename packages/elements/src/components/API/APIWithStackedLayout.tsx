import {
  DeprecatedBadge,
  Docs,
  ExportButtonProps,
  HttpMethodColors,
  ParsedDocs,
  TryItWithRequestSamples,
} from '@stoplight/elements-core';
import { ExtensionAddonRenderer } from '@stoplight/elements-core/components/Docs';
import { Box, Flex, Heading, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from '@stoplight/mosaic';
import { HttpMethod, NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { OperationNode, ServiceNode, WebhookNode } from '../../utils/oas/types';
import { computeTagGroups, TagGroup } from './utils';

type TryItCredentialsPolicy = 'omit' | 'include' | 'same-origin';

interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key: string;
}

type StackedLayoutProps = {
  serviceNode: ServiceNode;
  hideTryItPanel?: boolean;
  hideTryIt?: boolean;
  hideSamples?: boolean;
  hideExport?: boolean;
  hideServerInfo?: boolean;
  hideSecurityInfo?: boolean;
  exportProps?: ExportButtonProps;
  tryItCredentialsPolicy?: TryItCredentialsPolicy;
  tryItCorsProxy?: string;
  showPoweredByLink?: boolean;
  location: Location;
  renderExtensionAddon?: ExtensionAddonRenderer;
};

const itemMatchesHash = (hash: string, item: OperationNode | WebhookNode) => {
  if (item.type === NodeType.HttpOperation) {
    return hash.substr(1) === `${item.data.path}-${item.data.method}`;
  } else {
    return hash.substr(1) === `${item.data.name}-${item.data.method}`;
  }
};

const TryItContext = React.createContext<{
  hideTryIt?: boolean;
  hideTryItPanel?: boolean;
  hideSamples?: boolean;
  tryItCredentialsPolicy?: TryItCredentialsPolicy;
  corsProxy?: string;
}>({
  hideTryIt: false,
  hideTryItPanel: false,
  hideSamples: false,
  tryItCredentialsPolicy: 'omit',
});
TryItContext.displayName = 'TryItContext';

const LocationContext = React.createContext<{
  location: Location;
}>({
  location: {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: '',
  },
});
LocationContext.displayName = 'LocationContext';

export const APIWithStackedLayout: React.FC<StackedLayoutProps> = ({
  serviceNode,
  hideTryItPanel,
  hideTryIt,
  hideSamples,
  hideExport,
  hideSecurityInfo,
  hideServerInfo,
  exportProps,
  tryItCredentialsPolicy,
  tryItCorsProxy,
  renderExtensionAddon,
  showPoweredByLink = true,
  location,
}) => {
  const { groups: operationGroups } = computeTagGroups<OperationNode>(serviceNode, NodeType.HttpOperation);
  const { groups: webhookGroups } = computeTagGroups<WebhookNode>(serviceNode, NodeType.HttpWebhook);

  return (
    <LocationContext.Provider value={{ location }}>
      <TryItContext.Provider
        value={{ hideTryItPanel, hideTryIt, hideSamples, tryItCredentialsPolicy, corsProxy: tryItCorsProxy }}
      >
        <Flex w="full" flexDirection="col" m="auto" className="sl-max-w-4xl">
          <Box w="full" borderB>
            <Docs
              className="sl-mx-auto"
              nodeData={serviceNode.data}
              nodeTitle={serviceNode.name}
              nodeType={NodeType.HttpService}
              location={location}
              layoutOptions={{ showPoweredByLink, hideExport, hideSecurityInfo, hideServerInfo }}
              exportProps={exportProps}
              tryItCredentialsPolicy={tryItCredentialsPolicy}
              renderExtensionAddon={renderExtensionAddon}
            />
          </Box>
          {operationGroups.length > 0 && webhookGroups.length > 0 ? <Heading size={2}>Endpoints</Heading> : null}
          {operationGroups.map(group => (
            <Group key={group.title} group={group} />
          ))}
          {webhookGroups.length > 0 ? <Heading size={2}>Webhooks</Heading> : null}
          {webhookGroups.map(group => (
            <Group key={group.title} group={group} />
          ))}
        </Flex>
      </TryItContext.Provider>
    </LocationContext.Provider>
  );
};
APIWithStackedLayout.displayName = 'APIWithStackedLayout';

const Group = React.memo<{ group: TagGroup<OperationNode | WebhookNode> }>(({ group }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const {
    location: { hash },
  } = React.useContext(LocationContext);
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
    <Box>
      <Flex
        ref={scrollRef}
        onClick={onClick}
        mx="auto"
        justifyContent="between"
        alignItems="center"
        borderB
        px={2}
        py={4}
        cursor="pointer"
        color={{ default: 'current', hover: 'muted' }}
      >
        <Box fontSize="lg" fontWeight="medium">
          {group.title}
        </Box>
        <Icon className="sl-mr-2" icon={isExpanded ? 'chevron-down' : 'chevron-right'} size="sm" />
      </Flex>

      <Collapse isOpen={isExpanded}>
        {group.items.map(item => {
          return <Item key={item.uri} item={item} />;
        })}
      </Collapse>
    </Box>
  );
});
Group.displayName = 'Group';

const Item = React.memo<{ item: OperationNode | WebhookNode }>(({ item }) => {
  const { location } = React.useContext(LocationContext);
  const { hash } = location;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const color = HttpMethodColors[item.data.method as HttpMethod] || 'gray';
  const isDeprecated = !!item.data.deprecated;
  const { hideTryIt, hideSamples, hideTryItPanel, tryItCredentialsPolicy, corsProxy } = React.useContext(TryItContext);

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
    <Box
      ref={scrollRef}
      w="full"
      my={2}
      border
      borderColor={{ default: isExpanded ? 'light' : 'transparent', hover: 'light' }}
      bg={{ default: isExpanded ? 'code' : 'transparent', hover: 'code' }}
    >
      <Flex mx="auto" alignItems="center" cursor="pointer" fontSize="lg" p={2} onClick={onClick} color="current">
        <Box
          w={24}
          textTransform="uppercase"
          textAlign="center"
          fontWeight="semibold"
          border
          rounded
          px={2}
          bg="canvas"
          className={cn(`sl-mr-5 sl-text-base`, `sl-text-${color}`, `sl-border-${color}`)}
        >
          {item.data.method || 'UNKNOWN'}
        </Box>

        <Box flex={1} fontWeight="medium" wordBreak="all">
          {item.type === NodeType.HttpOperation ? item.data.path : item.name}
        </Box>
        {isDeprecated && <DeprecatedBadge />}
      </Flex>

      <Collapse isOpen={isExpanded}>
        <Box flex={1} p={2} fontWeight="medium" mx="auto" fontSize="xl">
          {item.name}
        </Box>
        {hideTryItPanel ? (
          <Box
            as={ParsedDocs}
            layoutOptions={{ noHeading: true, hideTryItPanel: true, hideSamples, hideTryIt }}
            node={item}
            p={4}
          />
        ) : (
          <Tabs appearance="line">
            <TabList>
              <Tab>Docs</Tab>
              <Tab>TryIt</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ParsedDocs
                  className="sl-px-4"
                  node={item}
                  location={location}
                  layoutOptions={{ noHeading: true, hideTryItPanel: false, hideSamples, hideTryIt }}
                />
              </TabPanel>

              <TabPanel>
                <TryItWithRequestSamples
                  httpOperation={item.data}
                  tryItCredentialsPolicy={tryItCredentialsPolicy}
                  corsProxy={corsProxy}
                  hideSamples={hideSamples}
                  hideTryIt={hideTryIt}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Collapse>
    </Box>
  );
});
Item.displayName = 'Item';

const Collapse: React.FC<{ isOpen: boolean }> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return <Box>{children}</Box>;
};
Collapse.displayName = 'Collapse';
