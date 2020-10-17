import * as React from 'react';

import type { YDoc } from '../../Y/YDoc';

/**
 * Use this hook to trigger a re-render when the Yjs document is finished syncing and is ready.
 * It doesn't return a value.
 *
 */
export function useYDoc(doc: YDoc) {
  const [count, setCount] = React.useState(1);
  React.useEffect(() => {
    let cancel = false;
    if (count === 1) {
      doc.ready.then(() => {
        if (cancel) return;
        console.log('doc.ready');
        setCount(count + 1);
      });
    }
    return () => {
      cancel = true;
    };
  });
}
