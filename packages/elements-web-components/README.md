# @stoplight/elements-web-components

[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) build of the [@stoplight/elements](https://www.npmjs.com/package/@stoplight/elements) library. 

Elements is a collection of UI components for displaying beautiful developer documentation using an OpenAPI document or a Stoplight project.

## Documentation

For full documentation, visit [https://meta.stoplight.io/docs/elements](https://meta.stoplight.io/docs/elements).

## Getting Started

Include the Elements CSS stylesheet and JavaScript bundle within the `<head>` of your document.

```html
<link rel="stylesheet" href="https://unpkg.com/@stoplight/elements-web-components/dist/elements.min.css" />

<script src="https://unpkg.com/@stoplight/elements-web-components/dist/elements.min.js"></script>
```

Then place one of the Elements components within the `<body>`.

The [API component](https://meta.stoplight.io/docs/elements/components/API.md) displays API reference documentation for any OpenAPI v2 or v3 document.

```html
<elements-api apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml"></elements-api>
```

The [Stoplight Project component](https://meta.stoplight.io/docs/elements/components/StoplightProject.md) displays the generated documentation for any Stoplight project.

```html
<elements-stoplight-project workspace="https://elements.stoplight.io" project="studio-demo"></elements-stoplight-project>
```

## Examples

- [Angular Starter](https://github.com/stoplightio/elements-starter-angular)

## About

Elements is developed and maintained by [Stoplight](https://stoplight.io).

## License

Licensed under the Apache License, Copyright © 2020-present Stoplight.

See [LICENSE](LICENSE.md) for more information.