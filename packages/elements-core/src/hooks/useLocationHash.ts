import * as React from 'react';

export function useLocationHash() {
  const isBrowser = typeof window !== undefined;
  const [locationHash, setLocationHash] = React.useState(isBrowser && window.location.hash);

  React.useEffect(() => {
    if (!isBrowser) return;

    const hashChange = () => setLocationHash(window.location.hash);

    window.addEventListener('hashchange', hashChange, false);

    return () => window.removeEventListener('hashchange', hashChange);
  }, [isBrowser]);

  return locationHash;
}
