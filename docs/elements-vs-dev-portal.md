# Elements vs Elements Dev Portal

The concept of Elements is to be a collection of components that can be useful for building out API documentation, and those components are split across two different packages:

- `@stoplight/elements` - We generally just call this "Elements", and is home to the "API Component". It is used for displaying API reference documentation.
- `@stoplight/elements-dev-portal` - This collection of components is referred to as "Elements Dev Portal" and contains the "Stoplight Project" component and the "Search" component. It is used for building a full documentation portal by combining articles, guides and API reference documentation.

All of these components are available as Web Components or React components, so you can use them pretty much anywhere.

If you have one single API with a single OpenAPI document that needs turning into API reference documentation, you want to use the Elements "API Component". It can be used with any OpenAPI definition via a URL or JavaScript object.

Elements Dev Portal is like an extension, a superset of Elements functionality, that contains one or more API references and Markdown Articles presented together. This allows for adding generic tutorials and guides along with the API reference documentation, and requires a [Stoplight Project](https://meta.stoplight.io/docs/platform/2.-workspaces/b.adding-projects.md) to power it all, along with mocking and some other advanced functionality not available in the standalone Elements package.

You can then also use the [Search component](getting-started/dev-portal/search-component.md) to add an interactive search bar to your dev portal. 

<table class="c7">
  <tbody>
    <tr class="c2">
      <td class="c3" colspan="1" rowspan="1">
        Feature
      </td>
      <td class="c4" colspan="1" rowspan="1">
        Elements
      </td>
      <td class="c5" colspan="1" rowspan="1">
        Dev Portal
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
  </tbody>
</table>

To learn how to work with Elements, please read the [Introduction to Elements](getting-started/elements/introduction.md) article. 

To learn how to work with Elements Dev Portal, please read the [Introduction to Elements Dev Portal](getting-started/dev-portal/introduction.md) article. 
