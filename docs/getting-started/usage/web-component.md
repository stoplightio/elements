# Web Component

Integrating Elements into any project is a case of loading up some JavaScript and CSS, and embedding a Web Component (custom HTML) into the HTML of whatever existing documentation you have. 

This will work with pretty much any CMS: Drupal, Joomla, Wordpress, Jekyll, they will all allow custom HTML to be embedded, and this approach is supported by [pretty much all modern browsers](https://caniuse.com/custom-elementsv1).

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

- `apiDescriptionUrl` - OpenAPI document URL, supporting `http://`, `https://`, and documents containing `$ref` to other http(s) documents.
- `basePath` - Helps when using `router: 'history'` but docs are in a subdirectory like `https://example.com/docs/api`.
- `hideTryIt` - Pass `true` to hide the "Try It" panel (the interactive API console).
- `layout` - There are two layouts for Elements:
  - `sidebar` - (default) Three-column design.
  - `stacked` - Everything in a single column, making integrations with existing websites that have their own sidebar or other columns already.
- `logo` - URL to an image that will show as a small square logo next to the title, above the table of contents.
- `router` -  Determines how navigation should work:
  - `history` - (default) uses the HTML5 history API to keep the UI in sync with the URL.
  - `hash` - uses the hash portion of the URL (i.e. window.location.hash) to keep the UI in sync with the URL.
  - `memory` - keeps the history of your "URL" in memory (does not read or write to the address bar).

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

## Next steps

Elements provides you with the components for beautiful API reference documentation, but you'll likely want to add other things to your site such as a landing page, header and footer navigation, etc. Check out our [Twitter Bootstrap](https://github.com/stoplightio/elements/blob/main/examples/bootstrap/project.html) for an idea of how that could look.

## Integrations 

If you would like to see how Elements can be used in other environments, Elements is also available as a ReactJS component, which can be used in all sorts of places:

- [ReactJS](../integrations/react.md)
- [AngularJS](../integrations/angular.md)
- [GatsbyJS](../integrations/gatsby.md)
- [NextJS](../integrations/next.md)

Once you're done and you're docs are live, give us a shout at [@stoplightio](https://twitter.com/stoplightio) and we'll help you share it with the world!
