import React from 'react';

export function useFirstRender() {
  const ref = React.useRef(true);
  const firstRender = ref.current;
  ref.current = false;
  return firstRender;
}
