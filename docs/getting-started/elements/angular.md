# Using Elements in Angular

Learn how to get started with Elements in an Angular project.

## Install Elements

First, install the Elements library.

```bash
npm install @stoplight/elements
```

Add the Elements CSS and JavaScript bundles to your Angular config.

<!-- title: angular.json -->
```jsx
{
  "projects": {
    "elements-starter-angular": {
      // ...
      "architect": {
        "build": {
          // ...
          "options": {
            // ...
            "styles": [
              // ...
              "node_modules/@stoplight/elements/styles.min.css"
            ],
            "scripts": [
              // ...
              "node_modules/@stoplight/elements/web-components.min.js"
            ]
          }
        }
      }
    }
  }
}
```

Now, generate a new Angular component for your API reference docs.

```bash
npx ng generate component api-reference --type=component
```

This should generate an `api-reference` folder with a few files. In the `api-reference.component.html` file, add the Stoplight API component.

<!--
title: api-reference.component.html
-->
```html
<elements-api
  apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml"
  basePath="/api-reference"
></elements-api>
```

Notice `basePath` in the component above. Add a route for the `/api-reference` path in the `app.routes.ts` file. It's important to add a catch-all route (`**`) so you can deep link to paths in the API reference docs.

Your routes file should end up looking like this:

<!--
title: app.routes.ts
-->
```ts
import { Routes } from '@angular/router';

import { ApiReferenceComponent } from './api-reference/api-reference.component';

export const routes: Routes = [
  { path: 'api-reference/**', component: ApiReferenceComponent },
];
```

Finally, set up Angular to allow [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). Head over to the `api-reference.component.ts` file and add the [CUSTOM_ELEMENTS_SCHEMA](https://angular.dev/api/core/CUSTOM_ELEMENTS_SCHEMA) to the component.

It'll end up looking like this:

<!--
title: api-reference.component.ts
-->
```ts
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-api-reference',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './api-reference.component.html',
})
export class ApiReferenceComponent {}
```

## Fire it up

Now, start the development server.

```bash
npm start
```

And you should see the API reference documentation for the Zoom API.

## Configuration

See [Elements Configuration Options](elements-options.md).
