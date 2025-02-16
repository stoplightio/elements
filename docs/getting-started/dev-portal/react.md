# Elements Dev Portal in React

Learn how to get started with Elements Dev Portal in a React project.

## Create React App Template

Use the [React App template](https://github.com/stoplightio/cra-template-elements-dev-portal) to create a new Elements Dev Portal website in React without additional setup.

> Note: [The Create React App template only works with version 4 of create-react-app because of Webpack 5 polyfill issues.](https://github.com/facebook/create-react-app/issues/11756)
> To run it with new create-react-app and Webpack 5 check [Polyfills](#Polyfills) section

```bash
npx create-react-app my-dir --template @stoplight/elements-dev-portal
```

Then, run `cd my-dir` and `yarn start` to see a basic Elements Dev Portal website in the browser.

When the server has started, navigate to `http://localhost:3000` to see Elements Dev Portal rendering an [example Git project](https://github.com/stoplightio/studio-demo). Follow the instructions below to change your `projectId` and load up one of your projects.

## Manual Setup

To install Elements Dev Portal in an existing React app, follow these instructions.

1. Install the [`@stoplight/elements-dev-portal`](https://www.npmjs.com/package/@stoplight/elements-dev-portal) package with NPM/Yarn.

```bash
yarn add @stoplight/elements-dev-portal
```

2. In `App.js` import the API component and CSS file from the Elements library.

```jsx
import { StoplightProject } from '@stoplight/elements-dev-portal';
import '@stoplight/elements-dev-portal/styles.min.css';
```

3. Find the **Project ID** from the **Project Settings** page in your Stoplight project. See [Project Settings](https://docs.stoplight.io/docs/platform/252039ebe8fb2-project-settings) for details.

> Project Settings can only be viewed by Project Editors or above. Read more about [project permissions](https://docs.stoplight.io/docs/platform/ZG9jOjg1NjcyNzE-manage-project-access#project-roles).

![The project ID can be found on the Project Settings page in a text box after Display Name and Slug](../../images/projectId.png)

4. Now you can replace the existing App component's contents with the StoplightProject component.

```jsx
<StoplightProject projectId="INSERT_YOUR_PROJECT_ID_HERE" />
```

Now your `App.js` file should look something like this:

<!-- title: App.js -->
```jsx
import React from 'react';

import { StoplightProject } from '@stoplight/elements-dev-portal';
import '@stoplight/elements-dev-portal/styles.min.css';


function App() {
  return (
    <div className="App">
      <StoplightProject projectId="INSERT_YOUR_PROJECT_ID_HERE" />
    </div>
  );
}

export default App;
```

## Configuration

See [Dev Portal Configuration Options](dev-portal-options.md).

## Fire it up

Now start the development server.

```bash
yarn start
```

And you should see the API reference documentation for the Zoom API.

## Polyfills
Create React App is now using Webpack 5 that doesn't come with node polyfills anymore. Since elements dependencies use `url` and `buffer` packages they need to be added separately. The easiest way to do that is to include [node-polyfill-webpack-plugin](https://github.com/Richienb/node-polyfill-webpack-plugin) in webpack configuration file:
```js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
...
plugins: [
  // Other plugins...
  new NodePolyfillPlugin(),
]
```
In case of CRA it can be done either by:
1. Ejecting CRA configuration:
- running `npm eject` script
- installing `node-polyfill-webpack-plugin`
- adding `NodePolyfillPlugin` to `config/webpack.config.js` as shown above

2. Using `react-app-rewired` package that overrides CRA webpack config without ejecting:
- installing `react-app-rewired`
- installing  `node-polyfill-webpack-plugin`
- overriding default scripts in `package.json`:
```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
}
```
- creating `config-overrides.js` configuration file in root directory:
```js
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config, env) {
  config.plugins.push(
    new NodePolyfillPlugin()
  );
  return config;
};
```
In case of Docusaurus it can be done by:
- installing `node-polyfill-webpack-plugin`
- creating a new file for the plugin such as `./plugins/webpackPolyfillPlugin.js`:
```js
// ./plugins/webpackPolyfillPlugin.js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function (context, options) {
  return {
    name: 'webpack-polyfill-plugin',
    configureWebpack(config, isServer, utils) {
      return {
        plugins: [new NodePolyfillPlugin()],
      };
    },
  };
};
```
- using the custom plugin in docusaurus configuration:
```js
// docusaurus.config.js
module.exports = {
  ...
  plugins: [
    ...
    require.resolve('./plugins/webpackPolyfillPlugin'),
  ],
};
```
Since Docusaurus makes use of SSR when running it with `StoplightProject`, default `history` (`BrowserRouter`) router should not be used.
