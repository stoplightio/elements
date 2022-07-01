import { Breakpoints, useBreakpoints } from '@stoplight/mosaic';
import { Ref } from 'react';

import { DocsProps } from '../components/Docs';

const getBreakpoints = (compact?: number | boolean): Breakpoints | undefined => {
  if (!compact) return undefined;

  if (typeof compact === 'number') {
    return [
      ['compact', compact],
      ['regular', Infinity],
    ];
  }

  return [['compact', Infinity]];
};

/**
 * Given layoutOptions, determines if the component is in compact mode
 */
export function useIsCompact(layoutOptions: DocsProps['layoutOptions']) {
  const { ref, breakpoint } = useBreakpoints(getBreakpoints(layoutOptions?.compact));

  return { ref: ref as Ref<HTMLDivElement>, isCompact: breakpoint === 'compact' };
}
