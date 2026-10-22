# Changelog

All notable changes to Elements are documented in this file. The packages (`@stoplight/elements`,
`@stoplight/elements-core` and `@stoplight/elements-dev-portal`) are versioned independently.

Releases before 10.0.0 are listed on [GitHub Releases](https://github.com/stoplightio/elements/releases).

## Unreleased

**`@stoplight/elements` 10.0.0, `@stoplight/elements-core` 10.0.0, `@stoplight/elements-dev-portal` 4.0.0**

This release moves Elements to React 19 and React Router 8. Components, props, web component attributes and the way
documentation looks and behaves are unchanged. See [Migrating to Elements 10](docs/guides/migrating-to-v10.md) for what
you need to do.

### Breaking changes

- **React 19.2.7 or later is required** (React and React DOM peer dependencies). React 16, 17 and 18 are no longer
  supported. Stay on `@stoplight/elements` 9.x and `@stoplight/elements-dev-portal` 3.x if you can't upgrade yet.
- **React Router 8** replaces React Router 6 (`react-router-dom` is no longer used). If your app has its own router and
  you want Elements to use it, it has to be React Router 8, and your app and Elements have to share one copy of it.
  Otherwise Elements creates a router of its own.
- **TanStack Query 5** replaces `react-query` 3. If you share a `QueryClientProvider` with Elements, it has to come from
  `@tanstack/react-query` 5. The data hooks of `@stoplight/elements-dev-portal` (`useGetBranches`, `useGetNodeContent`,
  `useGetNodes`, `useGetTableOfContents` and `useGetWorkspace`) return TanStack Query 5 results, for example
  `status` is `'pending'` instead of `'loading'`.
- **`PersistenceContextProvider`** of `@stoplight/elements-core` is the `Provider` of jotai 3. It takes a `store`
  prop instead of the `initialValues` and `scope` props of jotai 1.
- **ES modules only.** The packages no longer ship a CommonJS build, and `dist/index.mjs` and `dist/index.esm.js` are
  gone. `require()` works on Node 22.12 and later; TypeScript in CommonJS mode with `node16` or
  `nodenext` module resolution needs 5.8 or later; Jest needs its native ES module mode. See
  [ES modules only](docs/guides/migrating-to-v10.md#es-modules-only).
- **Node.js 22.22 or later** for build tooling and server-side rendering, which is what React Router 8 requires. The packages don't set `engines` themselves, but React Router 8 does (`>=22.22.0`), so a package manager that enforces `engines` for dependencies (Yarn Classic, or npm with `engine-strict`) refuses older versions anyway.
- **The JavaScript that Elements ships targets ES2020** instead of ES2015. This applies to the ES module build
  and to the web component bundles, so browsers need to support ES2020 (Chrome and Edge 80, Firefox 74, Safari 13.1).
- **TypeScript:** the type declarations use `React.JSX` and the types of React 19. `withStyles`,
  `withMosaicProvider`, `withQueryClientProvider` and `withPersistenceBoundary` only accept components whose props are
  objects. `ReactRouterMarkdownLink` takes the `LinkProps` of React Router 8.

### Changed

- The `exports` of the packages have a `types` condition, and the relative imports in the type declarations name the
  files they import, so TypeScript finds the declarations with `node16`, `nodenext` and `bundler` module resolution.
- The web component bundles (`web-components.min.js`) are built with Vite and are still self-contained, they now
  include React 19 and React Router 8.
- `web-components.min.js.LICENSE.txt` now lists every package that is bundled into the web components with its license
  text, instead of the license comments that were found in their code. The packages that bundle dependencies into
  `index.js` (Font Awesome icons, `use-debounce`) have an `index.js.LICENSE.txt` in the same way, and both files are
  mentioned in a comment at the top of the bundle they belong to.
- `@stoplight/elements-dev-portal` and `@stoplight/elements-core` use jotai 3 and TanStack Query 5.

### Security

- Fixes [CVE-2026-53669](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) (open redirect through a backslash in
  `<Link>` and `useNavigate`) by moving to React Router 8. The fix is not available for React Router 6.
- The dependency tree no longer contains React Router 6 and `react-query` 3. The remaining `npm audit` findings
  ([GHSA-qxc2-j82w-r537](https://github.com/advisories/GHSA-qxc2-j82w-r537) in `@faker-js/faker`,
  [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq) in `uuid`, and the two packages that
  depend on them) come from `@stoplight/http-spec` → `postman-collection`. Elements doesn't load the Postman code and
  none of the bundles contain it.

### Not changed

- The props of `API`, `APIWithStackedLayout`, `StoplightProject` and the other components, and the attributes of the
  web components.
- The names of all exports: no export of the three packages was added or removed.
- How documentation looks: in our tests, screenshots of the pages of the examples, in light and dark mode and on a
  phone, are identical to those of Elements 9.
- The code samples that Elements generates, for all supported languages.
- What is saved in `localStorage` (selected language, API keys) and how. Settings that users saved with Elements 9 are
  still used.

### For contributors

- Tests run with Vitest instead of Jest, and the end-to-end tests with Playwright instead of Cypress.
- Dependencies are installed with npm instead of Yarn.
- Packages, web components, Storybook (10) and the demo are built with Vite. webpack and `@stoplight/scripts` are gone.
- ESLint 9 (flat config), Prettier 3, TypeScript 6 and Lerna 10.
- Continuous integration runs on GitHub Actions only.
- `npm run e2e:baseline` and `npm run e2e:visual-compat` check that a build behaves and looks the same as a published
  version, see [CONTRIBUTING.md](CONTRIBUTING.md).
