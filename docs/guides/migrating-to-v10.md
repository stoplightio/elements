# Migrating to Elements 10

`@stoplight/elements` 10 and `@stoplight/elements-dev-portal` 4 move to React 19 and React Router 8. This guide covers what changed and what you need to do.

| Package | Previous | New |
| --- | --- | --- |
| `@stoplight/elements` | 9.x | 10.0.0 |
| `@stoplight/elements-dev-portal` | 3.x | 4.0.0 |
| `@stoplight/elements-core` | 9.x | 10.0.0 |

## Requirements

| | Before | Now |
| --- | --- | --- |
| React and React DOM | `>=16.8` | `>=19.2.7` |
| Node.js (build tooling, SSR) | `>=16` | `>=22.22.0` |
| React Router (if you bring your own router) | `react-router-dom` 6 | `react-router` 8 |

If you can't move to React 19 yet, stay on `@stoplight/elements` 9.x.

## Who needs to do what

### Using the web components (HTML, Angular, any framework)

Nothing about React or React Router. The web component bundle ships its own copy of React. The only thing that can affect you is the Node version of your build tooling, if you build your app with a Node older than 22.22.

### Using the React components

1. **Upgrade React.** Install React and React DOM 19.2.7 or later, along with `@types/react` and `@types/react-dom` 19 if you use TypeScript.
2. **Use `createRoot`.** React 19 removed `ReactDOM.render`. Replace it with `createRoot` from `react-dom/client`:

   ```diff
   - import ReactDOM from 'react-dom';
   + import { createRoot } from 'react-dom/client';

   - ReactDOM.render(<App />, document.getElementById('root'));
   + createRoot(document.getElementById('root')!).render(<App />);
   ```

3. **Upgrade the Elements packages** to the versions in the table above.

### If you provide your own router

Elements detects an existing router in your React tree and uses it, rather than creating its own. That detection only works when your app and Elements share **one copy of React Router 8**.

1. Replace `react-router-dom` with `react-router` v8. The `react-router-dom` package no longer exists in v8:

   ```diff
   - import { BrowserRouter, Routes, Route } from 'react-router-dom';
   + import { BrowserRouter, Routes, Route } from 'react-router';
   ```

2. Make sure your package manager installs a single copy of `react-router` (`yarn why react-router`, `npm ls react-router`).

If your app keeps a v6 router above Elements, Elements will not see it and will mount its own router. Navigation inside Elements will then be independent of your app's routes.

If you don't set up a router yourself, set the `router` prop as before (`history`, `hash`, `memory` or `static`). Nothing changes there.

### If you provide your own React Query client

Elements now uses `@tanstack/react-query` v5 instead of `react-query` v3. As with the router, Elements reuses a `QueryClientProvider` from your app only if it comes from the same package. A provider from `react-query` v3 is not detected, and Elements creates its own client instead.

If you share a client with Elements, move to `@tanstack/react-query` v5.

### Server-side rendering

`router: 'static'` works as before. Elements uses `StaticRouter` from `react-router` internally, and your server needs Node 22.22 or later.

### TypeScript

- `@types/react` 19 removed the implicit `children` prop and the global `JSX` namespace. If your own components wrap Elements, make sure they declare `children` explicitly and use `React.JSX`.
- `@stoplight/mosaic` (a dependency of Elements) is typed against `@types/react` 18 and earlier. With `@types/react` 19 you may see type errors in code that uses Mosaic components directly. Elements includes a small compatibility declaration for its own sources; if you hit the same errors in yours, you can add:

  ```ts
  // react-19-compat.d.ts
  import 'react';

  declare module 'react' {
    interface HTMLAttributes<T> {
      placeholder?: string | undefined;
      onPointerEnterCapture?: PointerEventHandler<T> | undefined;
      onPointerLeaveCapture?: PointerEventHandler<T> | undefined;
    }
  }
  ```

  Remove it once Mosaic publishes React 19 types.

### Bundlers

React Router 8 is ESM-only. Modern bundlers (Vite, webpack 5, esbuild) handle this without configuration. If you `require()` Elements from CommonJS, you need Node 22.12 or later.

## Security

React Router 6 does not have a fix for CVE-2026-53669 (open redirect via backslash in `<Link>` and `useNavigate`), and the fix is only available from 7.18.0. Moving to Elements 10 removes React Router 6 from your dependency tree.

## What did not change

- Component props and the web component attributes are unchanged.
- The `router`, `basePath` and `staticRouterPath` options behave as before.
- `@stoplight/elements-core` remains an internal package. If you import from it directly, expect the same React and React Router requirements as above.
