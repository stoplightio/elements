# Elements Dev Portal in React

Learn how to get started with Elements Dev Portal in a React project.

## Create React App Template

Use the [React App template](https://github.com/stoplightio/cra-template-elements-dev-portal) to create a new Elements Dev Portal website in React without additional setup.

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