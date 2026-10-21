# Stoplight Elements Demo

## Development

1. Run `npm install` in the root of the repo.
2. Change into the `demo` directory.
3. `npm start` to start the demo.
4. Open `http://localhost:4025` in your browser.

Changes to the demo or other packages in this repo will cause the demo to reload.


#### Troubleshooting Elements-Dev-Portal

The demo resolves `@stoplight/elements`, `@stoplight/elements-core` and `@stoplight/elements-dev-portal` to their sources in `packages/` (see `paths` in the root `tsconfig.json`), so changes to them reload the app.

To troubleshoot the `StoplightProject` component with the demo app, set the contents of `src/index.tsx` to the following, replacing/adding properties as needed for your use case:

```tsx
import '../../process-shim';

import '@stoplight/elements-core/styles.css';

import { StoplightProject } from '@stoplight/elements-dev-portal';
import { subscribeTheme } from '@stoplight/mosaic';
import React from 'react';
import { createRoot } from 'react-dom/client';

subscribeTheme();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoplightProject projectId="projectId" router="history"></StoplightProject>
  </React.StrictMode>,
);
```
