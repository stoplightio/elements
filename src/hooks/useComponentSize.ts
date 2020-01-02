import { throttle } from 'lodash';
import * as React from 'react';

export function useComponentSize(componentRef: React.MutableRefObject<HTMLDivElement | null>) {
  const [componentSize, setComponentSize] = React.useState<DOMRect>(new DOMRect());

  React.useEffect(() => {
    const updateComponentSize = throttle(
      () => componentRef.current && setComponentSize(componentRef.current.getBoundingClientRect()),
      1000,
      {
        trailing: true,
      },
    );

    updateComponentSize();

    window.addEventListener('resize', updateComponentSize);
    return () => {
      updateComponentSize.cancel();
      window.removeEventListener('resize', updateComponentSize);
    };
  }, [componentRef.current]);

  return componentSize;
}
