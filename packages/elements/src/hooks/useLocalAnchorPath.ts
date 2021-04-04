export function useLocalAnchorPath(id: string) {
  const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

  // indicates we're using HashRouter
  if (currentHash.startsWith('#/')) {
    // just grab the "path", make sure not to include a hash if there is already one on the current url
    const routePath = currentHash.split('#')[1];
    return `#${routePath}#${id}`;
  }

  return `#${id}`;
}
