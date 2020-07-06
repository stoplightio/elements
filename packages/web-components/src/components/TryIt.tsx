import { TryIt } from '@stoplight/elements/dist/components/TryIt';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class TryItCoponentElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);

    ReactDOM.render(<TryIt nodeType="http" nodeData={null} />, mountPoint);
  }
}
