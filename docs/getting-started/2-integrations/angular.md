# Getting Started with Elements in Angular

Learn how to quickly get started with Elements in an Angular project.

## [Optional] Create the Angular app

> Skip this step if you already have your Angular app set up.

Run the following command to create a starter Angular app using the [@angular/cli](http://npmjs.com/package/@angular/cli).
Include the Angular routing module if prompted by the CLI.

```bash
npx @angular/cli new elements-starter-angular
cd elements-starter-angular
```

## Install Elements

Next, install the Elements library.

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

Now let's generate a new Angular component for our API reference docs.

```bash
yarn ng generate component api-reference
```

This should generate an `api-reference` folder with a few files. In the `api-reference.component.html` file, let's add the Stoplight API component.

<!--
title: api-reference.component.html
-->
```html
<elements-api
  apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml"
  basePath="/api-reference"
></elements-api>
```

Noticed we added a `basePath` to our API component? We'll also want to add a route for the `/api-reference` path in our `app-routing.module.ts` file. It's important that we also add a catch-all route `**`, so we can deep link to paths in our API reference docs.

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


And finally, we need to set up Angular to allow [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). Head over to the `app-module.ts` file and add the [CUSTOM_ELEMENTS_SCHEMA](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA).

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

Now start the development server.

```bash
yarn start
```

And you should see the API reference documentation for the Zoom API.

![](https://cdn.stoplight.io/elements/elements-starter-react-zoom-api-reference-docs.png)


## Next steps

Well that was easy, wasn't it? But you're not done yet! Elements provides you with the components for beautiful API reference documentation, but you'll likely want to add other things to your site such as a landing page, header and footer navigations, etc.

Once you're done and you're docs are live, give us a shout [@stoplightio](https://twitter.com/stoplightio) and we'll help you share it with the world!
