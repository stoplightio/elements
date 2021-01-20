# Stoplight Elements - React App Example

## Table Of Contents

- [Stoplight Elements - React App Example](#stoplight-elements---react-app-example)
  - [Table Of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Stoplight Project](#stoplight-project)
    - [Stoplight API](#stoplight-api)
  - [Trying the example](#trying-the-example)
    - [Installation](#installation)
    - [Usage](#usage)
      - [**Stoplight Project**](#stoplight-project-1)
      - [**Stoplight API**](#stoplight-api-1)
    - [**Functionalities**](#functionalities)
  - [Elements in your own React App](#elements-in-your-own-react-app)
    - [Step 1 - Install Elements](#step-1---install-elements)
    - [Step 2 - Embed Elements](#step-2---embed-elements)
    - [Step 3 - open your app](#step-3---open-your-app)

## Overview

Stoplight Elements can be embedded natively in React app. This example demonstrates usage of Stoplight Project and Stoplight API components and presents how to embed Elements in your own application.

### Stoplight Project

This component allows embedding documentation that is connected to a Stoplight workspace. In this example, we are referring to [elements.stoplight.io](https://elements.stoplight.io) workspace - [studio-demo](https://elements.stoplight.io/docs/studio-demo) project to be more precise.

### Stoplight API

Stoplight API component allows embedding documentation with no limitations to the file localization - it can be either on your webpage/app server or anywhere on the web. In this example, we connect the `Stoplight API` directly to [To-Dos](https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json) OAS2 .JSON file hosted on GitHub.

## Trying the example

### Installation

Clone the [@stoplight/elements-example-react-app](https://github.com/stoplightio/elements/tree/beta/) repo and check out the `main` branch if you haven't already:

```bash
git clone https://github.com/stoplightio/elements-starter-react.git

cd elements-starter-react

git checkout main
```

Install dependencies using `yarn`:

```bash
yarn
```

Including peer dependencies:

```bash
yarn add -D @stoplight/prism-http \
mobx \
react \
react-dom \
vis-network
```

If the above was successful, launch the example project using `yarn start`:

![project launching](https://user-images.githubusercontent.com/58433203/92106507-c7e19e80-ede4-11ea-99f6-190ab309c424.png)

Now if you open your browser and navigate to http://localhost:300/ as instructed, you will see a React App that contains both Stoplight Project and Stoplight API components embedded in it.

### Usage

#### **Stoplight Project**

Click on the `Stoplight Project` button in the topbar menu to see that component in action:

![stoplight-project-example](https://user-images.githubusercontent.com/58433203/92106502-c617db00-ede4-11ea-8331-34b65bd36391.png)

#### **Stoplight API**

Click on the `Stoplight API` button in the topbar menu to see that component in action:

![stoplight-project-example](https://user-images.githubusercontent.com/58433203/92106493-c31cea80-ede4-11ea-95fa-e786b6b00efa.png)

### **Functionalities**

* Navigate to Markdown section in order to see our beautiful Markdown Viewer in action

* Open any of the models to take a look at JSON Schema Viewer (JSV)

* View basic information about a given API in `Overview` section

* Open API endpoints to preview their properties and try out Http Request Maker

## Elements in your own React App

### Step 1 - Install Elements

In order to use Elements in React, we need to use the [@stoplight/elements](https://www.npmjs.com/package/@stoplight/elements) package from NPM. Let's add it:

```bash
# in case you use NPM
npm install @stoplight/elements
# in case you use Yarn
yarn add @stoplight/elements
```

### Step 2 - Embed Elements

This step describes embedding Elements component in a single-page React App

1. Create a React component e.g. components/API.*
   * Import desired component from `@stoplight/elements`
   * Import styles from `@stoplight/elements/styles/elements.scss`
   * Create React Functional Component

For `Stoplight API` you need to add `apiDescriptionUrl` property

```tsx
import React from 'react';
import { API } from '@stoplight/elements';
import '@stoplight/elements/styles/elements.scss';

export const StoplightAPI: React.FC = () => {
  return (
    <API apiDescriptionUrl="$YOUR-FILE-URL"></API>
  );
};
```

For `Stoplight Project` you need `workspace` and `project` properties

```tsx
import React from 'react';
import { StoplightProject } from '@stoplight/elements';
import '@stoplight/elements/styles/elements.scss';

export const StoplightProjectDocs: React.FC = () => {
  return (
    <div>
      <StoplightProject workspaceSlug="$STOPLIGHT-WORKSPACE-SLUG" projectSlug="#PROJECT-SLUG"></StoplightProject>
    </div>
  );
};
```

2. Import and add created component to your `App.` file:

```tsx
import React, { Component } from 'react';

import { StoplightAPI } from './components/API';

class App extends Component {
  render() {
    return <StoplightAPI></StoplightAPI>;
  }
}

export default App;

```

### Step 3 - open your app

At this step you are ready to open your app and see the embedded Elements component. Enjoy!

Check out the Elements documentation for more details: [@stoplight-elements](https://www.npmjs.com/package/@stoplight/elements)
