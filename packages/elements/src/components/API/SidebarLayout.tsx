import { generateApiToC } from '@stoplight/elements-utils';
import { Box, Flex, Heading } from '@stoplight/mosaic';
import { NodeType } from '@stoplight/types';
import { TableOfContents } from '@stoplight/ui-kit';
import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { useTocContents } from '../../hooks/useTocContents';
import { ServiceNode } from '../../utils/oas/types';
import { ParsedDocs } from '../Docs';
import { Row } from '../TableOfContents/Row';

type SidebarLayoutProps = {
  serviceNode: ServiceNode;
};

const MAX_CONTENT_WIDTH = 1800;
const SIDEBAR_WIDTH = 300;

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ serviceNode }) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const uriMap = React.useMemo(
    () =>
      serviceNode.children.reduce((prev, current) => {
        prev[current.uri] = current;
        return prev;
      }, {}),
    [serviceNode.children],
  );
  const operationMap = React.useMemo(
    () =>
      serviceNode.children.reduce((prev, current) => {
        if (current.type === NodeType.HttpOperation) {
          prev[current.uri] = current.data.method;
        }

        return prev;
      }, {}),
    [serviceNode.children],
  );
  const tree = React.useMemo(() => generateApiToC([serviceNode, ...serviceNode.children], serviceNode.data), [
    serviceNode,
  ]);
  const contents = useTocContents(tree, operationMap).map(item => ({
    ...item,
    isActive: item.to === pathname,
    isSelected: item.to === pathname,
  }));

  const hasOverview = !!serviceNode.data.description;
  const isRootPath = !pathname || pathname === '/';
  const node = isRootPath ? serviceNode : uriMap[pathname];
  if ((isRootPath && !hasOverview) || !node) {
    // Redirect to the first child if service node has no description or node doesn't exist
    const item = contents.find(content => content.type === 'item');
    if (item && item.to) {
      return <Redirect to={item.to} />;
    }
  }

  return (
    <Flex className="sl-elements-api" pin h="full">
      <Box
        bg="canvas-100"
        borderR
        pt={5}
        pos="sticky"
        pinY
        overflowY="auto"
        style={{
          width: `calc((100% - ${MAX_CONTENT_WIDTH}px) / 2 + ${SIDEBAR_WIDTH}px)`,
          paddingLeft: `calc((100% - ${MAX_CONTENT_WIDTH}px) / 2)`,
          minWidth: `${SIDEBAR_WIDTH}px`,
        }}
      >
        <Heading ml={5} mb={5} size={4}>
          {serviceNode.name}
        </Heading>

        <TableOfContents contents={contents} rowComponent={Row} rowComponentExtraProps={{ pathname, scrollRef }} />
      </Box>

      <Box px={24} flex={1} overflowY="auto" overflowX="hidden" w="full">
        <Box ref={scrollRef} style={{ maxWidth: `${MAX_CONTENT_WIDTH - SIDEBAR_WIDTH}px` }}>
          {node && (
            <ParsedDocs
              className="sl-pt-16 sl-pb-24"
              key={pathname}
              uri={hasOverview ? pathname : undefined}
              node={node}
            />
          )}
        </Box>
      </Box>
    </Flex>
  );
};
