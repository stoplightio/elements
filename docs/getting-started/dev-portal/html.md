# Elements Dev Portal in HTML

Setting up Elements Dev Portal is a case of loading up some JavaScript and CSS and embedding a Web Component (custom HTML) into the HTML of your new or existing developer portal. This should work anywhere custom HTML can be embedded and this approach is supported by [pretty much all modern browsers](https://caniuse.com/custom-elementsv1).

For now, the only component in the Dev Portal package is `<elements-stoplight-project/>`, which lets users display Stoplight Projects where they want. 

## Usage

1. Load the Elements Dev Portal JavaScript and default CSS. These can go in the `<head>` tag.
  
```html
<script src="https://unpkg.com/@stoplight/elements-dev-portal/web-components.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@stoplight/elements-dev-portal/styles.min.css">  
```

2. Find the "Project ID" from the Project Settings view of your Stoplight Project.

> Project Settings can only be viewed by Project Editors or above. Read more about [project permissions](https://docs.stoplight.io/docs/platform/ZG9jOjg1NjcyNzE-manage-project-access#project-roles).

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

5. Finally, serve it with an HTTP server. Grab any HTTP server you like, such as the NPM [http-server](https://www.npmjs.com/package/http-server).

```bash
$ npm install -g http-server
$ http-server

Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.1.28:8080
```

Open up [127.0.0.1:8080](http://127.0.0.1:8080) in the browser and there it should be, Elements in all its glory.

## Configuration

See [Dev Portal Configuration Options](dev-portal-options.md). 

## Examples

<!-- title: Hiding Try It and Mocking -->

```html
<elements-stoplight-project
  projectId="cHJqOjYyNTgw"
  router="hash"
  hideTryIt="true"
  hideMocking="true"
></elements-stoplight-project>
```

## Next steps

You can customize things to your heart's content by wrapping this component in other HTML and changing the CSS, like this [Twitter Bootstrap](https://github.com/stoplightio/elements/blob/main/examples/bootstrap/project.html) example.

Once you're done and your docs are live, send a note to [@stoplightio](https://twitter.com/stoplightio) and Stoplight can help you share them with the world.