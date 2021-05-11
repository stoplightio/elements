import { Box, Flex } from '@stoplight/mosaic';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

type SidebarLayoutProps = {
  sidebar: React.ReactNode;
  maxContentWidth?: number;
  sidebarWidth?: number;
};

const MAX_CONTENT_WIDTH = 1800;
const SIDEBAR_WIDTH = 300;

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  sidebar,
  children,
  maxContentWidth = MAX_CONTENT_WIDTH,
  sidebarWidth = SIDEBAR_WIDTH,
}) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Scroll to top on page change
    scrollRef.current?.scrollTo(0, 0);
  }, [pathname]);

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
          width: `calc((100% - ${maxContentWidth}px) / 2 + ${sidebarWidth}px)`,
          paddingLeft: `calc((100% - ${maxContentWidth}px) / 2)`,
          minWidth: `${sidebarWidth}px`,
        }}
      >
        {sidebar}
      </Flex>

      <Box ref={scrollRef} px={24} flex={1} overflowY="auto" overflowX="hidden" w="full">
        <Box style={{ maxWidth: `${maxContentWidth - sidebarWidth}px` }} pt={4} pb={8}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
