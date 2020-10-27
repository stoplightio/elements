# StoplightProject Component

The StoplightProject component displays a tranditional documentation UI for an existing Stoplight Project.

![](https://cdn.stoplight.io/elements/elements-starter-react-studio-demo-docs.png)

## Usage

> This component requires a Stoplight Workspace. You can create one for free [here](https://stoplight.io/welcome).

### React

<!-- title: React Component -->

```jsx
import { StoplightProject } from "@stoplight/elements";

<StoplightProject
  workspaceSlug="meta"
  projectSlug="elements"
  branchSlug="main"
/>
```

### Web Component

<!-- title: Web Component -->

```html
<elements-stoplight-project
  workspaceSlug="meta"
  projectSlug="elements"
  branchSlug="main"
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
      <td>workspaceSlug</td>
      <td>string</td>
      <td></td>
      <td><a href="https://meta.stoplight.io">meta</a></td>
      <td>The slug of your Stoplight Workspace. (Usually you can find this as part of your Stoplight URL: https://[workspaceSlug].stoplight.io)</td>
      <td>[x]</td>
    </tr>
    <tr>
      <td>projectSlug</td>
      <td>string</td>
      <td></td>
      <td>elements</td>
      <td>The slug of the Stoplight Project.</td>
      <td>[x]</td>
    </tr>
    <tr>
      <td>branchSlug</td>
      <td>string</td>
      <td>[default branch]</td>
      <td>beta</td>
      <td>The name of a specific branch of the project to show. If no branch is provided, the default branch will be shown.</td>
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
      <td>"history" | "hash" | "memory"</td>
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
    <tr>
      <td>platformUrl</td>
      <td>string</td>
      <td>https://stoplight.io</td>
      <td>https://stoplight.company.internal</td>
      <td>If your company runs an on-premise deployment of Stoplight, set this prop to point the StoplightProject component at the URL of that instance.</td>
      <td></td>
    </tr>
  </tbody>
</table>
