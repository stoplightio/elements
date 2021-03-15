# API Component

The API component displays API reference documentation for any OpenAPI v2 or v3 file.

![](https://cdn.stoplight.io/elements/elements-starter-react-zoom-api-reference-docs.png)

## Usage

> This component requires an OpenAPI file that is either provided directly to the component (as YAML string, JSON string or - in React version - also as a JavaScript object) or accessible via URL (in that case the component will fetch it by itself). 

> If you don't already have an OpenAPI document describing your API, you can create one for free using [Stoplight Studio](https://stoplight.io/studio).


### React

<!-- title: React Component Loading API Description Via URL -->

```jsx
import { API } from "@stoplight/elements";

<API
  apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml"
  layout="traditional"
  router="history"
/>
```

<!-- title: React Component with API Description Provided Directly -->

```jsx
import { API } from "@stoplight/elements";

const apiDescriptionDocument = /* API description in the form of YAML string, JSON string or JavaScript object */;

<API
  apiDescriptionDocument={apiDescriptionDocument}
  layout="traditional"
  router="history"
/>
```

### Web Component

<!-- title: Web Component -->

```html
<elements-api
  apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml"
  layout="stacked"
  router="hash"
/>
```

<!-- title: Web Component with API Description Provided Directly -->

```html
<elements-api
  layout="stacked"
  router="hash"
/>

<script>
const apiDescriptionDocument = /* API description in the form of YAML string or JSON string */;

document
  .querySelector('elements-api')
  .setAttribute('apiDescriptionDocument', apiDescriptionDocument);
</script>
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
      <td><a href="https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml">https://raw.githubusercontent.com/...</a></td>
      <td>URL where your OpenAPI document can be retrieved. Required if 'apiDescriptionDocument' paramter is not provided. If 'apiDescriptionDocument' is provided, this parameter becomes optional and serves as the base url for resolving references in the document.</td>
      <td>[x]</td>
    </tr>
    <tr>
      <td>apiDescriptionDocument</td>
      <td>string | object</td>
      <td></td>
      <td></td>
      <td>OpenAPI document, provided as YAML string, JSON string or JavaScript object.</td>
      <td></td>
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
