# @stoplight/elements

Elements is a collection of UI components for displaying beautiful developer documentation using an OpenAPI document or a Stoplight project.

## Documentation

For full documentation, visit [https://meta.stoplight.io/docs/elements](https://meta.stoplight.io/docs/elements).

## Getting Started

Install the Elements library and peer dependencies.

```bash
yarn add @stoplight/elements @stoplight/prism-http mobx
```

Import the CSS file and choose one of the Elements components to use.

The [API component](https://meta.stoplight.io/docs/elements/components/API.md) displays API reference documentation for any OpenAPI v2 or v3 document.

```jsx
import { API } from '@stoplight/elements';
import '@stoplight/elements/styles/elements.min.css';

<API 
  apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/zoom.yaml"
/>
```

The [Stoplight Project component](https://meta.stoplight.io/docs/elements/components/StoplightProject.md) displays the generated documentation for any Stoplight project.

```jsx
import { StoplightProject } from '@stoplight/elements';
import '@stoplight/elements/styles/elements.min.css';

<StoplightProject workspaceSlug="elements" projectSlug="studio-demo" />
```

## Examples

- [Gatsby Starter](https://github.com/stoplightio/elements-starter-gatsby)
- [Create React App Starter](https://github.com/stoplightio/elements-starter-react)

## About

Elements is developed and maintained by [Stoplight](https://stoplight.io).

## License

Licensed under the Apache License, Copyright © 2020-present Stoplight.

See [LICENSE](LICENSE.md) for more information.
