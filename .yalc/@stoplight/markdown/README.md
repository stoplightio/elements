# @stoplight/markdown

[![Maintainability](https://api.codeclimate.com/v1/badges/751d2319d7d0fd68d8c9/maintainability)](https://codeclimate.com/github/stoplightio/markdown/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/751d2319d7d0fd68d8c9/test_coverage)](https://codeclimate.com/github/stoplightio/markdown/test_coverage)

Useful functions when working with Markdown. Leverages the Unified / Remark ecosystem under the hood.

- Explore the interfaces: [TSDoc](https://stoplightio.github.io/markdown)
- View the changelog: [Releases](https://github.com/stoplightio/markdown/releases)

### Installation

Supported in modern browsers and node.

```bash
# latest stable
yarn add @stoplight/markdown
```

### Usage

#### Example `parse`

```ts
import { parse } from '@stoplight/markdown';

const result = parse('**markdown**');

console.log(result); // => the MDAST compliant tree
```

### Contributing

1. Clone repo.
2. Create / checkout `feature/{name}`, `chore/{name}`, or `fix/{name}` branch.
3. Install deps: `yarn`.
4. Make your changes.
5. Run tests: `yarn test.prod`.
6. Stage relevant files to git.
7. Commit: `yarn commit`. _NOTE: Commits that don't follow the
   [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format will be
   rejected. `yarn commit` creates this format for you, or you can put it together manually and then do a regular
   `git commit`._
8. Push: `git push`.
9. Open PR targeting the `develop` branch.
