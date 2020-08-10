import { safeParse, safeStringify } from '@stoplight/json';
import { Optional } from '@stoplight/types';
import { isEqual, mapValues } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

type TypeNameMap<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object';

type PropDescriptor<T> = {
  type: TypeNameMap<T>;
} & (T extends undefined ? { defaultValue?: undefined } : { defaultValue: T });

type PropDescriptorMap<P> = {
  [K in keyof P]: PropDescriptor<P[K]>;
};

export const createElementClass = <P>(Component: React.ComponentType<P>, propDescriptors: PropDescriptorMap<P>) => {
  return class extends HTMLElement {
    private _shadow: { root: ShadowRoot; mountPoint: HTMLElement } | undefined;
    private readonly _props: Partial<P> = {};

    static get observedAttributes() {
      return Object.keys(propDescriptors);
    }

    constructor() {
      super();

      // define getters and setters for all properties
      Object.defineProperties(
        this,
        mapValues(propDescriptors, (_, key) => ({
          get: () => {
            return this._props[key];
          },
          set: (newValue: any) => {
            if (this._props[key] === newValue) {
              return;
            }
            this._props[key] = newValue;
            this.renderComponent();
            this.safeWriteAttribute(key as keyof P & string, newValue);
          },
          enumerable: true,
        })),
      );
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      if (propDescriptors[name]) {
        const newPropValue = this.safeReadAttribute(name as keyof P & string);
        if (!isEqual(this._props[name], newPropValue)) {
          this._props[name] = newPropValue;
          this.renderComponent();
        }
      }
    }

    connectedCallback() {
      const mountPoint = document.createElement('div');
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(mountPoint);
      this._shadow = { mountPoint, root: shadowRoot };

      for (const key in propDescriptors) {
        if (propDescriptors.hasOwnProperty(key)) {
          this._props[key] = this.safeReadAttribute(key);
        }
      }

      this.renderComponent();
    }

    private safeReadAttribute<A extends keyof P & string>(attrName: A): Optional<P[A]> {
      if (!this.hasAttribute(attrName) || !propDescriptors[attrName]) {
        return undefined;
      }
      const attrValue = this.getAttribute(attrName);
      const type = propDescriptors[attrName].type;
      if (type === 'string') {
        return (attrValue ?? undefined) as Optional<P[A]>;
      }
      if (type === 'number') {
        return (attrValue ? Number(attrValue) : undefined) as Optional<P[A]>;
      }
      if (type === 'boolean') {
        return (attrValue ? Boolean(attrValue) : undefined) as Optional<P[A]>;
      }
      if (type === 'object') {
        return safeParse(attrValue ?? '') as Optional<P[A]>;
      }

      return undefined;
    }

    private safeWriteAttribute<A extends keyof P & string>(attrName: A, newValue: P[A]) {
      if (!propDescriptors[attrName]) {
        return;
      }

      if (!newValue) {
        this.removeAttribute(attrName);
        return;
      }

      const type = propDescriptors[attrName].type;
      this.setAttribute(attrName, stringifyValue(newValue));

      function stringifyValue(val: P[A]): string {
        if (type === 'string' || type === 'number' || type === 'boolean') {
          return String(val);
        }

        if (type === 'object') {
          return safeStringify(val) || '';
        }

        return '';
      }
    }

    private renderComponent() {
      if (this._shadow) {
        const props = mapValues(propDescriptors, (descriptor, key) => this._props[key] ?? descriptor.defaultValue);
        ReactDOM.render(React.createElement(Component, props), this._shadow.mountPoint);
      }
    }

    disconnectedCallback() {
      if (this._shadow) {
        ReactDOM.unmountComponentAtNode(this._shadow.mountPoint);
        this._shadow = undefined;
      }
    }
  };
};
