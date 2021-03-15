# Getting Started with Elements in React

Learn how to quickly get started with Elements in a new React project.

## Create the React App

Run the following command to create a starter React app using [create-react-app](https://github.com/facebook/create-react-app).

```bash
npx create-react-app elements-starter-react
cd elements-starter-react
```

## Install Elements

Next, install the Elements library and it's peer dependencies.

```bash
yarn add @stoplight/elements @stoplight/prism-http mobx
```

In `App.js` import the API component and CSS file from the Elements library.

<!-- title: App.js -->
```jsx
import { API } from '@stoplight/elements';
import '@stoplight/elements/styles.min.css';
```

Now you can replace the existing App component's contents with the API component we just imported.

<!-- title: App.js -->
```jsx
<API
  apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml"
/>
```

> Check out the [API component docs](../components/API.md) to see what other properties are avaiable.

Now your `App.js` file should look something like this:

<!-- title: App.js -->
```jsx
import React from 'react';

import { API } from '@stoplight/elements';
import '@stoplight/elements/styles.min.css';


function App() {
  return (
    <div className="App">
      <API
        apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml"
      />
    </div>
  );
}

export default App;
```

Simple, huh?

## Fire it up

Now start the development server.

```bash
yarn start
```

And you should see the API reference documentation for the Zoom API.

![](https://cdn.stoplight.io/elements/elements-starter-react-zoom-api-reference-docs.png)


## Next steps

Well that was easy, wasn't it? But you're not done yet! Elements provides you with the components for beautiful API reference documentation, but you'll likely want to add other things to your site such as a landing page, header and footer navigations, etc.

If you need some inspiration, check out some of our examples:

- [elements-starter-gatsby](https://github.com/stoplightio/elements-starter-gatsby)
- [elements-starter-react](https://github.com/stoplightio/elements-starter-react)

Once you're done and you're docs are live, give us a shout [@stoplightio](https://twitter.com/stoplightio) and we'll help you share it with the world!
