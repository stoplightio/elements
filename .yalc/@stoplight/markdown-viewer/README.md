# @stoplight/markdown-viewer

<!-- BADGES -->

A Stoplight Markdown viewer React component

- Explore the components: [Storybook](https://stoplightio.github.io/markdown-viewer)
- View the changelog: [Releases](https://github.com/stoplightio/markdown-viewer/releases)

### Features

- Supports [Stoplight markdown annotations](https://meta.stoplight.io/docs/studio/ZG9jOjg0-stoplight-flavored-markdown-smd)
- MDAST-spec compliant
- Theme-able
- Render custom components

## Installation

Supported in modern browsers.

```bash
# markdown viewer + peer deps
yarn add @stoplight/markdown-viewer @stoplight/mosaic @stoplight/mosaic-code-viewer react react-dom
```

## Basic Usage

````tsx
import { DefaultSMDComponents, MarkdownViewer } from '@stoplight/markdown-viewer';
import { JSONSchemaViewer } from '@stoplight/json-schema-viewer';

const markdown = `
### Welcome

Hi there.
```;

<MarkdownViewer
  markdown={markdown}
  includeToc
  parseOptions={{
    components: {
      // Example of overriding the default code renderer for jsonSchema blocks
      code: props => {
        if (props.jsonSchema) {
          return <JSONSchemaViewer value={JSON.parse(props.children)} />;
        }

        // Fallback to the default component mapping
        const DefaultCodeViewer = DefaultSMDComponents.code;
        return <DefaultCodeViewer {...props} />;
      },
    },
  }}
/>;
````

## MarkdownViewerProvider

When overriding components it is often easier to do so once, globally, in the consuming application. To do so just use
the `MarkdownViewerProvider` component.

```tsx
import { MarkdownViewerProvider, MarkdownViewer } from '@stoplight/markdown-viewer';

const markdown = `[my link](http://hello.com)`;

<MarkdownViewerProvider
  components={{
    a: props => <a {...props} data-test="CUSTOM-1" />,
    p: props => <p {...props} data-test="CUSTOM-1" />,
  }}
>
  // somewhere deeper in your application... the custom a and p components will be used when rendering the markdown
  <MarkdownViewer markdown={markdown} />
</MarkdownViewerProvider>;
```

More examples can be find in the [Storybook stories](./src/__stories__/MarkdownViewer.tsx).

## Contributing

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
