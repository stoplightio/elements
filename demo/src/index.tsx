import { Provider as MosaicProvider, subscribeTheme } from '@stoplight/mosaic';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

subscribeTheme();

ReactDOM.render(
  <React.StrictMode>
    <MosaicProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MosaicProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
