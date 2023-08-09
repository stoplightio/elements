# JP Morgan Elemental

This repo is a fork of stoplight elements. 
The plan for this repo is to update elements to allow us to rapidly deploy features we require and then look to merge back to elements.

## JP Morgan Features developed

- Callbacks being rendered
- Default try it out server and removal of server dropdown from try it out section

## How to use

Instead of install the stoplight component instead use:

```bash
$ npm install @jpmorganchase/elemental
```

Then follow stoplights readme at [here](./STOPLIGHT_ELEMENTS_README.md)

### Using try it out default server

Make sure you've installed the above dependency and then change the code to:

```js
import { API } from "@jpmorganchase/elemental";

<API
  apiDescriptionUrl="https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml"
  router="history"
  tryItOutDefaultServer="https://tryItOutServer.server.com/"
/>
```
The try it out default server needs to be included in your api description document for this to work. If it is not found it will default to the first server in the spec.


