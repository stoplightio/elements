import { SchemaViewer } from '@stoplight/elements/dist/components/SchemaViewer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class SchemaViewerComponentElement extends HTMLElement {
  private _mountPoint: HTMLElement | undefined;

  connectedCallback() {
    this._mountPoint = document.createElement('div');
    this.appendChild(this._mountPoint);

    ReactDOM.render(<SchemaViewer schema={{ type: 'string' }} />, this._mountPoint);
  }

  disconnectedCallback() {
    if (this._mountPoint) {
      ReactDOM.unmountComponentAtNode(this._mountPoint);
      this.removeChild(this._mountPoint);
      this._mountPoint = undefined;
    }
  }
}
