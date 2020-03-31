import { throttle } from 'lodash';
import * as React from 'react';

function getSize(el: HTMLDivElement | null) {
  return el ? el.getBoundingClientRect() : new DOMRect();
}

export function useComponentSize(componentRef: React.MutableRefObject<HTMLDivElement | null>) {
  const currentComponentNode = componentRef.current;
  const [componentSize, setComponentSize] = React.useState<DOMRect>(getSize(currentComponentNode));

  React.useLayoutEffect(() => {
    if (!currentComponentNode) {
      return;
    }

    const updateComponentSize = throttle(
      () => currentComponentNode && setComponentSize(getSize(currentComponentNode)),
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
  }, [currentComponentNode]);

  return componentSize;
}
