import { ServiceNode } from '@stoplight/elements/utils/oas/types';
import {
  Logo,
  PoweredByLink,
  TableOfContents,
  TableOfContentsItem,
  useResponsiveLayout,
} from '@stoplight/elements-core';
import { Box, Flex, Heading } from '@stoplight/mosaic';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MobileTopNav } from './MobileTopNav';

type ResponsiveSidebarLayoutProps = {
  maxContentWidth?: number;
  sidebarWidth?: number;
  children?: React.ReactNode;
  serviceNode: ServiceNode;
  logo?: string;
  tree?: TableOfContentsItem[];
  onTocClick?(): void;
};

const MAX_CONTENT_WIDTH = 1800;
const SIDEBAR_MIN_WIDTH = 300;
const SIDEBAR_MAX_WIDTH = 1.5 * SIDEBAR_MIN_WIDTH;

export const ResponsiveSidebarLayout = React.forwardRef<HTMLDivElement, ResponsiveSidebarLayoutProps>(
  (
    {
      children,
      serviceNode,
      logo,
      tree,
      onTocClick,
      maxContentWidth = MAX_CONTENT_WIDTH,
      sidebarWidth = SIDEBAR_MIN_WIDTH,
    },
    ref,
  ) => {
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const [sidebarRef, currentSidebarWidth, startResizing] = useResizer(sidebarWidth);
    const { pathname } = useLocation();

    React.useEffect(() => {
      // Scroll to top on page change
      scrollRef.current?.scrollTo(0, 0);
    }, [pathname]);

    const { isResponsiveLayoutEnabled } = useResponsiveLayout();

    return (
      <Flex ref={ref} className="sl-elements-api" pin h="full">
        {!isResponsiveLayoutEnabled ? (
          <Flex
            ref={sidebarRef}
            onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
            style={{ maxWidth: `${SIDEBAR_MAX_WIDTH}px` }}
          >
            <Flex
              direction="col"
              bg="canvas-100"
              borderR
              pt={8}
              pos="sticky"
              pinY
              overflowY="auto"
              style={{
                paddingLeft: `calc((100% - ${maxContentWidth}px) / 2)`,
                width: `${currentSidebarWidth}px`,
                minWidth: `${SIDEBAR_MIN_WIDTH}px`,
              }}
            >
              <Sidebar serviceNode={serviceNode} logo={logo} tree={tree!} pathname={pathname} onTocClick={onTocClick} />
            </Flex>
            <Flex
              justifySelf="end"
              flexGrow={0}
              flexShrink={0}
              resize="x"
              onMouseDown={startResizing}
              style={{ width: '1em', flexBasis: '6px', cursor: 'ew-resize' }}
            />
          </Flex>
        ) : (
          <MobileTopNav onTocClick={onTocClick!} logo={logo!} tree={tree!} pathname={pathname} node={serviceNode} />
        )}

        <Box ref={scrollRef} bg="canvas" px={!isResponsiveLayoutEnabled ? 24 : 6} flex={1} w="full" overflowY="auto">
          <Box style={{ maxWidth: `${maxContentWidth - currentSidebarWidth}px` }} py={16}>
            {children}
          </Box>
        </Box>
      </Flex>
    );
  },
);

type SidebarRef = React.Ref<HTMLDivElement>;
type SidebarWidth = number;
type StartResizingFn = () => void;

export const Sidebar = ({
  serviceNode,
  logo,
  tree,
  pathname,
  onTocClick,
}: {
  serviceNode: ServiceNode;
  logo?: string;
  tree: TableOfContentsItem[];
  pathname: string;
  onTocClick?(): void;
}) => {
  return (
    <>
      <Flex ml={4} mb={5} alignItems="center">
        {logo ? (
          <Logo logo={{ url: logo, altText: 'logo' }} />
        ) : (
          serviceNode.data.logo && <Logo logo={serviceNode.data.logo} />
        )}
        <Heading size={4}>{serviceNode.name}</Heading>
      </Flex>
      <Flex flexGrow flexShrink overflowY="auto" direction="col">
        <TableOfContents tree={tree} activeId={pathname} Link={Link} onLinkClick={onTocClick} />
      </Flex>
      <PoweredByLink source={serviceNode.name} pathname={pathname} packageType="elements" />
    </>
  );
};

function useResizer(sidebarWidth: number): [SidebarRef, SidebarWidth, StartResizingFn] {
  const sidebarRef = React.useRef<HTMLDivElement | null>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [currentSidebarWidth, setCurrentSidebarWidth] = React.useState(sidebarWidth);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    mouseMoveEvent => {
      if (isResizing) {
        const value = mouseMoveEvent.clientX - sidebarRef.current!.getBoundingClientRect().left;
        setCurrentSidebarWidth(Math.min(Math.max(SIDEBAR_MIN_WIDTH, value), SIDEBAR_MAX_WIDTH));
      }
    },
    [isResizing],
  );

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing, { passive: true });
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return [sidebarRef, currentSidebarWidth, startResizing];
}
