import { ISchemaViewerProps, SchemaViewer } from '@stoplight/elements/dist/components/SchemaViewer';
import { safeParse, safeStringify } from '@stoplight/json';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;

const defaultProps: ISchemaViewerProps = {
  schema: { type: 'any' },
};

export class SchemaViewerComponentElement extends HTMLElement {
  private _mountPoint: HTMLElement | undefined;
  private readonly _props: Partial<ISchemaViewerProps> = {};

  static get observedAttributes() {
    return ['schema'];
  }

  public get schema(): JSONSchema | undefined {
    return this._props.schema;
  }

  public set schema(value: JSONSchema | undefined) {
    this._props.schema = value;
    this.renderComponent();

    if (!value) {
      this.removeAttribute('schema');
    }
    this.setAttribute('schema', safeStringify(value));
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    // When the drawer is disabled, update keyboard/screen reader behavior.
    if (name === 'schema') {
      const deserialized = safeParse(newValue || '');
      if (deserialized !== this._props.schema) {
        this._props.schema = deserialized;
        this.renderComponent();
      }
    }
  }

  connectedCallback() {
    const schemaFromAttr = safeParse(this.getAttribute('schema') ?? '');
    if (schemaFromAttr) {
      this._props.schema = schemaFromAttr;
    }

    this._mountPoint = document.createElement('div');
    this.appendChild(this._mountPoint);

    this.renderComponent();
  }

  private renderComponent() {
    if (this._mountPoint) {
      ReactDOM.render(<SchemaViewer {...defaultProps} {...this._props} />, this._mountPoint);
    }
  }

  disconnectedCallback() {
    if (this._mountPoint) {
      ReactDOM.unmountComponentAtNode(this._mountPoint);
      this.removeChild(this._mountPoint);
      this._mountPoint = undefined;
    }
  }
}
