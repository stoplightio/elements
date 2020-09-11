# StoplightProject Component

The StoplightProject component displays a tranditional documentation UI for an existing Stoplight Project.

![](https://cdn.stoplight.io/elements/elements-starter-react-studio-demo-docs.png)

## Usage

> This component requires a Stoplight Workspace. You can create one for free [here](https://stoplight.io/welcome).

<!-- title: React Component -->

```jsx
import { StoplightProject } from "@stoplight/elements";

<StoplightProject
  workspace="https://meta.stoplight.io"
  project="elements"
  branch="main"
  router="history"
/>
```

<!-- title: Web Component -->

```html
<stoplight-project
  workspace="https://meta.stoplight.io"
  project="elements"
  branch="main"
  router="history"
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
      <td>workspace</td>
      <td>string</td>
      <td></td>
      <td><a href="https://meta.stoplight.io">https://meta.stoplight.io</a></td>
      <td>URL where your Stoplight Workspace is located.</td>
      <td>[x]</td>
    </tr>
    <tr>
      <td>project</td>
      <td>string</td>
      <td></td>
      <td>elements</td>
      <td>The slug of the Stoplight Project.</td>
      <td>[x]</td>
    </tr>
    <tr>
      <td>branch</td>
      <td>string</td>
      <td></td>
      <td>main</td>
      <td>A specific branch of the project to show. If no branch is provided, the default branch will be shown.</td>
      <td></td>
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
