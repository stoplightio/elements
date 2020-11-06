# ⚠ Stoplight Elements v5 is discontinued.

*Stoplight Elements v5* is **not supported** and is **not compatible with the new Stoplight Platform**.

Stoplight is actively working on a new, updated version 6, that is easier to use and provides greater user experience.

*Stoplight Elements v6* is **currently in beta**. If you would like to try it out now, check out our latest beta release.

[![npm (tag)](https://img.shields.io/npm/v/@stoplight/elements/beta?style=flat-square)](https://www.npmjs.com/package/@stoplight/elements/v/beta)
[![npm (tag)](https://img.shields.io/npm/v/@stoplight/elements-web-components/beta?style=flat-square)](https://www.npmjs.com/package/@stoplight/elements-web-components/v/beta)
[![docs site](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat-square)](https://meta.stoplight.io/docs/elements)




# @stoplight/elements

[![npm version](https://badge.fury.io/js/%40stoplight%2Felements.svg)](https://badge.fury.io/js/%40stoplight%2Felements) [![Maintainability](https://api.codeclimate.com/v1/badges/ce451f605ca16ec84132/maintainability)](https://codeclimate.com/repos/5e0f5ecaeae96001a100cc3b/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/ce451f605ca16ec84132/test_coverage)](https://codeclimate.com/repos/5e0f5ecaeae96001a100cc3b/test_coverage) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://stoplightio.github.io/elements)

UI components for composing beautiful developer documentation

### Installation

```bash
# latest stable
yarn add @stoplight/elements
```

### Usage

```tsx
import { Page, Provider, TableOfContents } from '@stoplight/elements';
import { Docs } from '@stoplight/elements/components/Docs';
import { TryIt } from '@stoplight/elements/components/TryIt';

<Provider
  host="https://stoplight.io/api"
  components={{
    link: ({ node, children }) => {
      // Render a custom link component
      return (
        <a href={node.url} title={node.title}>
          {children}
        </a>
      );
    },
  }}
>
  <div className="flex">
    <TableOfContents srn="gh/stoplightio/studio-demo" />

    <Page
      className="flex-1"
      srn="gh/stoplightio/studio-demo/docs/introduction.md"
      tabs={({ node }) => {
        const tabs = [{ title: 'Docs', content: <Docs node={node} /> }];

        if (node.type === 'http_operation') {
          tabs.push({ title: 'Try It', content: <TryIt value={node.data} /> });
        }

        tabs.push({ title: 'Dependencies', content: <Dependencies node={node}> });

        tabs.push({ title: 'Changelog', content: <Changelog changes={node.changes}> });

        return tabs;
      }}
    />
  </div>
</Provider>
```

### Contributing

1. Clone repo.
2. Create / checkout `feat/{name}`, `chore/{name}`, or `fix/{name}` branch.
3. Install deps: `yarn`.
4. Make your changes.
5. Run tests: `yarn test.prod`.
6. Stage relevant files to git.
7. Commit: `yarn commit`. _NOTE: Commits that don't follow the [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format will be rejected. `yarn commit` creates this format for you, or you can put it together manually and then do a regular `git commit`._
8. Push: `git push`.
9. Open PR targeting the `master` branch.

