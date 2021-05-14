[![Elements - OpenAPI Powered API Documentation](docs/images/readme-header.svg)][elements_landing_page]

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://stoplight-elements.netlify.app)
[![CircleCI][circle_ci_image]][circle_ci]
[![NPM Downloads][circle_ci_image]][npm]
[![Buy us a tree][ecologi_image]][ecologi]

Beautiful API documentation powered by OpenAPI and Markdown. Use these UI components to create API reference documentation, or more complete documentation with Markdown articles covering tutorials, how-to guides, etc.

Available as React Components, or Web Components, you can use Elements all together to build beautiful three-column "Stripe-esque" documentation, or stacked documentation thats easier for integrating into existing Content Management Systems with their own navigation.

# Overview

- [Overview](#overview)
  - [📖 Community](#-community)
  - [👁️🗨 ️️Examples](#️-️️examples)
  - [🏁 Usage](#-usage)
    - [React Component](#react-component)
    - [Web Component](#web-component)
  - [🪛 Configuration](#-configuration)
  - [🚧 Roadmap](#-roadmap)
  - [⚙️ Integrations](#️-integrations)
  - [🏁 Help Others Utilize Elements](#-help-others-utilize-elements)
  - [👏 Contributing](#-contributing)
  - [🎉 Thanks](#-thanks)

## 📖 Community

Let's chat about features, ideas, what you're doing with Elements, on [GitHub Discussions](https://github.com/stoplightio/elements/discussions).

## 👁️🗨 ️️Examples

Stoplight Elements comes with a few example integration projects, showing you how to utilize Elements with different frameworks.
- **[react-cra](./examples/react-cra)** - An example app built Create React App utilizing Stoplight Elements.
- **[react-gatsby](./examples/react-gatsby)** - An example Gatsby site utilizing Stoplight Elements.
- **[angular](./examples/angular)** - An angular app utilizing the Web Components distribution of Elements.
- **[bootstrap](./examples/bootstrap)** - A single HTML page utilizing the Web Components distribution via a global script tag.

To run these examples yourself:
1. Clone this repo and open a command line in the repo's directory.
2. Run `yarn` to install all dependencies.
3. Run `yarn build` to build Elements itself.
4. Run `yarn build:react-cra` to build the *react-cra* example site. An analogous command is available for *react-gatsby* and *angular*, but is not required for **bootstrap**.
5. Run `yarn serve:react-cra` (or equivalent) to serve the example project on `http://localhost:4200`.

## 🏁 Usage

The examples will hopefully help show Elements working in close to real world situations, but the most bare bones examples of Elements can be found below.

### React Component

```bash
$ npm install @stoplight/elements@beta
```

```js
import { API } from "@stoplight/elements";

<API
  apiDescriptionUrl="https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml"
  layout="traditional"
  router="history"
/>
```

### Web Component

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Elements in HTML</title>
    <!-- Embed elements Elements via Web Component -->
    <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
  </head>
  <body>

    <elements-api
      apiDescriptionUrl="https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml"
      router="hash"
      layout="sidebar"
    />

  </body>
</html>
```

Load this page up in your browser and you should see the [GitHub REST API](https://docs.github.com/en/rest) documented in Stoplight Elements.

## 🪛 Configuration

The React and Web Components both have the following configuration options.

- `apiDescriptionUrl` - OpenAPI document URL, supporting `http://`, `https://`, and documents containing `$ref` to other http(s) documents.
- `apiDescriptionDocument` - OpenAPI document, provided as YAML string, JSON string or JavaScript object.
- `basePath` - Helps when using `router: 'history'` but docs are in a subdirectory like `https://example.com/docs/api`.
- `layout` - There are two layouts for Elements:
  - `sidebar` - (default) Three-column design.
  - `stacked` - Everything in a single column, making integrations with existing websites that have their own sidebar or other columns already.
- `router` -  Determines how navigation should work:
  - `history` - (default) uses the HTML5 history API to keep the UI in sync with the URL.
  - `hash` - uses the hash portion of the URL (i.e. window.location.hash) to keep the UI in sync with the URL.
  - `memory` - keeps the history of your “URL” in memory (does not read or write to the address bar)

## 🚧 Roadmap

- [x] API Console (a.k.a "Try it!")
- [x] Automatic Code Samples
- [x] Automatic Examples! 🥳
- [x] React & Web Component Support
- [ ] OpenAPI Support
  - [x] OpenAPI v2.0
  - [x] OpenAPI v3.0
  - [ ] OpenAPI v3.1
  - [ ] Callbacks
  - [ ] Webhooks
- [ ] Multiple APIs (a.k.a "Dev Portal")

## ⚙️ Integrations

- [Stoplight Studio](https://stoplight.io/studio/?utm_source=github&utm_medium=elements&utm_campaign=readme): Free visual OpenAPI designer that uses Elements to preview your API descriptions on the fly.
- [Stoplight Platform](https://stoplight.io/?utm_source=github&utm_medium=elements&utm_campaign=readme): Collaborative API Design Platform for designing, developing and documenting APIs with hosted documentation powered by Elements.

## 🏁 Help Others Utilize Elements

If you're using Elements for an interesting use case, [contact us](mailto:growth@stoplight.io) for a case study. We'll add it to a list here. Spread the goodness 🎉

## 👏 Contributing

If you are interested in contributing to Elements itself, check out our [contributing docs ⇗][contributing] and [code of conduct ⇗][code_of_conduct] to get started.

## 🎉 Thanks

Elements is built on top of lots of excellent packages, and here are a few we'd like to say a special thanks to.

- [httpsnippet](https://www.npmjs.com/package/httpsnippet) by [Kong](https://github.com/Kong).
- [openapi-sampler](https://www.npmjs.com/package/openapi-sampler) by [ReDocly](https://redoc.ly/).

Check these projects out!

[code_of_conduct]: CODE_OF_CONDUCT.md
[contributing]: CONTRIBUTING.md
[download-release]: https://github.com/stoplightio/elements/releases/latest
[elements_landing_page]: https://elements-demo.stoplight.io?utm_source=github&utm_medium=elements&utm_campaign=readme
[circle_ci]: https://circleci.com/gh/stoplightio/elements
[circle_ci_image]: https://img.shields.io/circleci/build/github/stoplightio/elements/main
[npm]: https://www.npmjs.com/package/@stoplight/elements
[npm_image]: https://img.shields.io/npm/dw/@stoplight/elements?color=blue
[ecologi]: https://ecologi.com/stoplightinc
[ecologi_image]: https://img.shields.io/badge/Buy%20us%20a%20tree-%F0%9F%8C%B3-lightgreen
