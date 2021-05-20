# Stoplight Elements

Elements is an API Documentation toolkit, leveraging [OpenAPI](https://openapis.org/) and Markdown ([CommonMark](https://commonmark.org/)) to provide beautiful, interactive API reference documentation, that you can integrate with any existing content-management system or single-page application. 

Elements is made by [Stoplight](https://stoplight.io/?utm_source=github&utm_medium=elements&utm_campaign=docs), which offers hosted documentation, visual API design tools, and all sorts of other handy API tooling, but you do not need a Stoplight account to use Elements. If you are an API developer you can use Elements via the command-line, Web Components, or one of our various integrations with [popular JavaScript frameworks](getting-started/2-integrations/). 

## Elements vs Elements Dev Portal

There are two main use cases for Elements, with slightly different components split across two different packages.

If you have one single API with a single OpenAPI document that needs turning into API Reference Documentation, you want the "API Component", available in [@stoplight/elements](https://www.npmjs.com/package/@stoplight/elements).

If you have multiple APIs and Markdown Articles to present all together, you want the [elements-dev-portal](https://www.npmjs.com/package/@stoplight/elements-dev-portal) which contains a StoplightProject component. This requires a [Stoplight Project](https://meta.stoplight.io/docs/platform/2.-workspaces/b.adding-projects.md), which is can be created in a [Stoplight Workspace](https://meta.stoplight.io/docs/platform/2.-workspaces/a.creating-a-workspace.md).

The full feature comparison of the two packages:

<table class="c7">
  <tbody>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Feature
      </td>
      <td class="c4" colspan="1" rowspan="1">
        elements
      </td>
      <td class="c5" colspan="1" rowspan="1">
        elements-dev-portal
      </td>
    </tr>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Embed into existing CMS
      </td>
      <td class="c4" colspan="1" rowspan="1">
        &#9989;
      </td>
      <td class="c5" colspan="1" rowspan="1">
        &#9989;
      </td>
    </tr>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Host anywhere (S3, GitHub)
      </td>
      <td class="c4" colspan="1" rowspan="1">
        &#9989;
      </td>
      <td class="c5" colspan="1" rowspan="1">
        &#9989;
      </td>
    </tr>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Try it (API Console)
      </td>
      <td class="c4" colspan="1" rowspan="1">
        &#9989;
      </td>
      <td class="c5" colspan="1" rowspan="1">
        &#9989;
      </td>
    </tr>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Multiple APIs
      </td>
      <td class="c4" colspan="1" rowspan="1">
        &#10060;
      </td>
      <td class="c5" colspan="1" rowspan="1">
        &#9989;
      </td>
    </tr>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Mocking
      </td>
      <td class="c4" colspan="1" rowspan="1">
        &#10060;
      </td>
      <td class="c5" colspan="1" rowspan="1">
        &#9989;
      </td>
    </tr>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Markdown Articles
      </td>
      <td class="c4" colspan="1" rowspan="1">
        &#10060;
      </td>
      <td class="c5" colspan="1" rowspan="1">
        &#9989;
      </td>
    </tr>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Version Selector (Multiple Branches)
      </td>
      <td class="c4" colspan="1" rowspan="1">
        &#10060;
      </td>
      <td class="c5" colspan="1" rowspan="1">
        &#9989;
      </td>
    </tr>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Search
      </td>
      <td class="c4" colspan="1" rowspan="1">
        &#10060;
      </td>
      <td class="c5" colspan="1" rowspan="1">
        &#9989;
      </td>
    </tr>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Command Line
      </td>
      <td class="c4" colspan="1" rowspan="1">
        &#9989;
      </td>
      <td class="c5" colspan="1" rowspan="1">
        &#10060;
      </td>
    </tr>
  </tbody>
</table>

To get started with elements, head over to [Getting Started](docs/getting-started.md).

## Free Hosted Docs

If you don’t want to host your own documentation, and don’t need to embed the docs into an existing site, consider using [Stoplight Documentation](https://stoplight.io/api-documentation/?utm_source=github&utm_medium=elements&utm_campaign=docs), which is basically hosted Elements. 

The free plan will get you a long way, and there's no need to figure out deployments. If your API description documents are in a Git repo, connect that to Stoplight and it will render your documentation for you whenever commits are pushed or merged. 
