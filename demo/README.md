# Stoplight Elements Demo

## Development

1. Run `yarn` in the root of the repo.
2. Change into the `demo` directory.
3. `yarn start` to start the demo.
4. Open `http://localhost:4025` in your browser.

Changes to the demo or other packages in this repo will cause the demo to reload.


#### Troubleshooting Elements-Dev-Portal

If you are wanting to troubleshoot the `StoplightProject` component with the demo app, you will need to make the following changes: 

1. Set the contents of the index.tsx to the following, replacing/adding properties as needed for your use case:
```
import '@stoplight/elements-core/styles.css';

import { StoplightProject } from '@stoplight/elements-dev-portal';
import { subscribeTheme } from '@stoplight/mosaic';
import React from 'react';
import ReactDOM from 'react-dom';

subscribeTheme();

ReactDOM.render(
  <React.StrictMode>
    <StoplightProject projectId="projectId" router="history"></StoplightProject>
  </React.StrictMode>,
  document.getElementById('root'),
);
```
2. Update the package.js to include the new dependency 
`"@stoplight/elements-dev-portal": "^2.0.0",`

3. To ensure the local elements-dev-portal package is included and the app reloads on change, update the common.js webpack file to include the package. 
```
...
const absoluteElementsDevPortalPath = resolve(__dirname, '../../packages/elements-dev-portal/src');
...      
module.exports = {
  ...
  resolve: {
    ...
    alias: {
      ...
      '@stoplight/elements-dev-portal': absoluteElementsDevPortalPath,
      ...

```
4. Additionally update the .babelrc module resolver to include `"@stoplight/elements-dev-portal": "../packages/elements-dev-portal/src"
`