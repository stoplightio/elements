import '@stoplight/elements-core/styles.css';

import { subscribeTheme } from '@stoplight/mosaic';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

subscribeTheme();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
