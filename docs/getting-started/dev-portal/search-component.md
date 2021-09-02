# search-component

Once youve [installed]() the elements-dev-portal package, you can use the search component to offer an autocomplete search...

As with our other components, these can be used as a Web Component or a JavaScript component.

## Web Component

Embed the web component inside the HTML `<body>` tag, and enter the project ID.

```html
<elements-search
  hows it work?!
></elements-search>
```

fjskdfhdshf

screenshot 

Search component in top nav maybe using `elements/examples/bootstrap/project.html` updated to use our search bar

_Are there any other configuration options?_

## JavaScript

If you'd like to use this for React (and React-based tools like Gatsby) then use the `Search` JavaScript component.

```jsx
<Search projectId="cHJqOjYyNTgw" />
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
      <StoplightProject projectId="cHJqOjYyNTgw" />
    </div>
  );
}
```
