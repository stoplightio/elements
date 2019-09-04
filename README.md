# @stoplight/elements
[![npm version](https://badge.fury.io/js/%40stoplight%2Felements.svg)](https://badge.fury.io/js/%40stoplight%2Felements) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://stoplightio.github.io/elements)

UI components for composing beautiful developer documentation

<!-- BADGES -->


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

### Widgets

Elements can be used as a plain JS library.

**Load the elements library:**

Add the following script tag to the head tag of your website, BEFORE other css or script tags.

```html
<head>
  <!-- Stoplight Elements -->
  <link rel="stylesheet" href="https://stoplight.io/static/elements/bundle.v1.css" media="print" onload="this.media='all'">
  <script async defer src='https://stoplight.io/static/elements/bundle.v1.js' onload="__onElementsLoad()"></script>
  <script>
    function __onElementsLoad() {
      // Let elements know where the Stoplight API is running
      SL.config.host = "https://stoplight.io/api";

      // Emit the SL.ready event so that any code that needs SL can start using it
      window.dispatchEvent(new Event('SL.ready'));
    }
  </script>
  <!-- End Stoplight Elements -->

  <!-- ... other script and css elements -->
</head>
```

**Global "SL" object:**

The global variable made available on the page after the elements library has been loaded.

```ts
declare namespace SL {
  interface IWidget {
    srn: string;
    render(htmlId: string, srn: string): void;
    remove(): void;
  }

  // React.createElement
  const createElement: any;

  const config: {
    host?: string;
    token?: string;
    components?: any;
  };

  const elements: {
    hub: IWidget;
    page: IWidget;
    toc: IWidget;
  };
}
```

**Render a table of contents onto the page:**

```ts
// Takes two arguments - the html element id, and a stoplight SRN for the project table of contents to render.
SL.elements.toc.render('my-container-element-id', 'gh/stoplightio/studio-demo');
```

**Render a specific page:**

```ts
// Takes two arguments - the html element id, and a stoplight SRN for the node to render (article, api, model, http operation, etc).
SL.elements.page.render('my-container-element-id', 'gh/stoplightio/studio-demo/docs/README.md');
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
