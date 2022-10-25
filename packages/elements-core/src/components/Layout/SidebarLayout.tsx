import { Box, Flex } from '@stoplight/mosaic';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

type SidebarLayoutProps = {
  sidebar: React.ReactNode;
  maxContentWidth?: number;
  sidebarWidth?: number;
  children?: React.ReactNode;
};

const MAX_CONTENT_WIDTH = 1800;
const SIDEBAR_WIDTH = 300;
const SIDEBAR_MIN_WIDTH = 120;

export const SidebarLayout = React.forwardRef<HTMLDivElement, SidebarLayoutProps>(
  ({ sidebar, children, maxContentWidth = MAX_CONTENT_WIDTH, sidebarWidth = SIDEBAR_WIDTH }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const [sidebarRef, currentSidebarWidth, startResizing] = useResizer(sidebarWidth);
    const { pathname } = useLocation();

    React.useEffect(() => {
      // Scroll to top on page change
      scrollRef.current?.scrollTo(0, 0);
    }, [pathname]);

    return (
      <Flex ref={ref} className="sl-elements-api" pin h="full">
        <Flex
          ref={sidebarRef}
          direction="row"
          onMouseDown={(e: { preventDefault: () => void }) => e.preventDefault()}
          style={{ maxWidth: '50%' }}
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
            {sidebar}
          </Flex>
          <Flex className="sl-sidebar-resizer" resize="x" onMouseDown={startResizing} />
        </Flex>

        <Box ref={scrollRef} bg="canvas" px={24} flex={1} w="full" overflowY="auto">
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

function useResizer(sidebarWidth: number): [SidebarRef, SidebarWidth, StartResizingFn] {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [currentSidebarWidth, setCurrentSidebarWidth] = useState(sidebarWidth);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    mouseMoveEvent => {
      if (isResizing) {
        setCurrentSidebarWidth(mouseMoveEvent.clientX - sidebarRef.current!.getBoundingClientRect().left);
      }
    },
    [isResizing],
  );

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return [sidebarRef, currentSidebarWidth, startResizing];
}
