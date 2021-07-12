## Hello World

Elements is powered by the popular "API Description Format" known as [OpenAPI](https://openapis.org/), and formerly known as Swagger.

### Learning OpenAPI

The official [OpenAPI documentation](https://oai.github.io/Documentation/introduction.html) can help teach you what you need to learn about the official YAML/JSON flavours, or you can grab [Stoplight Studio](https://stoplight.io/studio/?utm_source=github&utm_medium=elements&utm_campaign=docs) (or any other [visual OpenAPI editor](https://openapi.tools/#gui-editors)) to avoid needing to learn all that syntax yourself.

Either way, there are lots of sample documents around. Let's use the canonical Tic Tac Toe example. Seeing as it's quite a lot of clunky YAML you probably don't want to look at, use this following Mac/Linux command to get the file saved locally (or open it in your browser and save the file).

```bash
mkdir elements-hello-world
cd elements-hello-world
wget https://raw.githubusercontent.com/OAI/Documentation/master/examples/tictactoe.yaml
```

Now a file called `tictactoe.yaml` should be sat on your computer.
### Running Elements

Until the [Elements CLI is ready](https://github.com/stoplightio/elements/issues/765), the quickest way to see how this API looks in Elements is to make an `index.html` and embed Elements as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).


```bash
cat > index.html <<EOL
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
EOL
```

You can run that whole command and run it all in the terminal, but if it's not working just copy and paste everything between `<!doctype html>` and `</html>` and put it in a file called `index.html`.

Finally, let's serve it with a HTTP server. Grab any HTTP server you like, maybe the NPM [http-server](https://www.npmjs.com/package/http-server).

```bash
$ npm install -g http-server
$ http-server

Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.1.28:8080
```

Open up [127.0.0.1:8080](http://127.0.0.1:8080) in the browser and there it should be, Elements in all its glory.

-----------

Learn more about [Elements API web component](../getting-started/usage/web-component.md) if you're curious, or let's move onto the next topic: [what makes great API docs](great-api-docs.md).
