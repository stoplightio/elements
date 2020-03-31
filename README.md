# @stoplight/elements

[![npm version](https://badge.fury.io/js/%40stoplight%2Felements.svg)](https://badge.fury.io/js/%40stoplight%2Felements) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://stoplightio.github.io/elements)

UI components for composing beautiful developer documentation

### Installation

```bash
# latest stable
yarn add @stoplight/elements
```

### Usage

#### React Components

```tsx
import { Docs, Content, ContentTabs, Provider, TableOfContents, RequestMaker, Relationships } from '@stoplight/elements';

<Provider 
  host="stoplight.io"
  workspace="bigcommerce" 
  project="dev-docs" 
  node="reference/bigcommerce_subscribers_api.oas2.yml"
  components={{
    link: Link
  }}
>
  <div className='flex'>
    <TableOfContents filter={{ nodeUri: "reference" }} />

    <Content className='flex-1'>
      <ContentTab title="Docs">
        <Docs />
      </ContentTab>

      <ContentTab title="Try It" filter={{ nodeType: "http_operation" }}>
        <RequestMaker />
      </ContentTab>

      <ContentTab title="Relationships" filter={{ nodeType: "model" }}>
        <Relationships />
      </ContentTab>

      <ContentTab title="Changelog" >
        <Changelog />
      </ContentTab>
    </Content>
  </div>
</Provider>
```

```tsx
import { Docs, Content, ContentTabs, Provider, TableOfContents, RequestMaker, Relationships } from '@stoplight/elements';
import { Tabs } from '@stoplight/ui-kit';

<Provider 
  host="stoplight.io"
  workspace="bigcommerce" 
  project="dev-docs" 
  node="reference/bigcommerce_subscribers_api.oas2.yml"
  components={{
    link: Link
  }}
>
  <Tabs>
    <Tab
      title="Docs"
      content={<Docs node={node} />}
    />

    <Tab
      title="TryIt"
      content={<RequestMaker node={node} />}
    />

    <Tab
      title="Relationships"
      content={<Relationships node={node} edges={edges} />}
    />
    
    <Tab
      title="Changelog"
      content={<Changelog node={node} changes={changes} />}
    />
  </Tabs>
</Provider>
```

#### Web Components

```html
<html>
  <head>
    <script async defer src="https://cdn.stoplight.io/assets/elements.js"></script>
  </head>

  <body>
    <stoplight-provider 
      host="stoplight.io"
      workspace="bigcommerce" 
      project="dev-docs" 
      node="reference/bigcommerce_subscribers_api.oas2.yml"
      theme="dark"
    >
      <div className='flex'>
        <stoplight-tableofcontents filter="nodeUri=reference;"></stoplight-tableofcontents>

        <stoplight-docs></stoplight-docs>
      </div>
    </stoplight-provider>
  </body>
</html>
```

### Contributing

1. Clone repo.
2. Create / checkout `feat/{name}`, `chore/{name}`, or `fix/{name}` branch.
3. Install deps: `yarn`.
4. Make your changes.
5. Run tests: `yarn test.prod`.
6. Stage relevant files to git.
7. Commit: `yarn commit`. _NOTE: Commits that don't follow the [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format will be rejected. `yarn commit` creates this format for you, or you can put it together manually and then do a regular `git commit`._
8. Push: `git push`.
9. Open PR targeting the `master` branch.
