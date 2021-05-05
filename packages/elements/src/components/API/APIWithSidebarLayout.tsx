import { Box, Flex, Heading } from '@stoplight/mosaic';
import * as React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { ServiceNode } from '../../utils/oas/types';
import { ParsedDocs } from '../Docs';
import { SidebarLayout } from '../Layout/SidebarLayout';
import { TableOfContents } from '../MosaicTableOfContents';
import { PoweredByLink } from '../PoweredByLink';
import { computeAPITree, findFirstNodeSlug } from './utils';

type SidebarLayoutProps = {
  serviceNode: ServiceNode;
};

export const APIWithSidebarLayout: React.FC<SidebarLayoutProps> = ({ serviceNode }) => {
  const tree = React.useMemo(() => computeAPITree(serviceNode), [serviceNode]);
  const { pathname } = useLocation();

  const hasOverview = !!serviceNode.data.description;
  const isRootPath = !pathname || pathname === '/';
  const node = isRootPath ? serviceNode : serviceNode.children.find(child => child.uri === pathname);
  if ((isRootPath && !hasOverview) || !node) {
    // Redirect to the first child if service node has no description or node doesn't exist
    const firstSlug = findFirstNodeSlug(tree);

    if (firstSlug) {
      return <Redirect to={firstSlug} />;
    }
  }

  const sidebar = (
    <>
      <Heading ml={4} mb={5} size={4}>
        {serviceNode.name}
      </Heading>
      <Flex flexGrow flexShrink overflowY="auto" direction="col">
        <TableOfContents tree={tree} activeId={pathname} Link={Link} />
      </Flex>
      <PoweredByLink source={serviceNode.name} pathname={pathname} packageType="elements" />
    </>
  );

  return (
    <SidebarLayout sidebar={sidebar}>
      {node && (
        <Box as={ParsedDocs} pt={4} pb={8} key={pathname} uri={hasOverview ? pathname : undefined} node={node} />
      )}
    </SidebarLayout>
  );
};
