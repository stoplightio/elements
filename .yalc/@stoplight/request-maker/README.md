# request-maker component
[![Maintainability](https://api.codeclimate.com/v1/badges/46f90acacb6a47e95a24/maintainability)](https://codeclimate.com/repos/5c62ee53228025780f01387b) [![Test Coverage](https://api.codeclimate.com/v1/badges/46f90acacb6a47e95a24/test_coverage)](https://codeclimate.com/repos/5c62ee53228025780f01387b)

Request Maker is a Component for Studio to craft HTTP Requests, send them somewhere and display them back in the component.

- Explore the components: [Storybook](https://stoplightio.github.io/request-maker)
- View the changelog: [Releases](https://github.com/stoplightio/request-maker/releases)

### Installation

Supported in modern browsers and node.

```bash
  yarn add request-maker
```

### Usage

This library exports `RequestMaker`, `ActionBar`, `ResponseEditor`,  and `ResponseViewer` component.

`RequestMaker` holds the state of the application. It can be initialized by providing `IHttpOperation` and `IHttpRequest`.

All request maker parameters are optional:
- operation: `IHttpOperation`
- request: `IHttpRequest`
- hideRequestEditor: `boolean`
- hideResposne: `boolean`

Properties taken from `IHttpOperation`:
- method
- path
- servers

Properties taken from `IHttpRequest`:
- method
- path
- baseUrl
- headers
- query
- body

Properties from `IHttpRequest` take precedence over `IHttpMethod`

#### RequestMaker

```jsx
  <RequestMaker />
```

```ts
  const operation = IHttpOperation = {
  id: '1',
  method: 'post',
  path: '/operationResource',
  request: {
    path: [],
    query: [],
    headers: [],
    cookie: [],
    body: {
      contents: [],
    },
  },
  responses: [],
  servers: [
    {
      url: 'http://localhost:9001',
    },
    {
      url: 'http://localhost:3000',
    },
    {
      url: 'http://example.com',
    },
  ],
  security: [],
};

const request: IHttpRequest<string> = {
  baseUrl: 'http://localhost:8080',
  method: 'get',
  url: '/requestResource',
  headers: {
    testHeader: 'testHeaderValue',
  },
  query: {
    testQueryParam: ['testQueryValue'],
  },
  body: '{"valid": true}',
};
```
```jsx
  <RequestMaker operation={operation} request={request}/>
```

That's all you need to do. It'll manage the state for you and place the components here and there.

#### Using components separately

In case you want to craft your own component, you can use the parts separately, but you'll have to manage its state.
