# @stoplight/tree-list

[![@stoplight/tree-list](https://img.shields.io/npm/v/@stoplight/tree-list.svg)](https://www.npmjs.com/package/@stoplight/tree-list) [![Maintainability](https://api.codeclimate.com/v1/badges/5873a5e9df9590071bc9/maintainability)](https://codeclimate.com/repos/5c0607a04434ef5e6a0005d4/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/5873a5e9df9590071bc9/test_coverage)](https://codeclimate.com/repos/5c0607a04434ef5e6a0005d4/test_coverage)

<!-- SUMMARY -->

- Explore the components: [Storybook](https://stoplightio.github.io/tree-list)
- View the changelog: [Releases](https://github.com/stoplightio/tree-list/releases)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [TreeList Props](#treelist-props)
- [TreeList Store](#treelist-store)
- [Contributing](#contributing)

### Features

- Component for rendering a flat list of nodes in a tree like interface.
- Drag and drop support
- Context menu support

### Installation

Supported in modern browsers.

```bash
# latest stable
yarn add @stoplight/tree-list
```

### Usage

```jsx
import { TreeList, TreeStore } from "@stoplight/tree-list";

const nodes = [
  {
    id: '1',
    level: 0,
    name: 'Folder',
    canHaveChildren: true,
  },
  {
    id: '2',
    level: 1,
    name: 'Nested Folder',
    canHaveChildren: true,
  },
  {
    id: '3',
    level: 2,
    name: 'Nested File',
  },
  {
    id: '4',
    name: 'File',
    level: 0,
  }
];

const store = new TreeStore({ nodes );

<TreeList
  store={store}
  onNodeClick={(e, node) => {
    store.toggleExpanded(node);
  }}
/>
```

### TreeList Props

`nodeRenderer` is called every time when TreeList renders a row. It has two arguments: current node and current state. It should return a React component.

`onNodeClick`, `onNodeDoubleClick`, `onNodeToggle` - are called when an according event occur. They have two arguments: current node and an event object.

`generateContextMenu` is called when a TreeNode is right clicked. It is given the tree node and the tree API and expects to return an array of ContextMenu items.

`canDrag` is called to determine if a given node can be dragged.

`canDrop` is called to determine if a given node can be dropped on a different parent node during the drag process.

`handleDrop` is called when a given node is dropped onto a new parent node.

### TreeList Store

The tree list store is exported as `TreeStore` in the main entry.

`nodes` is an array of INode:

```ts
interface INode {
  id: string;
  level: number;
  metadata?: object;
  canHaveChildren?: boolean;

  name?: string;
  icon?: IIcon['icon'];
}
```

`create` adds an editable input to the tree list and returns a promise that resolves once the user hits the `<enter>` key. The promise is rejected if the user clicks out of the input (onBlur) or if the user hits the `<esc>` key.
It also accepts a custom validator which is called on input when a tree node upon creation. It should return an error to be shown or `null` if no error.

`rename` turns a given tree node into an editable input and returns a promise that resolves once the user hits the `<enter>` key. The promise is rejected if the user clicks out of the input (onBlur) or if the user hits the `<esc>` key.
It also accepts a custom validator which is called on input when a tree node upon renaming. It should return an error to be shown or `null` if no error.

`cancel` is used to reset any editable inputs back to tree nodes.

`toggleExpand` can be used to manipulate expanded state of given node.

**Here's some example usage:**

```tsx
import { TreeList, TreeStore } from "@stoplight/tree-list";

const store = new TreeStore();
const customStore = new CustomStore(); // An optional custom store that contains methods to update tree store

function Tree() {
  // Create a reference to the tree list API
  return (
    <div>
      <button
        onClick={() => store.create()}
      >
        Create
      </button>

      <button
        onClick={() => store.cancel()}
      >
        Cancel
      </button>

      <TreeList
        store={store}
        generateContextMenu={getContextMenu}
      />
    </div>
  );
}

function getContextMenu(node: TreeListNode) {
  const menuItems = [
    {
      title: "Rename",
      onClick() {
        store.rename(node).then((newNode) => {
          customStore.renameNode(node.id, node.name);
        });
      },
    },
    {
      title: "Delete",
      onClick() {
        customStore.deleteNode(node.id);
      },
    }
  ];

  if (node.canHaveChildren) {
    menuItems.unshift({
      title: 'Create',
      onClick() {
        store.create(node).then((newNode, parentNode) => {
          customStore.addNode(newNode, parentNode);
        });
      }
    });
  }

  return menuItems;
}
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
