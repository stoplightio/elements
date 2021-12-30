# Elements in HTML

Setting up Elements is a case of loading up some JavaScript and CSS and embedding a Web Component (custom HTML) into the HTML of your new or existing dev portal. This should work anywhere custom HTML can be embedded and this approach is supported by [pretty much all modern browsers](https://caniuse.com/custom-elementsv1).

For now, the only Web component in the Elements package is `<elements-api/>`, which will display API reference documentation for your OpenAPI. Check out the demo for a live example https://elements-demo.stoplight.io.

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

For more configuration options, lets look at the properties available.

## Configuration

These properties can be provided as HTML attributes to the web component.

- `apiDescriptionUrl` - OpenAPI document URL, supporting `http://`, `https://`, and documents containing `$ref` to other HTTP(S) documents.
- `basePath` - Helps when using `router: 'history'` but docs are in a subdirectory like `https://example.com/docs/api`.
- `hideTryIt` - Pass `"true"` to hide the "Try It" panel (the interactive API console).
- `hideInternal` - Pass `"true"` to filter out any content which has been marked as internal with `x-internal`.
- `layout` - There are two layouts for Elements:
  - `sidebar` - (default) Three-column design.
  - `stacked` - Everything in a single column, making integrations with existing websites that have their own sidebar or other columns already.
- `logo` - URL to an image that will show as a small square logo next to the title, above the table of contents.
- `router` -  Determines how navigation should work:
  - `history` - (default) uses the HTML5 history API to keep the UI in sync with the URL.
  - `hash` - uses the hash portion of the URL (i.e. window.location.hash) to keep the UI in sync with the URL.
  - `memory` - keeps the history of your "URL" in memory (does not read or write to the address bar).
  - `static` - renders using the StaticRouter which can help rendering pages on the server.

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