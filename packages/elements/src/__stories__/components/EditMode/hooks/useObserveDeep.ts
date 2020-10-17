import * as React from 'react';
import * as Y from 'yjs';

/**
 * Use this hook to trigger a re-render when the Yjs object changes.
 * It doesn't return a value.
 *
 * @param {Y.Map} o
 */
export function useObserveDeep(o?: Y.Map<any>) {
  const [count, setCount] = React.useState(1);
  React.useEffect(() => {
    const increment = (e: Y.YEvent[], t: Y.Transaction) => {
      console.log('useObserveDeep');
      setCount(count + 1);
    };
    if (typeof o === 'undefined') return;
    o.observeDeep(increment);
    return () => o.unobserveDeep(increment);
  });
}
