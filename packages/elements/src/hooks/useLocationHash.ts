export function useLocationHash() {
  const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

  // indicates we're using HashRouter
  if (currentHash.startsWith('#/')) {
    const routeParts = currentHash.split('#');

    // In this case, only have a location hash if there is a 2nd segment e.g. #/page/path#hash
    if (routeParts[2]) {
      return currentHash.slice(1);
    }

    return '';
  }

  return currentHash.slice(1);
}
