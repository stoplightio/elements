import * as React from 'react';
import { parsePath, useLocation, useNavigate } from 'react-router-dom';

type HashRouterSyncProps = {
  /** The `basename` the surrounding `HashRouter` was created with. */
  basePath?: string;
};

/**
 * Keeps a `HashRouter` in step with hash changes that are announced only by a `hashchange` event.
 *
 * React Router v6's hash history listens to `popstate` only. Browsers fire `popstate` for a real fragment
 * navigation, but `history.pushState()` fires nothing. Host frameworks that intercept link clicks, such as
 * VitePress, update the URL with `pushState()` and then dispatch a `hashchange` event. The router never sees
 * that change, so the URL shows the new route while Elements keeps rendering the old one. The hash history
 * of React Router v5 (Elements v8) also listened to `hashchange`, which is why v8 worked in those hosts.
 *
 * On `hashchange`, this component moves the router to the new hash, but only when the hash is a route of this
 * router: `#/...` under `basePath`, or an empty hash for the root. Other fragments, such as a host page's skip
 * link (`#main-content`), are left alone. It navigates with `replace` because the host already created the
 * history entry.
 */
export const HashRouterSync = ({ basePath = '/' }: HashRouterSyncProps): null => {
  const navigate = useNavigate();
  const location = useLocation();

  // The listener is registered once and reads the latest router state from this ref.
  const latest = React.useRef({ navigate, location });
  React.useLayoutEffect(() => {
    latest.current = { navigate, location };
  });

  React.useEffect(() => {
    const onHashChange = () => {
      const target = getRouterPathFromHash(window.location.hash, basePath);
      if (target === null) return;

      const { navigate, location } = latest.current;
      if (target === `${location.pathname}${location.search}${location.hash}`) return;

      navigate(target, { replace: true });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [basePath]);

  return null;
};

/**
 * Returns the router path (relative to `basePath`) that a URL hash points to, or `null` when the hash is not a
 * route of a hash router mounted at `basePath`. Paths are parsed the same way React Router's hash history does.
 */
export const getRouterPathFromHash = (hash: string, basePath = '/'): string | null => {
  if (hash === '' || hash === '#') return '/';
  if (!hash.startsWith('#/')) return null;

  const { pathname = '/', search = '', hash: innerHash = '' } = parsePath(hash.slice(1));
  const routerPathname = stripBasePath(pathname, basePath);
  if (routerPathname === null) return null;

  return `${routerPathname}${search}${innerHash}`;
};

// Same rules as React Router's basename handling: case-insensitive and aligned to a path segment.
const stripBasePath = (pathname: string, basePath: string): string | null => {
  const base = basePath.replace(/^\/*/, '/').replace(/\/+$/, '');
  if (base === '') return pathname;
  if (!pathname.toLowerCase().startsWith(base.toLowerCase())) return null;

  const nextChar = pathname.charAt(base.length);
  if (nextChar && nextChar !== '/') return null;

  return pathname.slice(base.length) || '/';
};
