import {
  DeprecatedBadge,
  Docs,
  ExportButtonProps,
  HttpMethodColors,
  ParsedDocs,
  TryItWithRequestSamples,
} from '@jpmorganchase/elemental-core';
import { ExtensionAddonRenderer } from '@jpmorganchase/elemental-core/components/Docs';
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
  hideTryIt?: boolean;
  hideExport?: boolean;
  hideServerInfo?: boolean;
  hideSecurityInfo?: boolean;
  exportProps?: ExportButtonProps;
  tryItCredentialsPolicy?: TryItCredentialsPolicy;
  tryItCorsProxy?: string;
  showPoweredByLink?: boolean;
  location: Location;
  renderExtensionAddon?: ExtensionAddonRenderer;
  hideInlineExamples?: boolean;
  tryItOutDefaultServer?: string;
};

// TODO Testing
const itemUriMatchesPathname = (itemUri: string, pathname: string) => itemUri === pathname;

const TryItContext = React.createContext<{
  hideTryIt?: boolean;
  hideInlineExamples?: boolean;
  tryItCredentialsPolicy?: TryItCredentialsPolicy;
  tryItOutDefaultServer?: string;
  corsProxy?: string;
}>({
  hideTryIt: false,
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
  hideTryIt,
  hideExport,
  hideSecurityInfo,
  hideServerInfo,
  exportProps,
  tryItCredentialsPolicy,
  tryItCorsProxy,
  renderExtensionAddon,
  showPoweredByLink = true,
  location,
  hideInlineExamples,
  tryItOutDefaultServer,
}) => {
  const { groups: operationGroups } = computeTagGroups<OperationNode>(serviceNode, NodeType.HttpOperation);
  const { groups: webhookGroups } = computeTagGroups<WebhookNode>(serviceNode, NodeType.HttpWebhook);

  return (
    <LocationContext.Provider value={{ location }}>
      <TryItContext.Provider
        value={{
          hideTryIt,
          tryItCredentialsPolicy,
          corsProxy: tryItCorsProxy,
          hideInlineExamples,
          tryItOutDefaultServer,
        }}
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
              tryItOutDefaultServer={tryItOutDefaultServer}
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
  const {
    location: { pathname },
  } = React.useContext(LocationContext);

  const onClick = React.useCallback(() => setIsExpanded(!isExpanded), [isExpanded]);

  const shouldExpand = React.useMemo(() => {
    return group.items.some(item => itemUriMatchesPathname(item.uri, pathname));
  }, [group, pathname]);

  React.useEffect(() => {
    if (shouldExpand) {
      setIsExpanded(true);
    }
  }, [shouldExpand]);

  return (
    <Box>
      <Flex
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
  const { pathname } = location;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const color = HttpMethodColors[item.data.method as HttpMethod] || 'gray';
  const isDeprecated = !!item.data.deprecated;
  const { hideTryIt, hideInlineExamples, tryItCredentialsPolicy, corsProxy, tryItOutDefaultServer } =
    React.useContext(TryItContext);

  const onClick = React.useCallback(() => {
    setIsExpanded(!isExpanded);
    if (window && window.location) {
      window.history.pushState(null, '', `#${item.uri}`);
    }
  }, [isExpanded, item]);

  React.useEffect(() => {
    if (itemUriMatchesPathname(item.uri, pathname)) {
      setIsExpanded(true);
      if (scrollRef?.current) {
        scrollRef?.current.scrollIntoView();
      }
    }
  }, [pathname, item]);

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
        {hideTryIt ? (
          <Box as={ParsedDocs} layoutOptions={{ noHeading: true, hideTryItPanel: true }} node={item} p={4} />
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
                  layoutOptions={{ noHeading: true, hideTryItPanel: true }}
                />
              </TabPanel>

              <TabPanel>
                <TryItWithRequestSamples
                  httpOperation={item.data}
                  hideInlineExamples={hideInlineExamples}
                  tryItCredentialsPolicy={tryItCredentialsPolicy}
                  tryItOutDefaultServer={tryItOutDefaultServer}
                  corsProxy={corsProxy}
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
