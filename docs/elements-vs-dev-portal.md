# Elements vs Elements Dev Portal

Elements is a collection of components that can be used to build beautiful API documentation. These components are split
across two different packages:

- `@stoplight/elements` - Elements is home to the API component. It can be used to render documentation for a single OpenAPI document.
- `@stoplight/elements-dev-portal` - Elements Dev Portal contains the Stoplight project, the Search component, and a variety of lower-level utilities to help you put together a developer portal. You can use it to combine how-to documentation (Markdown articles) and API reference documentation into a complete portal.

These components are available as Web components and React components, which allows you to use them pretty much anywhere.

If you have a single OpenAPI document that you'd like to turn into API reference documentation, use the Elements API component. It can be used with any OpenAPI definition via a URL or JavaScript object.

If you'd like to combine a variety of guides, tutorials, and other documentation with one or more API definitions, the Elements Dev Portal is your best bet. Elements Dev Portal works by referencing a
[Stoplight Project](https://docs.stoplight.io/docs/platform/ZG9jOjE4ODEyMw-add-projects), so you need to create a
Stoplight account and project to get started.

| Feature                              | Elements | Dev Portal |
| ------------------------------------ | :------: | :--------: |
| Embed into existing CMS              | &#9989;  |  &#9989;   |
| Host anywhere (S3, GitHub)           | &#9989;  |  &#9989;   |
| Try it (API Console)                 | &#9989;  |  &#9989;   |
| Multiple APIs                        | &#10060; |  &#9989;   |
| Markdown Articles                    | &#10060; |  &#9989;   |
| Mocking                              | &#10060; |  &#9989;   |
| Version Selector (Multiple Branches) | &#10060; |  &#9989;   |
| Search                               | &#10060; |  &#9989;   |

To learn how to work with Elements, read the [Introduction to Elements](getting-started/elements/introduction.md)
article.

To learn how to work with Elements Dev Portal, read the
[Introduction to Elements Dev Portal](getting-started/dev-portal/introduction.md) article.
