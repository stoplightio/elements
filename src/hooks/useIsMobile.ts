import * as React from 'react';

export const useIsMobile = (enableDrawer: boolean | number) => {
  const [isMobile, setIsMobile] = React.useState(checkMobile(enableDrawer));

  const updateLayout = React.useCallback(() => {
    setIsMobile(checkMobile(enableDrawer));
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', updateLayout);
    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, [updateLayout]);

  return isMobile;
};

export const checkMobile = (enableDrawer: boolean | number) => {
  if (enableDrawer === true) {
    enableDrawer = 768;
  } else if (enableDrawer === false) {
    return false;
  }

  return typeof window !== 'undefined' && window.innerWidth < enableDrawer;
};
