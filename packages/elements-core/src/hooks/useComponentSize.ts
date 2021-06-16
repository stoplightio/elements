import { throttle } from 'lodash';
import * as React from 'react';

export function useComponentSize(container: HTMLDivElement | null): {
  readonly width: number;
  readonly height: number;
} {
  const [componentSize, setComponentSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!container) {
      return;
    }

    const updateComponentSize = throttle(
      () => (container ? setComponentSize(container.getBoundingClientRect()) : { width: 0, height: 0 }),
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
  }, [container]);

  return componentSize;
}
