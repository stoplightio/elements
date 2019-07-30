# Elements

<!-- BADGES -->

[![npm version](https://badge.fury.io/js/%40stoplight%elements.svg)](https://badge.fury.io/js/%40stoplight%elements)

<!-- SUMMARY -->

- Explore the components: [Storybook](https://stoplightio.github.io/elements)
- View the changelog: [Releases](https://github.com/stoplightio/elements/releases)

### Features

TBD

### Installation

Supported in modern browsers and node.

```bash
# latest stable
yarn add @stoplight/elements
```

### Usage

```tsx
import { Page, Provider, TableOfContents } from '@stoplight/elements';

<Provider>
  <div className="flex">
    <TableOfContents srn="gh/stoplightio/elements" />

    <Page className="flex-1" srn="gh/stoplightio/elements/docs/README.md" />
  </div>
</Provider>;
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
