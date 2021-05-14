# Getting Started with Elements in React

Learn how to quickly get started with Elements in a React project.

## Using Elements in ReactJS

Next, install the Elements library and it's peer dependencies.

```bash
yarn add @stoplight/elements
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

## Fire it up

Now start the development server.

```bash
yarn start
```

And you should see the API reference documentation for the Zoom API!

## Configuration

- `apiDescriptionUrl` - OpenAPI document URL, supporting `http://`, `https://`, and documents containing `$ref` to other http(s) documents.
- `apiDescriptionDocument` - OpenAPI document, provided as YAML string, JSON string or JavaScript object.
- `basePath` - Helps when using `router: 'history'` but docs are in a subdirectory like `https://example.com/docs/api`.
- `layout` - There are two layouts for Elements:
  - `sidebar` - (default) Three-column design.
  - `stacked` - Everything in a single column, making integrations with existing websites that have their own sidebar or other columns already.
- `logo` - Object containing a few options for the small square logo next to the title, above the table of contents.
  - `url` - URL of an image to use as the logo.
  - `backgroundColor` - Set the background color with a hex code, e.g.: `"#0f0f0f`.
  - `altText` - Set alternative text for screen-readers. 
  - `href` - Link if somebody clicks the logo.
- `router` -  Determines how navigation should work:
  - `history` - (default) uses the HTML5 history API to keep the UI in sync with the URL.
  - `hash` - uses the hash portion of the URL (i.e. window.location.hash) to keep the UI in sync with the URL.
  - `memory` - keeps the history of your "URL" in memory (does not read or write to the address bar).

## Examples

-<!-- title: React Component with API Description Provided as a URL -->

<API
  apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/eference/zoom/openapi.yaml"
  router="hash"
/>


<!-- title: React Component with API Description Provided Directly -->

```jsx
import { API } from "@stoplight/elements";

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

<API
  apiDescriptionDocument={apiDescriptionDocument}
  router="hash"
/>
