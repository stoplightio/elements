# Elements

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://stoplightio.github.io/elements)
[![CircleCI][circle_ci_image]][circle_ci]
[![NPM Downloads][circle_ci_image]][npm]
[![Buy us a tree][ecologi_image]][ecologi]

Beautiful API documentation powered by OpenAPI and Markdown. Use these UI components to create API reference documentation, or more complete documentation with Markdown articles covering tutorials, how-to guides, etc. 

Available as React Components, or Web Components, you can use Elements all together to build beautiful three-column "Stripe-esque" documentation, or stacked documentation thats easier for integrating into existing Content Management Systems with their own navigation.
# Overview

- [Elements](#elements)
- [Overview](#overview)
  - [📦 Packages](#-packages)
  - [🧰 Installation and Usage](#-installation-and-usage)
  - [📖 Documentation and Community](#-documentation-and-community)
  - [🚧 Roadmap](#-roadmap)
  - [⚙️ Integrations](#️-integrations)
  - [🏁 Help Others Utilize Elements](#-help-others-utilize-elements)
  - [👏 Contributing](#-contributing)
  - [🎉 Thanks](#-thanks)

## 📦 Packages

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish [several packages](/packages) to npm from the same codebase, including:

| Package                                                | Version                                                                                                                             | Docs                                                                                                                                                                                                                                                                          | Description                                                                        |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`elements`](/packages/elements)               | Not released yet               | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat-square)](https://meta.stoplight.io/docs/elements)  | The core of React component library                                                           |
| [`elements-web-components`](/packages/elements-web-components)       | Not released yet       | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat-square)](https://meta.stoplight.io/docs/elements)       | Web component build of Elements                                                      |
| [`elements-utils`](/packages/elements-utils)       | Not released yet       | [![](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat-square)](https://meta.stoplight.io/docs/elements)       | Utilities functions                                                     |

## 📖 Documentation and Community

- [Documentation](https://meta.stoplight.io/docs/elements)
- [Community](https://github.com/stoplightio/elements/discussions)

## 👁️🗨 ️️Examples

Stoplight Elements comes with a few example integration projects, showing you how to utilize Elements with different frameworks.
- [x] **[react-cra](./examples/react-cra)** An example app built Create React App utilizing Stoplight Elements
- [x] **[react-gatsby](./examples/react-gatsby)** An example Gatsby site utilizing Stoplight Elements
- [ ] **angular** An angular app utilizing the Web Components distribution of Elements
- [ ] **static-html** A single HTML page utilizing the Web Components distribution via a global script tag.

To run these examples yourself:
1. Clone this repo and open a command line in the repo's directory.
2. Run `yarn` to install all dependencies.
3. Run `yarn build` to build Elements itself.
4. Run `yarn build:react-cra` to build the *react-cra* example site. An analogous command is available for all examples.
5. Run `yarn serve:react-cra` (or equivalent) to serve the example project on `http://localhost:4200`.

## 🚧 Roadmap

- [x] `API` Component
- [ ] `StoplightProject` Component
- [x] Try it
- [ ] Try it Authentication
  - [ ] API Key
  - [ ] HTTP Basic
  - [ ] HTTP Digest
  - [ ] HTTP Bearer
  - [ ] OAuth 2.0
  - [ ] OpenID
- [ ] Automatic Examples 🥳
- [ ] OpenAPI v3.0 Callbacks
- [ ] OpenAPI v3.1 Webhooks

## ⚙️ Integrations

- [Stoplight Studio](https://stoplight.io/studio/?utm_source=github&utm_medium=elements&utm_campaign=readme): Free visual OpenAPI designer that uses Elements to preview your API descriptions on the fly.
- [Stoplight Platform](https://stoplight.io/?utm_source=github&utm_medium=elements&utm_campaign=readme): Collaborative API Design Platform for designing, developing and documenting APIs with hosted documentation powered by Elements. 

## 🏁 Help Others Utilize Elements 

If you're using Elements for an interesting use case, [contact us](mailto:growth@stoplight.io) for a case study. We'll add it to a list here. Spread the goodness 🎉

## 👏 Contributing

If you are interested in contributing to Elements itself, check out our [contributing docs ⇗][contributing] and [code of conduct ⇗][code_of_conduct] to get started.

## 🎉 Thanks

Elements is built on top of lots of excellent packages, and here are a few we'd like to say a special thanks to.

- [axios](https://www.npmjs.com/package/axios)
- [httpsnippet](https://www.npmjs.com/package/httpsnippet)
- [openapi-sampler](https://www.npmjs.com/package/openapi-sampler)

Check these projects out!

[code_of_conduct]: CODE_OF_CONDUCT.md
[contributing]: CONTRIBUTING.md
[download-release]: https://github.com/stoplightio/elements/releases/latest
[mocking_landing_page]: https://stoplight.io/api-mocking?utm_source=github&utm_medium=elements&utm_campaign=readme
[circle_ci]: https://circleci.com/gh/stoplightio/elements
[circle_ci_image]: https://img.shields.io/circleci/build/github/stoplightio/elements/v7
[npm]: https://www.npmjs.com/package/@stoplight/elements
[npm_image]: https://img.shields.io/npm/dw/@stoplight/elements?color=blue
[ecologi]: https://ecologi.com/stoplightinc
[ecologi_image]: https://img.shields.io/badge/Buy%20us%20a%20tree-%F0%9F%8C%B3-lightgreen
