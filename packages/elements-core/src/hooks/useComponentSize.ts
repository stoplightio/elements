import { throttle } from 'lodash';
import * as React from 'react';

function getSize(el: HTMLDivElement | null) {
  return el ? el.getBoundingClientRect() : new DOMRect();
}

export function useComponentSize(container: HTMLDivElement | null) {
  const [componentSize, setComponentSize] = React.useState<DOMRect>(getSize(null));

  React.useEffect(() => {
    if (!container) {
      return;
    }

    const updateComponentSize = throttle(() => container && setComponentSize(getSize(container)), 1000, {
      trailing: true,
    });

    updateComponentSize();

    window.addEventListener('resize', updateComponentSize);
    return () => {
      updateComponentSize.cancel();
      window.removeEventListener('resize', updateComponentSize);
    };
  }, [container]);

  return componentSize;
}
