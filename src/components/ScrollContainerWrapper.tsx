import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import * as React from 'react';

export const ScrollContainerWrapper: React.FC<{
  id: string;
  scrollInnerContainer?: boolean;
  shadows?: boolean;
}> = ({ id, scrollInnerContainer, shadows = false, children }) => {
  const [scrollbarInstance, setScrollbarInstance] = React.useState();

  React.useEffect(() => {
    if (scrollbarInstance) {
      scrollbarInstance.scrollToTop();
    }
  }, [scrollbarInstance, id]);

  if (!scrollInnerContainer) {
    return <>{children}</>;
  }

  return (
    <ScrollContainer ref={ref => setScrollbarInstance(ref)} shadows={shadows}>
      {children}
    </ScrollContainer>
  );
};
