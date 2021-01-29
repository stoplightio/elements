# Stoplight Elements - Angular Example

Stoplight Elements can be used in any framework using the Web Components distribution.
This example project demonstrates usage in an Angular 10 application.

## Table Of Contents

* [Try the example locally](#try-the-example)
* [Set up Elements in your own Angular app](#elements-in-your-own-angular-app)
  * [Step 1 - Install Elements](#step-1---install-elements)
  * [Step 2 - Set up scripts and styles](#step-2---set-up-scripts-and-styles)
  * [Step 3 - CUSTOM_ELEMENTS_SCHEMA](#step-3---custom_elements_schema)
  * [Ready to go](#ready-to-go)

## Try the example

Clone the [@stoplight/elements-starter-angular](https://github.com/stoplightio/elements-starter-angular) and install dependencies.

```bash
git clone https://github.com/stoplightio/elements-starter-angular.git

cd elements-starter-angular

yarn
```


If the above was successful, you can launch the example project using `yarn start`.

![project launching](https://user-images.githubusercontent.com/543372/91299831-8dec1900-e7a2-11ea-9b22-5c5111b00971.png)

Now if you open your browser and navigate to `http://localhost:4200/` as instructed, you will see a basic boilerplate Angular app.

Clicking one of the *Docs* tabs will take you to pages that demo the Stoplight Elements custom elements in action:

![example](https://user-images.githubusercontent.com/543372/91294883-7a3cb480-e79a-11ea-8864-4bd616338ca7.png)

## Elements in your own Angular app

### Step 1 - Install Elements

In order to use Elements in Angular, we need to use the Web Components-based distribution from NPM. Let's add it:
```bash
# in case you use NPM
npm install @stoplight/elements-web-components
# in case you use Yarn
yarn add @stoplight/elements-web-components
```

> **NOTE**: Do **not** use the `@stoplight/elements` package directly in a non-*React* application.
> `@stoplight/elements` contains React specific code and is meant to be consumed by *React* applications.
> For other use-cases - like *Angular* - **install `@stoplight/elements-web-components` instead**.

### Step 2 - Set up scripts and styles

To make *Angular* know about the Stoplight elements and their styling, you should set up the following in your angular.json:
```jsonc
{
  "projects": {
    "your-project-name": {
      // ...
      "architect": {
        "build": {
          // ...
          "options": {
            // ...
            "styles": [
              // ...
              "node_modules/@stoplight/elements-web-components/dist/elements.min.css"
            ],
            "scripts": [
              // ...
              "node_modules/@stoplight/elements-web-components/dist/elements.min.js"
            ]
          }
        }
      }
    }
  }
}
```

### Step 3 - CUSTOM_ELEMENTS_SCHEMA

In order to use custom elements in an *Angular* application, you have to add something called the *CUSTOM_ELEMENTS_SCHEMA*.

Find the declaring *NgModule* of the component in which you wish to utilize *Stoplight Elements*, and amend its decorator like so:
```tsx
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SomeModule {}
```

### Ready to go

Congratulations! At this point, you are ready to use *Stoplight Elements* in your Angular application.

Check out the Web Components documentation to learn about the different elements *Stoplight Elements* provides and their attributes.
