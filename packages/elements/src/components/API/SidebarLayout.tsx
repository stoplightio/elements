import { Box, Flex, Heading } from '@stoplight/mosaic';
import * as React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { ServiceNode } from '../../utils/oas/types';
import { ParsedDocs } from '../Docs';
import { TableOfContents } from '../MosaicTableOfContents';
import { PoweredByLink } from '../PoweredByLink';
import { computeAPITree, findFirstNodeSlug } from './utils';

type SidebarLayoutProps = {
  serviceNode: ServiceNode;
};

const MAX_CONTENT_WIDTH = 1800;
const SIDEBAR_WIDTH = 300;

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ serviceNode }) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const tree = React.useMemo(() => computeAPITree(serviceNode), [serviceNode]);
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Scroll to top on page change
    scrollRef.current?.scrollTo(0, 0);
  }, [pathname]);

  const uriMap = React.useMemo(
    () =>
      serviceNode.children.reduce((prev, current) => {
        prev[current.uri] = current;
        return prev;
      }, {}),
    [serviceNode.children],
  );

  const hasOverview = !!serviceNode.data.description;
  const isRootPath = !pathname || pathname === '/';
  const node = isRootPath ? serviceNode : uriMap[pathname];
  if ((isRootPath && !hasOverview) || !node) {
    // Redirect to the first child if service node has no description or node doesn't exist
    const firstSlug = findFirstNodeSlug(tree);

    if (firstSlug) {
      return <Redirect to={firstSlug} />;
    }
  }

  return (
    <Flex className="sl-elements-api" pin h="full">
      <Flex
        direction="col"
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
        <Heading ml={4} mb={5} size={4}>
          {serviceNode.name}
        </Heading>
        <Flex flexGrow flexShrink overflowY="auto" direction="col">
          <TableOfContents tree={tree} activeId={pathname} Link={Link} />
        </Flex>
        <PoweredByLink source={serviceNode.name} pathname={pathname} packageType="elements" />
      </Flex>

      <Box ref={scrollRef} px={24} flex={1} overflowY="auto" overflowX="hidden" w="full">
        <Box style={{ maxWidth: `${MAX_CONTENT_WIDTH - SIDEBAR_WIDTH}px` }}>
          {node && (
            <Box as={ParsedDocs} pt={4} pb={8} key={pathname} uri={hasOverview ? pathname : undefined} node={node} />
          )}
        </Box>
      </Box>
    </Flex>
  );
};
