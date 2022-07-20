# Elements Configuration Options

- `apiDescriptionUrl` - OpenAPI document URL, supporting `http://`, `https://`, and documents containing `$ref` to other http(s) documents.
- `apiDescriptionDocument` - OpenAPI document, provided as YAML string, JSON string or JavaScript object.
- `basePath` - Helps when using `router: 'history'` but docs are in a subdirectory like `https://example.com/docs/api`.
- `hideInternal` - Pass `"true"` to filter out any content which has been marked as internal with `x-internal`.
- `hideTryIt` - Pass `true` to hide the [**Try It** feature](https://meta.stoplight.io/docs/platform/ZG9jOjM2OTM3Mjky-try-it).
- `tryItCorsProxy` - Pass the URL of a CORS proxy used to send requests to the Try It feature. The provided url is prepended to the URL of an actual request.
- `tryItCredentialPolicy` - Use to fetch the credential policy for the Try It feature. Options are: `omit` (default), `include`, and `same-origin`.
- `layout` - There are two layouts for Elements:
  - `sidebar` - (default) Three-column design.
  - `stacked` - Everything in a single column, making integrations with existing websites that have their own sidebar or other columns already.
- `logo` - URL to an image that will show as a small square logo next to the title, above the table of contents.
- `router` -  Determines how navigation should work:
  - `history` - (default) uses the HTML5 history API to keep the UI in sync with the URL.
  - `hash` - uses the hash portion of the URL (i.e. window.location.hash) to keep the UI in sync with the URL.
  - `memory` - keeps the history of your "URL" in memory (does not read or write to the address bar).
  - `static` - renders using the StaticRouter which can help rendering pages on the server.

