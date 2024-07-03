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
  [K in keyof Complete<P>]: PropDescriptor<P[K]>;
};

type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : T[P] | undefined;
};

export const createElementClass = <P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  propDescriptors: PropDescriptorMap<P>,
): new () => HTMLElement => {
  return class extends HTMLElement {
    private _mountPoint: HTMLElement | undefined;
    private _props: Partial<P> = {};

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
            return this._props[key as keyof P];
          },
          set: (newValue: any) => {
            if (this._props[key as keyof P] === newValue) {
              return;
            }
            this._props[key as keyof P] = newValue;
            this._renderComponent();
            this._safeWriteAttribute(key as keyof P & string, newValue);
          },
          enumerable: true,
        })),
      );
    }

    attributeChangedCallback(name: string) {
      if (propDescriptors[name as keyof P]) {
        const newPropValue = this._safeReadAttribute(name as keyof P & string);
        if (!isEqual(this._props[name as keyof P], newPropValue)) {
          this._props[name as keyof P] = newPropValue;
          this._renderComponent();
        }
      }
    }

    connectedCallback() {
      this._mountPoint = document.createElement('div');
      this._mountPoint.style.height = '100%';
      this.appendChild(this._mountPoint);

      for (const key in propDescriptors) {
        if (propDescriptors.hasOwnProperty(key)) {
          this._props[key] = this._safeReadAttribute(key);
        }
      }

      this._renderComponent();
    }

    disconnectedCallback() {
      if (this._mountPoint) {
        ReactDOM.unmountComponentAtNode(this._mountPoint);
        this.removeChild(this._mountPoint);
        this._mountPoint = undefined;
      }
    }

    private _safeReadAttribute<A extends keyof P & string>(attrName: A): Optional<P[A]> {
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

    private _safeWriteAttribute<A extends keyof P & string>(attrName: A, newValue: P[A]) {
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

    private _renderComponent() {
      if (this._mountPoint) {
        const props = mapValues(propDescriptors, (descriptor, key) => this._props[key] ?? descriptor.defaultValue);
        ReactDOM.render(React.createElement(Component, props), this._mountPoint);
      }
    }
  };
};
