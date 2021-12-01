# @stoplight/json-schema-viewer

A JSON Schema viewer React component

- Explore the components: [Storybook](https://stoplightio.github.io/json-schema-viewer)
- View the changelog: [Releases](https://github.com/stoplightio/json-schema-viewer/releases)

### Features

- Full JSON Schema Draft 4 support, including `oneOf` and `anyOf` combiner properties
- Renders complicated nested objects to any depth
- Renders validation properties and markdown descriptions
- Capable of linking resolved \$refs
- Theme-able
- Collapsible

### Installation

Supported in modern browsers and node.

```bash
# latest stable
yarn add @stoplight/json-schema-viewer
```

### Usage

```jsx
// index.jsx
import { JsonSchemaViewer } from "@stoplight/json-schema-viewer";

<JsonSchemaViewer
  name="Todos Model"
  schema={schema}
  expanded={true}
  hideTopBar={false}
  emptyText="No schema defined"
  defaultExpandedDepth={0}
/>;
```

More examples can be find in the [Storybook stories](./src/__stories__/JsonSchemaViewer.tsx).

### Contributing

1. Clone repo.
2. Create / checkout `feature/{name}`, `chore/{name}`, or `fix/{name}` branch.
3. Install deps: `yarn`.
4. Make your changes.
5. Run tests: `yarn test.prod`.
6. Stage relevant files to git.
7. Commit: `yarn commit`. _NOTE: Commits that don't follow the [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format will be rejected. `yarn commit` creates this format for you, or you can put it together manually and then do a regular `git commit`._
8. Push: `git push`.
9. Open PR targeting the `develop` branch.
