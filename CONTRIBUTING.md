# Contributing to Stoplight Elements

## Table Of Contents

- [Intro](#intro)
- [Install Elements](#install-elements)
- [Develop Elements](#develop-elements)
- [Testing](#testing)
  - [Guiding principles](#guiding-principles)
  - [Unit tests](#unit-tests)
    - [Run unit-tests](#run-unit-tests)
  - [Framework Integration](#framework-integration)
    - [Run tests as the CI would](#run-tests-as-the-ci-would)
    - [Run the tests manually](#run-the-tests-manually)
    - [Edit the tests](#edit-the-tests)
    - [Inspect test results](#inspect-test-results)
  - [Compare a build with a published version](#compare-a-build-with-a-published-version)
- [Build](#build)
- [Yalc into platform-internal](#yalc-into-platform-internal)
- [Release Elements](#release-elements)
- [Versioning Guidelines](#versioning-guidelines)
- [Merge into main](#merge-into-main)
        
## Intro

Elements is an open-source project, and Stoplight loves contributions. If you're familiar with TypeScript and Vitest then dive right in, see how far you can get, and post in [Discussions](https://github.com/stoplightio/elements/discussions) or start a draft PR if you get stuck.

## Install Elements

Before you start development, you have to install Elements and its dependencies.

Make sure you have [Node.js](https://nodejs.org/en/) version 22.22 or higher installed. Consider using [nvm](https://github.com/nvm-sh/nvm) to manage different versions of Node.js on your computer.

For dependencies, use [npm](https://docs.npmjs.com/), which comes with Node.js.

Clone elements repository by running `git clone git@github.com:stoplightio/elements.git` (provided you have [SSH keys added](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) in GitHub).

Next, move into the repository by running `cd elements`.

Now run `npm install` to install dependencies.

To validate that the installation was successful, move into the demo folder by running `cd demo` and run `npm start`. You should see a demo website, under the address `http://localhost:4025`.

## Develop Elements

Elements is split into three packages. Two of them, `elements` and `elements-dev-portal`, are user-facing. The third, `elements-core`, is an implementation detail created to share code and components between `elements` and `elements-dev-portal`.

Most of the code is in `elements-core`; `elements` and `elements-dev-portal` only have code that's highly specific to those projects.

Most often, you'll develop Elements (in all the packages) using [storybooks](https://storybook.js.org/).

Each package has its own storybook. To run a storybook for a specific package, in the main directory run, for example, `npm run storybook -w @stoplight/elements-core`. This starts a storybook for the `elements-core` package.

Now you can develop the code and test your changes in the storybook. 

For your convenience, all the packages are linked. For example, if you run the `elements` storybook, but make changes in the `elements-core` codebase, those changes *will be* visible instantly in your storybook.

## Testing

### Guiding Principles

The aim should never be to write tests for the sake of writing tests. 

For Stoplight, the goal of testing is **to give developers confidence** when making changes to the codebase when they're adding new features, cleaning up tech debt, or fixing bugs.

Well-written tests also **save time** when authoring or reviewing PRs as you don't have to run through hundreds of test cases manually to verify everything still works as intended. On the other hand, **badly written tests** that depend on the implementation need to be changed any time the implementation changes, **causing frustration and unnecessary work**, while barely adding any value.

To achieve high-quality tests, **follow these principles**:
- Always test the **behavior** of a component, not the implementation.
    - Tests that use *Vitest snapshots* almost always violate this. (Except maybe when you are testing an AST parser, a linter, or similar.) 
    
    **Instead,** extract the real business requirement from what would be the snapshot and assert against that.
    
    - Tests that `find` child components and assert against props being passed may be incorrect. 
    Use the **recommended selectors** (see point below) and **[`jest-dom` assertions](https://github.com/testing-library/jest-dom)** to enforce constraints that matter to the user.
    - Searching for DOM elements using tag name, CSS class, or hierarchy (`parentElement`, etc.) is an anti-pattern.

    **Instead,** use **`findByRole` or other queries from [TL's query hierarchy](https://testing-library.com/docs/queries/about#priority)**. 
    Feel free to add accessibility attributes where missing. With a bit of practice, you'll see that almost everything can be covered with `*byRole`.
- The goal for your test suite is **to cover** as much of the **business requirements** (for example, in the issue description) as practical.
- An ideal test suite only requires a change **if business requirements change**.
- While not expected, **it's OK to add additional tests** for helper functions, hooks, and sub-components where it would not be practical to test them alongside their host components. In this case, try to follow the principles above as much as practical.
- Use **Vitest/JSDOM testing wherever suitable**. Playwright-based tests should be reserved for high-level integration tests, such as:
    - Basic checks to make sure that *Elements* builds and loads correctly in a certain environment.
    - Make sure the routers/navigation of the external framework works well with Stoplight's internal router.


### Unit tests

**Each public-facing component should be covered by unit tests.**
Take a sensible approach to testing and don't worship the coverage indicator but make sure that every notable feature is covered exhaustively.

When you add a new component, implement a changing functional requirement, or fix a bug, **you are expected to also deliver one or more tests** that cover the feature being added/modified.

Unit testing stack:
- [Vitest](https://vitest.dev/)
- [JSDOM](https://github.com/jsdom/jsdom)
- [React Testing Library](https://github.com/testing-library/react-testing-library/)
- [Jest-DOM](https://github.com/testing-library/jest-dom)
  
Unit tests are currently located in a directory `__tests__` close to the component being tested, but in the future, tests will be located right next to the components under test, with a `.spec.ts` extension.
  
#### Run Unit Tests

Assuming you work on the `elements` package, you can run `vitest` on it with
```shell
npm test -w @stoplight/elements
```

There is **no need to build *Elements* beforehand**, the test runs on the currently saved TypeScript code. Make sure to install dependencies, however. (`npm install`)

Any arguments you append after the command are forwarded to Vitest. Some useful combinations:
```shell
# Show the result of each individual test case
npm test -w @stoplight/elements -- --reporter=verbose
# Only run tests related to files changed since the last commit.
npm test -w @stoplight/elements -- --changed
# Keep running the tests whenever you change a source or test file.
npm run test.watch -w @stoplight/elements
# Run the test(s) whose name matches the argument regex
npm test -w @stoplight/elements -- -t "Test Name"
```

### Framework Integration

Framework integration tests are set up **to make sure *Elements* builds and loads correctly using any of the supported frameworks**.
Even though these tests aren't fully end-to-end, they're referred to as end-to-end (e2e) tests. This is mainly because *Playwright*, a traditionally end-to-end test runner, is used to run them.

The logical steps in which these tests are run:

1. Build *Elements* from the current TypeScript source.
2. Copy the contents of the predefined example project from `examples` to `examples-dev`. For example, copy `examples/angular` to `examples-dev/angular`
3. Install the *Elements* build from the first step into the chosen example project in `examples-dev` (you modify `package.json` to point to the `dist` folder of `elements-core`, `elements` or `elements-dev-portal`)
4. Serve the example from the `examples-dev` project on localhost over HTTP port 4200
5. Run the *Playwright* test suite against this example application. Playwright starts the example itself (`npm run serve:<example>`) and waits for it on port 4200. It runs every test in Chromium, Firefox and WebKit. Add `--project=chromium` (or another engine) to run one of them. The screenshot comparison in `e2e/visual.spec.ts` only runs in Chromium.

**You don't need to amend e2e tests** when working on *Elements* unless you are adding a new supported framework.
These tests are run by the CI pipeline to ensure that a PR doesn't break any environments.
That being said, if you for some reason want to run them by hand, here's how to do so:

> **Note**: Unlike unit tests, FI tests simulate real-world integration scenarios and therefore require *Elements* to be built before testing.

#### Run Tests as the CI Would

```shell
# Make sure top-level dependencies are up-to-date
npm install
# Build Elements itself
npm run build
# Copy the contents of the predefined example application and make it use the local build
npm run copy:react-vite
# Build the chosen example (sub `react-vite` for any other example repo)
npm run build:react-vite
# Install the browser Playwright drives (only needed once, and again after upgrading Playwright)
npx playwright install chromium firefox webkit
# Run the example and the test suite against it
npm run e2e:run:react-vite
```
> **Note**: You only need to run `npm run copy:$INTEGRATION-NAME` once after you clone the Elements repo.

#### Check that an app can install the packages

After `npm run build`, `npm run test.consumer` packs the built packages, installs them in a fresh temporary project with React 19, and checks that there is one copy of React and React DOM, that all three load, and that `API` renders without errors. It uses the overrides from [the migration guide](docs/guides/migrating-to-v10.md#if-you-use-npm-add-two-overrides), which npm users need until `@stoplight/mosaic`, `@stoplight/markdown-viewer` and `@stoplight/json-schema-viewer` are released with fixes. `npm run test.consumer -- --plain` runs the same checks without them. It fails today, and it is the way to find out that the overrides can go: when it passes, remove them from the guide, this script and the root `package.json`.

#### Run the Tests Manually

This is useful for either working on the tests or debugging failures.

The first three steps are the same, but this time, instead of running the tests in headless mode, run them in Playwright's UI mode.

```shell
# Make sure top-level dependencies are up-to-date
npm install
# Build Elements itself
npm run build
# Copy the contents of the predefined example application and make it use the local build
npm run copy:react-vite
# Build the chosen example (sub `react-vite` for any other example repo)
npm run build:react-vite
# Run the example on port 4200. This is going to block so (unless you '&' it) or you'll need another terminal for the next step.
npm run serve:react-vite
# Open Playwright's UI mode (it reuses the server that is already running on port 4200)
npm run e2e:open
```

> **Note**: You only need to run `npm run copy:$INTEGRATION-NAME` once after you clone the Elements repo.

With UI mode open, select any test to run it and step through it visually. Check the [Playwright UI mode docs](https://playwright.dev/docs/test-ui-mode) for more details.

Don't forget that while *Playwright* re-runs on test code change, it needs a complete rebuild for *Elements* changes. There is no way around this for now. You won't hit this limitation often, but in case you do, one trick that may speed things up a bit is to substitute `npm run build:react-vite && npm run serve:react-vite` with `cd examples/react-vite; npm start`.

#### Edit the Tests

The tests are located under `e2e` (`*.spec.ts`) and utilize the same principles as the unit tests: prefer `getByRole` and the other user-facing locators.
Fixtures and support files can also be found in the relevant folder under `e2e`. The Playwright configuration is in `playwright.config.ts`.

#### Inspect Test Results

Test results can be found under the `e2e-results` directory. 
*Playwright* keeps a trace, screenshot and video for every failing test (under `e2e-results/artifacts`; open a trace with `npx playwright show-trace <path>/trace.zip`). In addition, a machine-readable `output.xml` is generated that contains a summary of the results.

In CI, each e2e job uploads `e2e-results` (including traces, screenshots and videos of failing tests) as a build artifact named `e2e-<example>-results`.

### Compare a build with a published version

After a big change (a major upgrade of a dependency, or of the build tooling), it is not enough that the tests pass: you want to know that Elements still behaves and looks the way it did. Two scripts check that by running the *same* tests against a published version of Elements and against your local build. Both need a local build (`npm run build`) and take the example to use (`react-vite`, `angular` or `static-html`) and, optionally, the versions of `@stoplight/elements` and `@stoplight/elements-dev-portal` to compare with (they default to the newest 9.x and 3.x releases on npm, looked up when the script runs).

```bash
# Run the end-to-end tests against the published version. The tests that are about the local build only are skipped.
npm run e2e:baseline -- react-vite
# Same, with other versions, and only some of the tests
npm run e2e:baseline -- react-vite 9.0.29 3.0.29 persistence
# Elements 9 was made for React 18: run the react-vite example on React 18 and React Router 6 instead of React 19
REACT=18 npm run e2e:baseline -- react-vite

# Record screenshots of pages with the published version, then compare the local build with them
npm run e2e:visual-compat -- react-vite
# Allow no difference at all, instead of 0.2% of the pixels
VISUAL_TOLERANCE=0 npm run e2e:visual-compat -- react-vite
```

A test that passes with the published version but fails with your build is a change in behavior, so it is worth a look. A test that fails with the published version is a test that describes something new, mark it with `test.skip(process.env.BASELINE === '1', '...')`. The same checks can be run in CI for all examples at once with the "compat" workflow on GitHub Actions (run it by hand; it compares with the newest 9.x and 3.x unless you give it versions, and it also runs the behavior check on React 18). The appearance check covers the overview, operation and schema pages of the Zoom API on a desktop, a wide screen and a phone, in light and dark mode, plus a sent request with its response and a changed request sample language. The screenshots are recorded in `e2e-visual-baseline`, which git ignores. Differences are written to `e2e-results/artifacts`, as the expected page, the actual page and an image of the difference.

## Build

`npm run build` builds the three packages in dependency order. Each package is built in steps (see its `build` scripts), all with [Vite](https://vite.dev/):

1. `build.react` bundles `src/index.ts` into an ES module (`dist/index.js`), configured in the package's `vite.build.config.mts` from the shared [vite.lib.mts](vite.lib.mts). Dependencies and peer dependencies stay external, except for those listed under `rollup.bundleDeps` in the package's `package.json`. `tsc` then emits the type declarations into `dist`, and [scripts/prepare-dist.mjs](scripts/prepare-dist.mjs) writes the `package.json`, README and LICENSE that get published (each package publishes its `dist` folder). The packages are ES modules only. Keep it possible to `require()` them on current Node.js versions, which means no top-level `await` in the source. `prepare-dist.mjs` also adds the file extensions that TypeScript needs to the relative imports in the declarations, and `npm run test.packaging.types` (part of `postbuild`) compiles [scripts/consumer-types](scripts/consumer-types) with `nodenext` module resolution, to check that consumers can resolve the types.
2. `build.webcomponents` (`elements` and `elements-dev-portal`) bundles the web components, with React and all dependencies included, into `dist/web-components.min.js`. It is configured in the package's `vite.web-components.config.mts` from the shared [vite.web-components.mts](vite.web-components.mts), and has to run after `build.react`, which owns `dist`. Both builds use [vite.licenses.mts](vite.licenses.mts) to write the licenses of the dependencies that end up in a bundle to `<bundle>.LICENSE.txt` next to it (`web-components.min.js.LICENSE.txt`, and `index.js.LICENSE.txt` when `rollup.bundleDeps` includes something). The build fails if an included package declares no license, so check what a new dependency brings before adding it to a bundle.
3. `build.styles` (the `postbuild` step) compiles the stylesheets with PostCSS.

Storybook (`.storybook`) and the demo app (`demo`) also run on Vite. Some of our dependencies expect Node.js globals such as `process` in the browser, which [process-shim.js](process-shim.js) provides for both of them (the web component bundles inject it at build time instead).

The `dist` folders are rebuilt from scratch every time, and the `dev-portal` build also rewrites `packages/elements-dev-portal/src/version.ts` with the current package version. Don't commit that change unless you are releasing.

## Yalc into platform-internal

Elements is used in the Stoplight Platform, as well as in open source projects. Here is how you (if you are a Stoplight employee) can test integrating Elements locally:

1. Inside of elements root directory, run `npm run build` then `cd packages/elements-core/dist` then `yalc publish`
2. Copy the yalc published version output to terminal `@stoplight/elements-core@7.2.0`
3. Go to `packages/ninja`, run `yalc add @stoplight/elements-core@7.2.0` and `npm install`

## Release Elements

1. Make sure you are in the root directory of this repo and on the `main` branch.
2. Pull all the latest changes.
3. Create a new branch. The name doesn't matter, but here's an example: `chore/release`.
4. Run `npm run version` (this runs `lerna version`, not `npm version`). You are asked a few questions.
    - Don't release `elements-demo`. You have to choose "Custom Version" and enter the same, old version by hand. Awkward, but it works.
    - For other packages, choose the proposed version (patch or minor update) from the console. Remember to read the [versioning guidelines](#versioning-guidelines).
5. After the script gets finalized, a commit is created for you.
6. *IMPORTANT*: If `elements-core` version was updated in `elements` and/or `elements-dev-portal`, the script has changed `~` sign to `^` in front of `elements-core` version. Change it back to `~` in both places manually and make a new commit. The commit message doesn't matter here; something like `fix: ^ to ~ for elements-core` is more than enough.
7. Now make a push, create a PR and ask someone for a review. The purpose of the review is to make sure the release obeys the versioning guidelines.

## Versioning Guidelines

If you made changes only in the `elements` package, it's okay to release only the `elements` package.

If you made changes only in the `elements-dev-portal` package, it's okay to release only the `elements-dev-portal` package.

If you made changes in `elements-core`, this means that all three packages should be released.

If it's difficult to figure out what changes happened since the last release, there is never any harm in releasing all the packages. This won't cause any issues, but releasing only `elements` and not releasing `elements-core` can cause serious errors.

### Major versions

If you think a major version bump is required in *any* `elements` package, please consult a member of the Stoplight team.

### Minor versions

Minor versions in `elements` and `elements-dev-portal` are for introducing new features. If *any* change that's being released introduces a new feature / somehow extends the functionality, bump the minor.

In the case of `elements-core` (and in contrast with two other packages), minors are allowed to have (within reason) some breaking changes. That's because it's an internal package that Stoplight controls. 

If you need to make a breaking change in `elements-core`, make sure to bump minor *and* make sure that the new versions of `elements` and `elements-dev-portal` are using this new version and are compatible with it. Remember also that `elements` is used in internal Stoplight platform code, so make sure that the new version also works correctly there.

Because breaking changes in `elements-core` are allowed, `elements` and `elements-dev-portal` `package.json` files use `~` sign instead of a typical `^` sign. This ensures that those packages install only patch updates until the `elements-core` version is explicitly bumped in `package.json`.

### Patches

In all three packages, patch bumps are primarily for bug fixes.

###  Merge into Main

To merge your changes into main you must create a PR for your changes and then have those changes approved by a member of the stoplight elements-owner team.

To do this simply create a pull request merging your branch into main. Once your changes are complete, ensure all build checks are successfully passing, fill out the pull request template, and assign elements-owner as the reviewer.

While Stoplight tries to be as responsive as possible, it can take several days to review requests. Stoplight prioritizes new issues and requests each sprint and handles them as capacity allows. If it has been over 2 weeks since your request, add a comment mentioning the @elements-owners to send a friendly reminder.
