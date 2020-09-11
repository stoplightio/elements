# API Component

The API component displays API reference documentation for any OpenAPI v2 or v3 file.

![](https://cdn.stoplight.io/elements/elements-starter-react-zoom-api-reference-docs.png)

## Usage

> This component requires an OpenAPI file that is accessible via URL. If you don't already have an OpenAPI, you can design one for free using [Stoplight Studio](https://stoplight.io/studio).

<!-- title: React Component -->

```jsx
import { API } from "@stoplight/elements";

<API
  apiDescriptionUrl="https://elements.stoplight.io/api/v1/projects/elements/studio-demo/nodes/reference/todos/openapi.v1.json?deref=bundle"
  layout="traditional"
  router="history"
/>
```

<!-- title: Web Component -->

```html
<stoplight-api
  apiDescriptionUrl="https://elements.stoplight.io/api/v1/projects/elements/studio-demo/nodes/reference/todos/openapi.v1.json?deref=bundle"
  layout="stacked"
  router="hash"
/>
```

## Properties



<table class="bp3-html-table bp3-html-table-condensed bp3-html-table-striped border-l border-r border-b MV_block">
  <tbody>
    <tr>
      <td>Name</td>
      <td>Type</td>
      <td>Default</td>
      <td>Example</td>
      <td>Description</td>
      <td>Required</td>
    </tr>
    <tr>
      <td>apiDescriptionUrl</td>
      <td>string</td>
      <td></td>
      <td><a href="https://elements.stoplight.io/api/v1/projects/elements/studio-demo/nodes/reference/todos/openapi.v1.json?deref=bundle">https://elements.stoplight.io/api/...</a></td>
      <td>URL where your OpenAPI document can be retrieved.</td>
      <td>[x]</td>
    </tr>
    <tr>
      <td>layout</td>
      <td>traditional | stacked</td>
      <td>traditional</td>
      <td>stacked</td>
      <td>URL where your OpenAPI document can be retrieved.</td>
      <td>[x]</td>
    </tr>
    <tr>
      <td>basePath</td>
      <td>string</td>
      <td></td>
      <td>/docs</td>
      <td>Mounts the component under a specific base path.</td>
      <td></td>
    </tr>
    <tr>
      <td>router</td>
      <td>history | hash | memory</td>
      <td>history</td>
      <td>memory</td>
      <td>Determines how navigation should work. 
        <ul>
          <li><b>history</b> - uses the HTML5 <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">history API</a> to keep the UI in sync with the URL. </li>
          <li><b>hash</b> - uses the hash portion of the URL (i.e. window.location.hash) to keep the UI in sync with the URL. </li>
          <li><b>memory</b> - keeps the history of your “URL” in memory (does not read or write to the address bar)</li>
        </ul>
      </td>
      <td></td>
    </tr>
  </tbody>
</table>
