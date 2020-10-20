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
  type: TypeNameMap<T> | TypeNameMap<T>[];
  attributeName?: string;
} & (T extends undefined ? { defaultValue?: undefined } : { defaultValue: T });

type PropDescriptorMap<P> = {
  [K in keyof P]: PropDescriptor<P[K]>;
};

export function kebabCase(string: string): string {
  return (getParts(string, true) || []).join('-').toLowerCase();
}

export function getParts(string: string, noSpecialChars = false): any[] | null | undefined {
  const target = string.trim().normalize('NFC');
  const parts = target.includes(' ') ? target.split(' ').filter(Boolean) : splitOnSpecialChars(target);
  return noSpecialChars ? parts?.map(part => part.normalize('NFD').replace(/[^a-zA-ZØßø0-9]/g, '')) : parts;
}

export function splitOnSpecialChars(string: string): any[] | null {
  return string.match(/^[a-zà-öø-ÿ]+|[A-ZÀ-ÖØ-ß][a-zà-öø-ÿ]+|[a-zà-öø-ÿ]+|[0-9]+|[A-ZÀ-ÖØ-ß]+(?![a-zà-öø-ÿ])/g);
}

export const createElementClass = <P>(Component: React.ComponentType<P>, propDescriptors: PropDescriptorMap<P>) => {
  const _propDescriptors = Object.entries<PropDescriptor<any>>(propDescriptors as any).reduce<{
    [k: string]: PropDescriptor<any> & { originalName: string };
  }>(
    (obj, [key, value]) => ({
      ...obj,
      [kebabCase(key)]: { ...value, originalName: key },
    }),
    {},
  );

  return class extends HTMLElement {
    private _mountPoint: HTMLElement | undefined;
    private readonly _props: Partial<P> = {};

    static get observedAttributes() {
      return Object.keys(_propDescriptors);
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
      if (_propDescriptors[name]) {
        const newPropValue = this.safeReadAttribute(name as keyof P & string);
        if (!isEqual(this._props[_propDescriptors[name].originalName], newPropValue)) {
          this._props[_propDescriptors[name].originalName] = newPropValue;
          this.renderComponent();
        }
      }
    }

    connectedCallback() {
      this._mountPoint = document.createElement('div');
      this.appendChild(this._mountPoint);

      for (const key in propDescriptors) {
        if (propDescriptors.hasOwnProperty(key)) {
          this._props[key] = this.safeReadAttribute(key);
        }
      }

      this.renderComponent();
    }

    private safeReadAttribute<A extends keyof P & string>(attrName: A): Optional<P[A]> {
      if (!this.hasAttribute(attrName) || !_propDescriptors[attrName]) {
        return undefined;
      }
      const attrValue = this.getAttribute(attrName);
      const type = _propDescriptors[attrName].type;

      if (Array.isArray(type)) {
        const typesObject = type.reduce<{ [k: string]: boolean }>((newObject, t) => ({ ...newObject, [t]: true }), {});

        if (typesObject['object']) {
          try {
            return JSON.parse(attrValue ?? '');
          } catch {}
        }

        return (attrValue ?? undefined) as Optional<P[A]>;
      }

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
      if (!_propDescriptors[attrName]) {
        return;
      }

      if (!newValue) {
        this.removeAttribute(attrName);
        return;
      }

      const type = _propDescriptors[attrName].type;
      this.setAttribute(attrName, stringifyValue(newValue));

      function stringifyValue(val: P[A]): string {
        if (Array.isArray(type)) {
          const typesObject = type.reduce<{ [k: string]: boolean }>(
            (newObject, t) => ({ ...newObject, [t]: true }),
            {},
          );

          if (typesObject['object']) {
            try {
              return JSON.stringify(val);
            } catch {}
          }

          return String(val);
        }

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
      if (this._mountPoint) {
        const props = mapValues(propDescriptors, (descriptor, key) => this._props[key] ?? descriptor.defaultValue);
        ReactDOM.render(React.createElement(Component, props), this._mountPoint);
      }
    }

    disconnectedCallback() {
      if (this._mountPoint) {
        ReactDOM.unmountComponentAtNode(this._mountPoint);
        this.removeChild(this._mountPoint);
        this._mountPoint = undefined;
      }
    }
  };
};
