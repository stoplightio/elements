# @stoplight/markdown-viewer

<!-- BADGES -->

A Stoplight Markdown viewer React component

- Explore the components: [Storybook](https://stoplightio.github.io/markdown-viewer)
- View the changelog: [Releases](https://github.com/stoplightio/markdown-viewer/releases)

### Features

- Supports Stoplight markdown annotations
- MDAST-spec compliant
- Theme-able
- Render custom components

### Installation

Supported in modern browsers.

```bash
# latest stable
yarn add @stoplight/markdown-viewer
```

### Usage

````jsx
import { DefaultSMDComponents, MarkdownViewer } from "@stoplight/markdown-viewer";
import { JSONSchemaViewer } from "@stoplight/json-schema-viewer";

const markdown = `
### Features

- **Full** JSON Schema Draft 4 support, including `oneOf` and `anyOf` combiner properties
- Renders complicated nested objects to any depth
- Renders validation properties and markdown descriptions
- Theme-able
- Collapsible

```json_schema
{
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    address: {
      type: 'object',
      properties: {
        street_address: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
      },
      required: ['street_address', 'city', 'state'],
    },
  },
  type: 'object',
  properties: {
    billing_address: {
      $ref: '#/definitions/address',
    },
    shipping_address: {
      $ref: '#/definitions/address',
    },
  },
}
```;
`;

<MarkdownViewer
  markdown={markdown}
  components={{
    // Override the default code renderer for json_schema blocks
    code: (props) => {
      if (props.json_schema) {
        return <JSONSchemaViewer value={JSON.parse(props.children)} />;
      }

      // Fallback to the default component mapping
      const DefaultCodeViewer = DefaultSMDComponents.code;
      return <DefaultCodeViewer {...props} />;
    }
  }}
/>
````

More examples can be find in the [Storybook stories](./src/__stories__/MarkdownViewer.tsx).

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
