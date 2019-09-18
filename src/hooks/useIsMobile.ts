import * as React from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(checkMobile());

  const updateLayout = React.useCallback(() => {
    setIsMobile(checkMobile());
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', updateLayout);
    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, [updateLayout]);

  return isMobile;
};

export const checkMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;
