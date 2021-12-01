# @stoplight/json-schema-tree

<!-- BADGES -->

### Use cases

- json-schema-viewer
- json-schema-editor
- masking

### Installation

Supported in modern browsers and Node.JS (>=10.18).

```bash
# latest stable
yarn add @stoplight/json-schema-tree
```

### Usage

```js
import { SchemaTree, SchemaNodeKind, isRegularNode } from '@stoplight/json-schema-tree';

const tree = new SchemaTree(mySchema);
const ALLOWED_DEPTH = 2;

tree.walker.hookInto('stepIn', node => tree.walker.depth <= ALLOWED_DEPTH); // if flattening is needed, this might need to be tweaked to account for the scenarios where certain nodes can be merged (i.e. arrays)

tree.walker.hookInto('filter', node => {
  return !isRegularNode(node) || node.types === null || !node.types.includes(SchemaNodeKind.Integer); // if a schema property is of type integer, it won't be included in the tree
});

tree.populate();

tree.root; // populated tree
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
9. Open PR targeting the `master` branch.
