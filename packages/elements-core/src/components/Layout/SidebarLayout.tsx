import { Box, Flex, InvertTheme } from '@stoplight/mosaic';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

type SidebarLayoutProps = {
  sidebar: React.ReactNode;
  maxContentWidth?: number;
  sidebarWidth?: number;
  children?: React.ReactNode;
  theme?: 'invert' | 'default';
};

export const MAX_CONTENT_WIDTH = 1800;
export const SIDEBAR_MIN_WIDTH = 300;
export const SIDEBAR_MAX_WIDTH = 1.5 * SIDEBAR_MIN_WIDTH;

export const SidebarLayout = React.forwardRef<HTMLDivElement, SidebarLayoutProps>(
  ({ sidebar, children, maxContentWidth = MAX_CONTENT_WIDTH, sidebarWidth = SIDEBAR_MIN_WIDTH, theme = 'default' }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const [sidebarRef, currentSidebarWidth, startResizing] = useResizer(sidebarWidth);
    const { pathname } = useLocation();

    React.useEffect(() => {
      // Scroll to top on page change
      scrollRef.current?.scrollTo(0, 0);
    }, [pathname]);

    const sidebarContent = (
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
          {sidebar}
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
    );

    return (
      <Flex ref={ref} className="sl-elements-api" pin h="full">
        {theme === 'invert' ? <InvertTheme>{sidebarContent}</InvertTheme> : sidebarContent}
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

export function useResizer(sidebarWidth: number): [SidebarRef, SidebarWidth, StartResizingFn] {
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
