import * as React from 'react';

export const useIsMobile = (enableMobile: boolean | number) => {
  const [isMobile, setIsMobile] = React.useState(checkMobile(enableMobile));

  const updateLayout = React.useCallback(() => {
    setIsMobile(checkMobile(enableMobile));
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', updateLayout);
    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, [updateLayout]);

  return isMobile;
};

export const checkMobile = (enableMobile: boolean | number) => {
  if (enableMobile === true) {
    enableMobile = 768;
  } else if (enableMobile === false) {
    return false;
  }
  return typeof window !== 'undefined' && window.innerWidth < enableMobile;
};
