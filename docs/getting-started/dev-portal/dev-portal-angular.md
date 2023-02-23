# Elements Dev Portal in Angular

Learn how to get started with Elements Dev Portal in an Angular project.

## Create a Stoplight Project

1. [Create a Stoplight workspace and project](https://docs.stoplight.io/docs/platform/ZG9jOjQ2OTE4Njk3-quickstart-guide#create-a-project).
2. Locate and copy the **Project ID** from the **Project Settings** view of your Stoplight project.

> Project Settings can only be viewed by project editors or above. Read more about [project permissions](https://docs.stoplight.io/docs/platform/ZG9jOjg1NjcyNzE-manage-project-access#project-roles).

## Install Elements

Install the Elements Dev Portal library.

```bash
yarn add @stoplight/elements-dev-portal
```

Add the Elements CSS and JavaScript bundles to your Angular config.

<!-- title: angular.json -->
```jsx
{
  "projects": {
    "elements-dev-portal-starter-angular": {
      // ...
      "architect": {
        "build": {
          // ...
          "options": {
            // ...
            "styles": [
              // ...
              "node_modules/@stoplight/elements-dev-portal/styles.min.css"
            ],
            "scripts": [
              // ...
              "node_modules/@stoplight/elements-dev-portal/web-components.min.js"
            ]
          }
        }
      }
    }
  }
}
```

Generate a new Angular component for the API reference docs.

```bash
yarn ng generate component api-reference
```

This should generate an `api-reference` folder with a few files. In the `api-reference.component.html` file, add the Stoplight API component.

Embed the web component inside the HTML `<body>` tag, and enter the project ID, as shown in the example below.

<!--
title: api-reference.component.html
-->
```html
<elements-stoplight-project
 projectId="your-project-id"
 basePath="/api-reference"
></elements-stoplight-project>
```

Notice `basePath` in the API component. You'll also want to add a route for the `/api-reference` path in the `app-routing.module.ts` file. It's important to add a catch-all route `**` so you can deep link to paths in API reference docs.

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
And finally, set up Angular to allow [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). Head over to the `app-module.ts` file and add the [CUSTOM_ELEMENTS_SCHEMA](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA).

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

You should see the API reference documentation for the Zoom API.

## Configuration

See [Elements Dev Portal Configuration Options](dev-portal-options.md).