# Elements in HTML

Setting up Elements is a case of loading up some JavaScript and CSS and embedding a Web Component (custom HTML) into the HTML of your new or existing developer portal. This should work anywhere custom HTML can be embedded and this approach is supported by [pretty much all modern browsers](https://caniuse.com/custom-elementsv1).

For now, the only Web component in the Elements package is `<elements-api/>`, which displays API reference documentation for your OpenAPI. Check out the demo for a live example: https://elements-demo.stoplight.io.

## Usage

1. Load the Elements web component JavaScript and default CSS. These can go in the `<head>` tag.
  
```html
<script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">  
```

2. Find an OpenAPI document to work with. You could create a document using [Stoplight Studio](https://stoplight.io/studio), [generate it from source code](https://stoplight.io/blog/generate-documentation-from-code/), or browse through some [real-world examples](https://apis.guru/browse-apis/).

3. Embed the web component inside the HTML `<body>` tag.

```html
<elements-api
  apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/todo.v1.yaml"
  router="hash"
/>
```

Alternatively, copy and paste this into an `index.html` and open it in a browser.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Elements in HTML</title>
  
    <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
  </head>
  <body>

    <elements-api
      apiDescriptionUrl="tictactoe.yaml"
      router="hash"
    />

  </body>
</html>
```
## Configuration

See [Elements Configuration Options](elements-options.md). 

## Examples

<!-- title: Zoom API with a sidebar and memory router -->

```html
<elements-api
  apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml"
  layout="sidebar"
  router="memory"
/>
```

<!-- title: GitHub API with a Stacked Layout -->

```html
<elements-api
  apiDescriptionUrl="https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml"
  layout="stacked"
/>
```

<!-- title: Hiding "Try It" -->

```html
<elements-api
  apiDescriptionUrl="https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml"
  hideTryIt="true"
/>
```

<!-- title: GitHub API over HTTP using `apiDescriptionDocument` -->

```html
<elements-api id="docs" router="hash" layout="sidebar"></elements-api>
<script>
  (async () => {
    const docs = document.getElementById('docs');
    const text = await fetch('https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml').then(res => res.text())
    docs.apiDescriptionDocument = text;
  })();
</script>
```

<!-- title: Component with API Description Provided Directly -->

```html
<elements-api id="docs" router="hash" layout="sidebar"></elements-api>
<script>
(async () => {
  const docs = document.getElementById('docs');
  const apiDescriptionDocument = {
    openapi: '3.1.0',
    info: {
      title: 'Some Awesome API',
      version: '1.0.0'
    },
    paths: {
      /* ... */
    }
  };

  docs.apiDescriptionDocument = apiDescriptionDocument;
})();
</script>
```

<!-- title: Component with API Description Provided Directly, Fetched Over HTTP -->

```html
<elements-api id="docs" router="hash" layout="sidebar"></elements-api>
<script>
  (async () => {
    const docs = document.getElementById('docs');
    const text = await fetch('https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml').then(res => res.text())
    docs.apiDescriptionDocument = text;
  })();
</script>
```
