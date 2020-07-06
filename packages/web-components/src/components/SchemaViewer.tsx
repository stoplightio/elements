import { SchemaViewer } from '@stoplight/elements/dist/components/SchemaViewer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class SchemaViewerComponentElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);

    ReactDOM.render(<SchemaViewer schema={{ type: 'string' }} />, mountPoint);
  }
}
