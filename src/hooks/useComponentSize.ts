import { throttle } from 'lodash';
import * as React from 'react';

function getSize(el: HTMLDivElement | null) {
  return el ? el.getBoundingClientRect() : new DOMRect();
}

export function useComponentSize(componentRef: React.MutableRefObject<HTMLDivElement | null>) {
  const [componentSize, setComponentSize] = React.useState<DOMRect>(getSize(null));

  React.useEffect(() => {
    if (!componentRef.current) {
      return;
    }

    const updateComponentSize = throttle(
      () => componentRef.current && setComponentSize(getSize(componentRef.current)),
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
  }, [componentRef]);

  return componentSize;
}
