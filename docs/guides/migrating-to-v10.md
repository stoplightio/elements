# Migrating to Elements 10

`@stoplight/elements` 10 and `@stoplight/elements-dev-portal` 4 move to React 19 and React Router 8. This guide covers what changed and what you need to do.

| Package | Previous | New |
| --- | --- | --- |
| `@stoplight/elements` | 9.x | 10.0.0 |
| `@stoplight/elements-dev-portal` | 3.x | 4.0.0 |
| `@stoplight/elements-core` | 9.x | 10.0.0 |

Components, props and web component attributes are the same, and so is how the documentation looks and behaves. See [What did not change](#what-did-not-change). What changed is what Elements needs from your project, plus a few smaller things in the sections below.

## Upgrade checklist

1. Install React and React DOM 19.2.7 or later (and `@types/react` and `@types/react-dom` 19 if you use TypeScript).
2. Replace `ReactDOM.render` with `createRoot`.
3. If your app has its own router and Elements should use it: move it to React Router 8, with one copy of it in your app.
4. If you share a React Query client with Elements: move to `@tanstack/react-query` 5.
5. If you use `PersistenceContextProvider` or the data hooks of `@stoplight/elements-dev-portal`: see [below](#if-you-use-the-lower-level-apis).
6. Use Node.js 22.22 or later for your build tooling and server-side rendering.
7. If you use npm: add the [two overrides](#if-you-use-npm-add-two-overrides). Without them the packages fail to load.
8. If you `require()` Elements, test with Jest, or compile CommonJS with TypeScript older than 5.8: see [ES modules only](#es-modules-only).
9. Install `@stoplight/elements` 10 and `@stoplight/elements-dev-portal` 4.

If you can't move to React 19 yet, stay on `@stoplight/elements` 9.x and `@stoplight/elements-dev-portal` 3.x.

## Requirements

| | Before | Now |
| --- | --- | --- |
| React and React DOM | `>=16.8` | `>=19.2.7` |
| Node.js (build tooling, server-side rendering) | `>=16` | `>=22.22.0` |
| React Router (if you bring your own router) | `react-router-dom` 6 | `react-router` 8 |
| React Query (if you bring your own client) | `react-query` 3 | `@tanstack/react-query` 5 |
| Browsers | ES2015 | ES2020: Chrome and Edge 80, Firefox 74, Safari 13.1 (see below) |
| Module format | CommonJS and ES modules | [ES modules only](#es-modules-only) |

## Who needs to do what

### Using the web components (HTML, Angular, any framework)

Nothing about React or React Router. The web component bundle ships its own copy of React 19 and React Router 8, so it doesn't matter which versions your page uses.

Two things can still affect you:

- **Browsers.** The bundle uses ES2020 syntax (such as `?.` and `??`). It doesn't run in browsers older than the ones in the table above, which are the first versions that support that syntax. The end-to-end tests run in current Chromium, Firefox and WebKit (the engine of Safari). Those older versions are not tested.
- **Node.js.** Your build tooling needs Node.js 22.22 or later if you build your app with the packages installed from npm. The packages don't set `engines` themselves, but React Router 8 does (`>=22.22.0`). Package managers that enforce `engines` for dependencies (npm with `engine-strict`, Yarn Classic) refuse older versions because of that.

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

If your app keeps a v6 router above Elements, Elements will not see it and will mount its own router. Navigation inside Elements will then be independent of your app's routes: the address bar follows Elements, but your app's router doesn't know about it.

If you don't set up a router yourself, set the `router` prop as before (`history`, `hash`, `memory` or `static`). Nothing changes there.

### If you provide your own React Query client

Elements now uses `@tanstack/react-query` v5 instead of `react-query` v3. As with the router, Elements reuses a `QueryClientProvider` from your app only if it comes from the same package. A provider from `react-query` v3 is not detected, and Elements creates its own client instead.

If you share a client with Elements, move to `@tanstack/react-query` v5.

### If you use the lower-level APIs

These exports changed, they are the only ones whose behavior or types differ from Elements 9. No export was added or removed.

**`PersistenceContextProvider`** (`@stoplight/elements-core`) is the `Provider` of jotai 3. It takes a `store` instead of the `initialValues` and `scope` props of jotai 1:

```diff
- <PersistenceContextProvider initialValues={[[someAtom, value]]}>
+ <PersistenceContextProvider store={store}>
```

where `store` comes from `createStore()` in `jotai`, and is pre-filled with `store.set(someAtom, value)`. Most apps don't need this, `withPersistenceBoundary` and the components do it for you.

**The data hooks of `@stoplight/elements-dev-portal`** (`useGetBranches`, `useGetNodeContent`, `useGetNodes`, `useGetTableOfContents` and `useGetWorkspace`) return the results of TanStack Query 5 instead of React Query 3. The things most code touches:

| React Query 3 | TanStack Query 5 |
| --- | --- |
| `status === 'loading'` | `status === 'pending'` |
| `isLoading` (no data yet) | `isPending`. In v5, `isLoading` is only true while the first request is in flight. |
| `error` is `unknown` | `error` is `Error \| null` |

See the [TanStack Query migration guide](https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5) for the rest.

**Other exports.** `ReactRouterMarkdownLink` takes the `LinkProps` of React Router 8. The type parameter of `withStyles`, `withMosaicProvider`, `withQueryClientProvider` and `withPersistenceBoundary` is now constrained to object types (`T extends object`), as the props of a component are.

### If you use npm: add two overrides

**This is required with npm, not optional.** Two dependencies of Elements have not been updated for React 19 yet, and without the overrides below the packages don't even load.

- `@stoplight/mosaic` depends on `use-resize-observer` 9, whose peer dependencies stop at React 18. npm installs peer dependencies automatically, so it adds nested copies of React DOM 18 next to it, and importing Elements fails with an error such as `Cannot read properties of undefined (reading 'ReactCurrentDispatcher')` or `... (reading 'ReactCurrentBatchConfig')`.
- `@stoplight/markdown-viewer` and `@stoplight/json-schema-viewer` depend on `@stoplight/react-error-boundary` 2, which brings two copies of `@sentry/react` 6 (and its React 18 peer dependency). Elements itself uses version 3, which has no dependencies.

Add both overrides to your `package.json`:

```json
{
  "overrides": {
    "use-resize-observer": {
      "react": "^19.0.0",
      "react-dom": "^19.0.0"
    },
    "@stoplight/react-error-boundary": "3.0.0"
  }
}
```

Run `npm ls react react-dom @sentry/react` to check that there is one version of React and React DOM, and no `@sentry/react`. `npm run test.consumer` in this repository does the same on a fresh install of the built packages, and it is part of our CI.

Don't override `use-resize-observer` to version 10. It no longer has a default export, which Mosaic imports, so parts of the page fail at runtime.

Yarn Classic doesn't install peer dependencies automatically, so the first problem doesn't happen there, and neither does it with npm and `legacy-peer-deps=true`. The Sentry packages are still installed, and these overrides were tested with npm only. They can go once new versions of Mosaic and the two viewers are released.

### Server-side rendering

`router: 'static'` works as before. Elements uses `StaticRouter` from `react-router` internally, and your server needs Node 22.22 or later.

### TypeScript

- `@types/react` 19 removed the implicit `children` prop and the global `JSX` namespace. If your own components wrap Elements, make sure they declare `children` explicitly and use `React.JSX`.
- The packages have a `types` condition in their `exports`, so TypeScript finds the declarations with `moduleResolution` set to `node16`, `nodenext` or `bundler`, for the ESM build too.
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

### ES modules only

The packages are ES modules only: there is no CommonJS build any more (and `dist/index.mjs` and `dist/index.esm.js` are gone, import from the package name). This follows the dependencies that Elements now uses (React Router 8 and jotai 3 are ES modules only too), and it avoids loading two copies of Elements, with two sets of contexts, when a project mixes `require` and `import`.

| Where | What it means |
| --- | --- |
| Bundlers (Vite, webpack 5, esbuild, Angular CLI, Next.js) | Nothing to do. |
| Node.js with `import` | Nothing to do. |
| Node.js with `require()` | Works on Node 22.12 and later. Earlier versions fail with `ERR_REQUIRE_ESM`; use `await import('@stoplight/elements')` there. |
| TypeScript with `module` set to `node16` or `nodenext` in a CommonJS project | Needs TypeScript 5.8 or later. Earlier versions report TS1479 ("The current file is a CommonJS module whose imports will produce 'require' calls"). Use `await import()` or move to ES modules. |
| TypeScript with `moduleResolution` set to `bundler`, or to `node16`/`nodenext` in an ES module project | Nothing to do. |
| Jest (CommonJS mode, the default) | Fails with "Must use import to load ES Module", and transforming Elements with `babel-jest` doesn't help, because its dependencies declare `"type": "module"`. Run Jest in its [native ES module mode](https://jestjs.io/docs/ecmascript-modules) (`NODE_OPTIONS=--experimental-vm-modules`, with your tests written as ES modules), or use Vitest, which needs no setup. |

### Bundlers

Elements ships ES2020. If your bundler transpiles `node_modules` for older browsers than that, add the `@stoplight/*` packages to the list of what it transpiles (for example `transpilePackages` in Next.js).

**Vite** doesn't provide the Node.js globals that dependencies of Elements expect (`global`, `process`). See [the Vite section of the React guide](../getting-started/elements/react.md#vite).

## Security

React Router 6 does not have a fix for [CVE-2026-53669](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) (open redirect via backslash in `<Link>` and `useNavigate`, affecting React Router 6.0.0 up to 7.17.x), and the fix is only available from 7.18.0. Moving to Elements 10 removes React Router 6 from your dependency tree.

`npm audit` still reports four findings, all through `@stoplight/http-spec` → `postman-collection`: [GHSA-qxc2-j82w-r537](https://github.com/advisories/GHSA-qxc2-j82w-r537) in `@faker-js/faker` and [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq) in `uuid`, plus the two packages that depend on them. Elements only imports the OpenAPI parts of `http-spec` (`@stoplight/http-spec/oas` and `/hash`), never its `postman` entry point, and none of the Elements bundles contain `postman-collection`, `faker` or `uuid` from that tree.

## What did not change

- The props of all components and the attributes of the web components.
- The `router`, `basePath` and `staticRouterPath` options behave as before.
- Every export of the three packages is still there, with the same name.
- How the documentation looks. In our tests, screenshots of the example pages (overview, operations, schemas, in light and dark mode, and on a phone) are identical to the ones of Elements 9, pixel for pixel.
- The code samples that Elements generates for requests, for all supported languages.
- Saved settings. The selected language and API keys are stored in `localStorage` under the same keys and in the same format, so what users saved with Elements 9 is still used.
- `@stoplight/elements-core` remains an internal package. If you import from it directly, expect the same React and React Router requirements as above.

We run the same end-to-end tests against the published Elements 9 and against Elements 10, and compare screenshots between the two. See [CONTRIBUTING.md](../../CONTRIBUTING.md) if you want to run those checks yourself.

## Troubleshooting

| What you see | Cause and fix |
| --- | --- |
| `Cannot read properties of undefined (reading 'ReactCurrentDispatcher')` or `(reading 'ReactCurrentBatchConfig')` | A second copy of React DOM, see [If you use npm](#if-you-use-npm-add-two-overrides). |
| `global is not defined` or `process is not defined` in a Vite app | Add the Node.js polyfills, see [the Vite section of the React guide](../getting-started/elements/react.md#vite). |
| Clicking inside Elements changes the address bar but not your app's navigation | Your app and Elements don't share one copy of React Router 8, see [If you provide your own router](#if-you-provide-your-own-router). |
| `ERR_REQUIRE_ESM` | `require()` of an ES module needs Node 22.12 or later, see [ES modules only](#es-modules-only). |
| TS1479 "The current file is a CommonJS module whose imports will produce 'require' calls" | TypeScript older than 5.8 with `module` set to `node16` or `nodenext` in a CommonJS project, see [ES modules only](#es-modules-only). |
| "Must use import to load ES Module" in Jest | Jest runs in CommonJS mode, see [ES modules only](#es-modules-only). |
| A `SyntaxError` ("Unexpected token") when the script loads in an older browser | Elements ships ES2020, see [Bundlers](#bundlers) and the browsers in [Requirements](#requirements). |
| Elements creates its own query client although your app has one | Your `QueryClientProvider` comes from `react-query` 3. Move to `@tanstack/react-query` 5. |

Something else? [Open an issue](https://github.com/stoplightio/elements/issues).
