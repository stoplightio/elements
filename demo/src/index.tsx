import '../../process-shim';

import '@stoplight/elements-core/styles.css';

import { subscribeTheme } from '@stoplight/mosaic';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { App } from './App';

subscribeTheme();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
