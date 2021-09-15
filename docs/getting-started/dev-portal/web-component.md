# Setup



## Web Component

Setting up Elements Dev Portal is a case of loading up some JavaScript and CSS, and embedding a Web Component (custom HTML) into the HTML of whatever existing documentation you have. 

This will work with pretty much any CMS: Drupal, Joomla, Wordpress, Jekyll, they will all allow custom HTML to be embedded, and this approach is supported by [pretty much all modern browsers](https://caniuse.com/custom-elementsv1).

For now, the only component in the DevPortal package is `<elements-stoplight-project/>`, which lets users render Stoplight Projects wherever they want. There will eventually be more types of dev portal in the package. 

## Usage

1. Load the Elements Dev Portal JavaScript and default CSS. These can go in the `<head>` tag.
  
```html
<script src="https://unpkg.com/@stoplight/elements-dev-portal/web-components.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@stoplight/elements-dev-portal/styles.min.css">  
```

2. Find the "Project ID" from the Project Settings view of your Stoplight Project.

> Project Settings can only be viewed by Project Editors or above. Read more about project permissions [here](https://meta.stoplight.io/docs/platform/ZG9jOjg1NjcyNzE-manage-project-access#project-roles).

![The project ID can be found on the Project Settings page in a text box after Display Name and Slug](../../images/projectId.png)


3. Embed the web component inside the HTML `<body>` tag, and enter the project ID.

```html
<elements-stoplight-project
  projectId="cHJqOjYyNTgw"
  router="hash"
></elements-stoplight-project>
```

Alternatively, copy and paste this into an `index.html` and open it in a browser.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Elements Dev Portal</title>
  
    <script src="https://unpkg.com/@stoplight/elements-dev-portal/web-components.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements-dev-portal/styles.min.css">
  </head>
  <body>

    <elements-stoplight-project
      projectId="cHJqOjYyNTgw"
      router="hash"
    ></elements-stoplight-project>

  </body>
</html>
```

5. Finally, let's serve it with a HTTP server. Grab any HTTP server you like, maybe the NPM [http-server](https://www.npmjs.com/package/http-server).

```bash
$ npm install -g http-server
$ http-server

Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.1.28:8080
```

Open up [127.0.0.1:8080](http://127.0.0.1:8080) in the browser and there it should be, Elements in all its glory.


For more configuration options, lets look at the properties available.

## Configuration

These properties can be provided as HTML attributes to the web component.

- `projectId` - Find the Project ID in the Project Settings screen on Stoplight.
- `platformUrl` - By default this is `https://stoplight.io/` and this default will be fine for most people. Some enterprise customers might need to change it.
- `basePath` - Helps when using `router: 'history'` but docs are in a subdirectory like `https://example.com/docs/api`.
- `collapseTableOfContents` - Pass `true` to stop the table of contents expanding folders of articles, and showing lists of endpoints for an API. This will clean up the ToC if you have a lot of content.
- `hideMocking` - Pass `true` to disable all mocking options and remove mention of the mock server.
- `hideTryIt` - Pass `true` to hide the "Try It" panel (the interactive API console).
- `router` -  Determines how navigation should work:
  - `history` - (default) uses the HTML5 history API to keep the UI in sync with the URL.
  - `hash` - uses the hash portion of the URL (i.e. window.location.hash) to keep the UI in sync with the URL.
  - `memory` - keeps the history of your "URL" in memory (does not read or write to the address bar).

## Next steps

You can customize things to your hearts content by wrapping this component in other HTML and changing the CSS, like this [Twitter Bootstrap](https://github.com/stoplightio/elements/blob/main/examples/bootstrap/project.html) example.

Once you're done and you're docs are live, give us a shout at [@stoplightio](https://twitter.com/stoplightio) and we'll help you share it with the world!
