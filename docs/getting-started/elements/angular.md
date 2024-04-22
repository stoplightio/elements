# Using Elements in Angular

Learn how to get started with Elements in an Angular project.

## Install Elements

First, install the Elements library.

```bash
yarn add @stoplight/elements
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
yarn ng generate component api-reference
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

Notice `basePath` in the API component. Add a route for the `/api-reference` path in the `app-routing.module.ts` file. It's important to add a catch-all route `**` so you can deep link to paths in the API reference docs.

Your routing file should end up looking like this:

<!--
title: app-routing.module.ts
-->
```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiReferenceComponent } from './api-reference/api-reference.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  {
    path: 'api-reference',
    component: ApiReferenceComponent,
    children: [{ path: '**', component: ApiReferenceComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Finally, set up Angular to allow [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). Head over to the `app-module.ts` file and add the [CUSTOM_ELEMENTS_SCHEMA](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA).

It'll end up looking like this:

<!--
title: app-module.ts
-->
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiReferenceComponent } from './api-reference/api-reference.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, ApiReferenceComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Fire it up

Now, start the development server.

```bash
yarn start
```

And you should see the API reference documentation for the Zoom API.

## Configuration

See [Elements Configuration Options](elements-options.md).
