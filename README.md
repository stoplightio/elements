# Stoplight Elements

UI components for composing beautiful developer documentation
# ⚠ Elements v5 is discontinued

*Stoplight Elements v5* is **not supported** and is **not compatible with the new Stoplight Platform**.

For a quick fix to work [the latest Stoplight Platform](https://stoplight.io/blog/stoplight-v2-0-0-release/), please upgrade to v6, but please know that is always unsupported. This was a limited release for a select group of customers.

We are working on an awesome new open-source version of Elements which will be generally available. Sign up for [early-access here](https://stoplight.io/open-source/elements/)!

### Installation

```bash
yarn add @stoplight/elements@v5
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
