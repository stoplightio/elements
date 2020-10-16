import * as React from 'react';
import type { Awareness } from 'y-protocols/awareness';

/**
 * Use this hook to trigger a re-render when the Yjs Awareness changes.
 * It returns the awareness state.
 *
 * @param {Awareness} awareness
 * @param {(states: Map<number, { [x: string]: any }>) => void} callback
 */
export function useAwareness(awareness: Awareness, cb: (states: Map<number, { [x: string]: any }>) => void) {
  const onChange = () => {
    cb(awareness.getStates());
  };

  React.useEffect(() => {
    awareness.on('change', onChange);
    return () => awareness.off('change', onChange);
  });
}
