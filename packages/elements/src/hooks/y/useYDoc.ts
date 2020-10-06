import * as React from 'react';

import { YDoc } from '../../YAST/YDoc';

/**
 * Use this hook to trigger a re-render when the Yjs document is finished syncing and is ready.
 * It doesn't return a value.
 *
 */
export function useYDoc(doc: YDoc) {
  const [count, setCount] = React.useState(1);
  React.useEffect(() => {
    console.log('doc', doc);
    doc.ready.then(() => {
      console.log('hey ready');
      setCount(count + 1);
    });
  });
}
