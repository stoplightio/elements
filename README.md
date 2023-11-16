# JP Morgan Elemental

This repo is a fork of stoplight elements. The plan for this repo is to update elements to allow us to rapidly deploy
features we require and then look to merge back to elements.

## JP Morgan Features developed

- Callbacks being rendered
- Default try it out server and removal of server dropdown from try it out section
- useCustomNav is optional and can be set to true to hide stoplights default sidebar.
- useGetOasNavTree parses an api spec and returns an array of grouped endpoints and schemas.

## How to use

Instead of installing the stoplight component use:

```bash
$ npm install @jpmorganchase/elemental
```

Then follow stoplights readme at [here](./STOPLIGHT_ELEMENTS_README.md)

### Using try it out default server

Make sure you've installed the above dependency and then change the code to:

```js
import { API } from '@jpmorganchase/elemental';

<API
  apiDescriptionUrl="https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml"
  router="hash"
  tryItOutDefaultServer="https://tryItOutServer.server.com/"
  useCustomNav={true}
/>;
```

The try it out default server needs to be included in your api description document for this to work. If it is not found
it will default to the first server in the spec.

## Deploying the packages

We use Lerna to deploy. Follow these steps:

1. Have all your code in main
2. Create release branch from main like 'release/<unique>'
3. Checkout your new branch locally
4. Run 'yarn && yarn run version'
5. Commit & push your changes
6. Check the github actions 'Publish Package to npmjs' runs successfully
7. PR your version upgrade back to main
