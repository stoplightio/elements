# Dev Portal Configuration Options

- `projectId` - Find the Project ID in the Project Settings screen on Stoplight.
- `platformUrl` - By default, the URL is `https://stoplight.io/', but you can change it.
- `basePath` - Helps when using `router: 'history'` but docs are in a subdirectory like `https://example.com/docs/api`.
- `collapseTableOfContents` - Pass `true` to initially collapse ToC folders of articles and lists of endpoints for an API. This can help organize the ToC if you have a lot of content.
- `hideMocking` - Pass `true` to disable all mocking options and remove mention of the mock server.
- `hideTryIt` - Pass `true` to hide the [**Try It** feature](https://docs.stoplight.io/docs/platform/ZG9jOjM2OTM3Mjky-try-it).
- `tryItCorsProxy` - Pass the URL of a CORS proxy used to send requests to the Try It feature. The provided URL is pre-pended to the URL of an actual request.
- `tryItCredentialPolicy` - Use to fetch the credential policy for the Try It feature. Options are: `omit` (default), `include`, and `same-origin`.
- `router` -  Determines how navigation should work:
  - `history` - (Default) Uses the HTML5 history API to keep the UI in sync with the URL.
  - `hash` - Uses the hash portion of the URL to keep the UI in sync with the URL.
  - `memory` - Keeps the history of your "URL" in memory (doesn't read or write to the address bar).
  - `static` - Renders using the StaticRouter which can help render pages on the server.