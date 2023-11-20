import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import type { ServiceNode } from '@stoplight/elements';
import type { TableOfContentsItem } from '@stoplight/elements-core';
import { Box, Button, Drawer, Flex, Icon } from '@stoplight/mosaic';
import * as React from 'react';

import { Sidebar } from './ResponsiveSidebarLayout';

export const MobileTopNav = ({
  node,
  logo,
  tree,
  pathname,
  onTocClick,
}: {
  node: ServiceNode;
  logo: string;
  tree: TableOfContentsItem[];
  pathname: string;
  onTocClick(): void;
}): JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

  const handleTocClick = () => {
    onTocClick();
    setIsSidebarOpen(false);
  };
  return (
    <Flex
      className="TopNav--mosaic"
      alignItems="center"
      h="3xl"
      pl={4}
      pr={4}
      bg="canvas"
      borderB
      pos="fixed"
      w="full"
      zIndex={20}
    >
      <Flex data-test="mobile-top-nav" w="full" alignItems="center" justifyContent="between">
        <Button data-test="show-left-sidebar-btn" onPress={() => setIsSidebarOpen(true)} appearance="minimal">
          <Icon size="lg" icon={faBars} />
        </Button>
        <NavHeading heading={node.name} />
      </Flex>

      <Drawer isOpen={isSidebarOpen} position="left">
        <Flex justifyContent="end">
          <Button
            className="sl-mr-4 sl-mt-2"
            onPress={() => setIsSidebarOpen(false)}
            appearance="minimal"
            justifySelf="end"
          >
            <Icon size="lg" icon={faX} />
          </Button>
        </Flex>
        <Sidebar logo={logo} serviceNode={node} tree={tree} pathname={pathname} onTocClick={() => handleTocClick()} />
      </Drawer>
    </Flex>
  );
};

const NavHeading = ({ heading }: { heading?: string }): JSX.Element => (
  <Flex flex={1} data-test="mobile-project-top-nav" style={{ minWidth: 0 }}>
    <Box
      fontSize="xl"
      fontWeight="semibold"
      whitespace="nowrap"
      textOverflow="overflow-ellipsis"
      overflowX="hidden"
      overflowY="hidden"
      w="full"
      textAlign="center"
    >
      {heading}
    </Box>
  </Flex>
);
