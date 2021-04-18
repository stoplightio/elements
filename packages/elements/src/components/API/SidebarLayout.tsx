import { Box, Flex, Heading } from '@stoplight/mosaic';
import * as React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { computeServiceChildUriMap, ServiceChildNode, ServiceNode } from '../../utils/oas';
import { ParsedDocs } from '../Docs';
import { TableOfContents } from '../MosaicTableOfContents';
import { computeAPITree, findFirstNodeSlug } from './utils';

type SidebarLayoutProps = {
  serviceNode: ServiceNode;
  childNodes: ServiceChildNode[];
};

const MAX_CONTENT_WIDTH = 1800;
const SIDEBAR_WIDTH = 300;

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ serviceNode, childNodes }) => {
  const tree = React.useMemo(() => computeAPITree(serviceNode, childNodes), [serviceNode, childNodes]);
  const uriMap = React.useMemo(() => computeServiceChildUriMap(childNodes), [childNodes]);
  const { pathname } = useLocation();

  const hasOverview = !!serviceNode.data.description;
  const isOverview = !pathname || pathname === '/';
  const node = isOverview ? serviceNode : uriMap[pathname];

  if ((isOverview && !hasOverview) || !node) {
    // Redirect to the first child if service node has no description or node doesn't exist
    const firstSlug = findFirstNodeSlug(tree);

    if (firstSlug) {
      return <Redirect to={firstSlug} />;
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
        <Heading ml={4} mb={5} size={4}>
          {serviceNode.name}
        </Heading>

        <TableOfContents tree={tree} activeId={pathname} Link={Link} />
      </Box>

      <Box
        px={24}
        flex={1}
        overflowY="auto"
        style={{
          width: '100%',
          maxWidth: `${MAX_CONTENT_WIDTH - SIDEBAR_WIDTH}px`,
        }}
      >
        {node && (
          <ParsedDocs
            className="sl-pt-16 sl-pb-24"
            key={pathname}
            uri={hasOverview ? pathname : undefined}
            node={node}
          />
        )}
      </Box>
    </Flex>
  );
};
