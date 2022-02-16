# Contributing to Stoplight Elements

## Table Of Contents

- [Contributing to Stoplight Elements](#contributing-to-stoplight-elements)
  - [Table Of Contents](#table-of-contents)
  - [Intro](#intro)
  - [Installing Elements](#installing-elements)
  - [Developing Elements](#developing-elements)
  - [Testing](#testing)
    - [Guiding principles](#guiding-principles)
    - [Unit tests](#unit-tests)
      - [Running unit-tests](#running-unit-tests)
    - [Framework Integration](#framework-integration)
      - [Run tests as the CI would](#run-tests-as-the-ci-would)
      - [Run the tests manually](#run-the-tests-manually)
      - [Edit the tests](#edit-the-tests)
      - [Inspecting test results](#inspecting-test-results)
  - [Yalcing into platform-internal](#yalcing-into-platform-internal)
  - [Releasing Elements](#releasing-elements)
  - [Versioning Guidelines](#versioning-guidelines)
        
## Intro

Elements is an open-source project, and we love contributions. If you're familiar with TypeScript and Jest then dive right in, see how far you can get, and talk to us in [Discussions](https://github.com/stoplightio/elements/discussions) or start a draft PR if you get stuck.

## Installing Elements

Before you start development, you have to install elements and its dependencies.

Make sure you have [node](https://nodejs.org/en/) installed. We are predominantly using version 12. If you experience any issues, make sure to have this version installed. We recommened [nvm](https://github.com/nvm-sh/nvm) for managing different versions of node on your computer.

For dependencies, we are using [yarn](https://yarnpkg.com/). Install it, following the [guideline](https://yarnpkg.com/getting-started/install).

Clone elements repository by running `git clone git@github.com:stoplightio/elements.git` (provided you have [SSH keys added](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) in GitHub).

Next, move into the repository by running `cd elements`.

Now run `yarn`. Installation of dependencies will begin.

To validate that the installation was successful, move into demo folder, by running `cd demo` and run `yarn start`. You should see a demo website, under the address `http://localhost:4025`.

## Developing Elements

Elements is split into 3 packages. 2 of them - `elements` and `elements-dev-portal` are user-facing. 3rd - `elements-core` is an implementation detail, created to share code and components between `elements` and `elements-dev-portal`.

Most of the code is actually in `elements-core`, so if you are working on an issue, it's likely where you will land. `elements` and `elements-dev-portal` only have code that is higly specific to those projects.

Most often, we are developing elements (in all of those packages) using [storybooks](https://storybook.js.org/).

Each package has it's own storybook. In order to run a storybook for a specific package, in the main directory run, for example `yarn elements-core storybook`. This will start a storybook for `elements-core` package.

Now you can develop the code and test your changes in the storybook. 

For your convenience all the packages are linked. So, for example, if you run `elements` storybook, but make changes in `elements-core` codebase, those changes *will be* visible instantly in your storybook.

## Testing

### Guiding principles

The aim should never be to write tests for the sake of writing tests. 
In our opinion the goal of testing is **to give developers confidence** when making changes to the codebase, be it adding new features, cleaning up tech debt, or fixing bugs.

Well written tests also **spare tons of time** when authoring or reviewing PRs as one doesn't have to run through hundreds of test cases manually to verify everything still works as intended.
On the other hand, **badly written tests** that depend on the implementation will need to be changed any time the implementation changes, **causing frustration and unnecessary work**, while barely adding any value.

In order to achieve good quality tests, **please follow the following principles**:
- Always test the **behavior** of a component, not the implementation.
    - Tests that use *Jest snapshots* almost always violate this. (Except maybe when you are testing an AST parser, a linter or similar.) 
    
    *Do instead:* Extract the real business requirement from what would be the snapshot and assert against that.
    
    - Tests that `find` child components and assert against props being passed are mostly wrong. 
    Use the **recommended selectors** (see point below) and **[`jest-dom` assertions](https://github.com/testing-library/jest-dom)** to enforce constraints that actually matter to the user.
    - Searching for DOM elements using tag name, CSS class or hierarchy (`parentElement`, etc.) is an antipattern.

    *Do instead:* use **`findByRole` or other queries from [TL's query hierarchy](https://testing-library.com/docs/queries/about#priority)**. 
    Feel free to add accessibility attributes where missing. With a bit of practice you'll see that almost everything can be covered with `*byRole`. Warning: it's addictive. ;)
- The goal for your test suite is **to cover** as much of the **business requirements** (e.g. in the issue description) as practical.
- An ideal test suite only requires a change **if business requirements change**.
- While not generally expected, **it is OK to add additional tests** for helper functions, hooks and subcomponents where it would not be practical to test them alongside their host components.
In this case, still try to follow the principles above as much as practical.
- Use **Jest/JSDOM testing wherever suitable**. Cypress-based tests should be reserved for high level integration tests, such as:
    - Basic sanity checks to make sure that *Elements* builds and loads correctly in a certain environment.
    - Making sure that the routers/navigation of the external framework play nicely with our internal router.


### Unit tests

**Each public-facing component should be thoroughly covered by unit tests.**
We take a sensible approach to testing and do not worship the coverage indicator but make sure that every notable feature is covered exhaustively.

Whenever you add a new component, implement a changing functional requirement or fix a bug, **you are expected to also deliver one or more tests** that cover the feature being added/modified.

Unit testing stack:
- [Jest](https://jestjs.io/)
- [JSDOM](https://github.com/jsdom/jsdom)
- [React Testing Library](https://github.com/testing-library/react-testing-library/)
- [Jest-DOM](https://github.com/testing-library/jest-dom)
- \* You can find some legacy code utilizing a different stack (Enzyme). When changing those tests, use your judgement 
  to decide between amending the old unit test or rewriting it using the new stack. Mixing testing libraries in a single test file is fine.
  
Unit tests are currently located in a directory `__tests__` close to the component being tested, but this is soon to change:
In the future, tests will be located right next to the components under test, with a `.spec.ts` extension.
  
#### Running unit-tests

Assuming you work on the `elements` package, you can run `jest` on it using the shorthand
```shell
yarn elements test
```

There is **no need to build *Elements* beforehand**, the test runs on the currently saved TypeScript code. Make sure to install dependencies, however. (`yarn`)

Any arguments you append after the command will get forwarded to jest. Some useful combinations:
```shell
# Shows the result of each individual test case
yarn elements test --verbose
# Only runs tests related to files changed since last commit.
yarn elements test -o
# Keeps running the tests whenever you change a source or test file. Implies `-o` by default.
yarn elements test --watch
# Runs the test(s) whose name matches the argument regex
yarn elements test -t Test\ Name
```

### Framework Integration

Framework Integration tests are set up **to make sure *Elements* builds and loads correctly using any of the supported frameworks**.
Even though these tests are not "end to end" per se, we usually refer to them as end-to-end (e2e) tests, 
mainly because we use *Cypress* to run them, a traditionally end-to-end test runner.

The logical steps in which these tests are run:
1. You build *Elements* from the current TypeScript source.
2. You copy the contents of predefined example project from `examples` to `examples-dev` e.g. copy `examples/angular` to `examples-dev/angular`
3. You install the *Elements* build from the first step into the chosen example project in `examples-dev` (you modify `package.json` to point to `dist` folder of `elements-core`, `elements` or `elements-dev-portal`)
4. You serve the example from `examples-dev` project on localhost over HTTP port 4200
5. You run the *Cypress* test suite against this example application.

**You generally don't need to amend e2e tests** when working on *Elements* unless you are adding a new supported framework.
These tests are run by the CI pipeline to ensure that a PR does not break any environments.
That being said, if you for some reason want to run them by hand, here's how to do so:

> **Note**: Unlike Jest tests, FI tests simulate real-world integration scenarios and therefore require *Elements* to be built before testing.

#### Run tests as the CI would

```shell
# Make sure top level dependencies are up-to-date
yarn 
# Build Elements itself
yarn build
# Copy the contents of predefined example application and make it use the local build
yarn copy:react-cra
# Build the chosen example (sub `react-cra` for any other example repo)
yarn build:react-cra
# Run the example and the test suite against it
yarn e2e:run:react-cra
```
> **Note**: You only need to run `yarn copy:$INTEGRATION-NAME` once after you clone the Elements repo.

#### Run the tests manually

This is useful for either working on the tests or debugging failures.

The first 3 steps are the same, but this time, instead of running the tests in headless mode, we are going to run them by hand, using the Cypress console.

```shell
# Make sure top level dependencies are up-to-date
yarn 
# Build Elements itself
yarn build
# Copy the contents of predefined example application and make it use the local build
yarn copy:react-cra
# Build the chosen example (sub `react-cra` for any other example repo)
yarn build:react-cra
# Run the example on port 4200. This is going to block so (unless you '&' it) or you'll need another terminal for the next step.
yarn serve:react-cra
# Open the Cypress console
yarn e2e:open
```

> **Note**: You only need to run `yarn copy:$INTEGRATION-NAME` once after you clone the Elements repo.

With the console open, click on any test suite to run it visually. Check [Cypress Docs](https://docs.cypress.io/guides/core-concepts/test-runner.html) for more details about the Test Runner.

Don't forget that while *Cypress* hot-reloads on test code change, it needs a complete rebuild for *Elements* changes.
There is unfortunately no way around this for now. You likely won't hit this limitation often, but in case you do, one trick that may speed things up a bit is:
You can substitute `yarn build:react-cra && yarn serve:react-cra` with `cd examples/react-cra; yarn start`.

#### Edit the tests

The tests are located under `cypress/integration` and utilize the same principles as the unit tests.
Fixtures, *Cypress* plugins and support files can also be found in the relevant folder under `cypress`.

#### Inspecting test results

Test results can be found under the `cypress/results` directory. 
*Cypress* records videos of every test suite run, and takes screenshots on every failure. 
In addition, a machine- and human- readable `output.xml` is generated that contains a summary of the results.

When running in *CircleCI*, the host interprets `output.xml` and displays it visually on the dashboard:
![screenshot](https://user-images.githubusercontent.com/543372/105713328-4c12fa80-5f1b-11eb-869d-6aa382818c5d.png)

Videos - and in case of failure, screenshots - can be found under the *Artifacts* tab.
![screenshot](https://user-images.githubusercontent.com/543372/105713474-7f558980-5f1b-11eb-82b5-87ff764be27a.png)

## Yalcing into `platform-internal`

Elements is used in the Stoplight Platform, as well as in open source projects. Here is how you (if you are a Stoplight employee) can test integrating Elements locally:

1. Inside of elements root directory, run `yarn build` then `cd packages/elements-core/dist` then `yalc publish`
2. Copy the yalc published version output to terminal `@stoplight/elements-core@7.2.0`
3. Go to `packages/ninja`, run `yalc add @stoplight/elements-core@7.2.0` and `yarn install --check-files`

## Releasing Elements

1. Make sure you are in the root directory of this repo and on the `main` branch. Also pull all the latest changes!
2. Create a new branch. The name doesn't really matter - something like `chore/release` will do.
3. Run `yarn version`. You will be asked a few questions.
    - We don't release `elements-demo`. In order to not release them, you have to choose "Custom Version" and enter the same, old verison by hand. Awkward, but it works.
    - For other packages, you can just choose the proposed version (patch or minor update) from the console. Remember to read our versioning guidelines below!
4. After the script gets finalized, a commit will be created for you.
5. *IMPORTANT!!!* If `elements-core` version was updated in `elements` and/or `elements-dev-portal`, the script has changed `~` sign to `^` in front of `elements-core` version. Change it back to `~` in both places manually and make a new commit. The commit message doesn't really matter here, something like `fix: ^ to ~ for elements-core` is more than enough.
6. Now make a push, create a PR and ask someone for a review. The purpose of the review is to make sure the release obeys our versioning guidelines.

## Versioning Guidelines

If you did changes only in `elements` package, it's okay to release only `elements` package.

If you did changes only in `elements-dev-portal` package, it's okay to release only `elements-dev-portal` package.

If you did changes in the `elements-core`, this means that all 3 packages should be released.

If it's difficult to figure out what changes happened since the last release, there is never any harm in releasing all the packages. This will not cause any issues, meanwhile - for example - releasing only `elements` but not releasing `elements-core` can cause serious errors.

Here is how we do versioning:

### Major versions

If you are bumping a major in *any* elements package, you are most likely doing something wrong. Consult a member of Pierogi Team. No yolo'ing allowed here!

### Minor versions

Minor versions in `elements` and `elements-dev-portal` are for introducing new features. If *any* change that is being released introduces a new feature / somehow extends the functionality, bump the minor.

In case of `elements-core` (and in contrast with two other packages), we allow minors to have (within reason), some breaking changes. That's because it is an internal package that we control. 

If you need to make a breaking change in `elements-core`, make sure to bump minor *and* make sure that the new versions of `elements` and `elements-dev-portal` are using this new version and are compatible with it. Remember also that `elements` is used in internal platform code (`you-know-which` repo), so make sure that the new version also works correctly there.

Because we allow for breaking changes in `elements-core`, `elements` and `elements-dev-portal` `package.json` files use `~` sign, instead of a typical `^` sign. This ensures that those packages will be installing only patch updates, until the `elements-core` version is explicility bumped in `package.json`.

### Patches

This is probably the most obvious - in all 3 packages patch bumps are mostly for bug fixes.
