# Hub Components

<!-- BADGES -->

[![npm version](https://badge.fury.io/js/%40stoplight%2Fhubs.svg)](https://badge.fury.io/js/%40stoplight%2Fhubs)

<!-- SUMMARY -->

- Explore the components: [Storybook](https://stoplightio.github.io/hubs)
- View the changelog: [Releases](https://github.com/stoplightio/hubs/releases)

### Features

- A component for displaying http operations
- A component for displaying and sending http requests
- A component for displaying http services

### Installation

Supported in modern browsers and node.

```bash
# latest stable
yarn add @stoplight/hubs
```

### Usage

```ts
import { HttpOperation, HttpRequest, HttpService } from '@stoplight/hubs';

// ...example
```

### Contributing

1. Clone repo.
2. Create / checkout `feature/{name}`, `chore/{name}`, or `fix/{name}` branch.
3. Install deps: `yarn`.
4. Make your changes.
5. Run tests: `yarn test.prod`.
6. Stage relevant files to git.
7. Commit: `yarn commit`. _NOTE: Commits that don't follow the [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format will be rejected. `yarn commit` creates this format for you, or you can put it together manually and then do a regular `git commit`._
8. Push: `git push`.
9. Open PR targeting the `master` branch.
