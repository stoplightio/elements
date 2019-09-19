import './styles/widgets.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { Hub } from './containers/Hub';
import { Page } from './containers/Page';
import { IProvider, Provider } from './containers/Provider';
import { TableOfContents } from './containers/TableOfContents';

export const createElement = React.createElement;

export const config: IProvider = {
  host: '',
  token: '',
  components: {},
};

interface ITableOfContentsOptions {
  isOpen?: boolean;
  onClose?: () => void;
  enableDrawer?: boolean | number;
}

export interface IWidget<T = unknown> {
  srn: string;
  render(htmlId: string, srn: string, options: T): void;
  remove(): void;
}

class Widget<T = unknown> implements IWidget<T> {
  private _htmlId: string = '';
  private _srn: string = '';
  private _component: React.FunctionComponent<{ srn: string }>;
  private _options!: T;

  constructor(Component: React.FunctionComponent<{ srn: string }>, getOptions?: (self: Widget<T>) => T) {
    this._component = Component;

    if (getOptions) {
      this._options = getOptions(this);
    }
  }

  public get htmlId() {
    return this._htmlId;
  }

  public get srn() {
    return this._srn;
  }

  public set srn(srn: string) {
    this._srn = decodeURI(srn);

    if (this.htmlId) {
      // Whenever the SRN changes, re-render the element
      this.render(this.htmlId);
    }
  }

  public get options() {
    return this._options;
  }

  public set options(options: T) {
    this._options = { ...this._options, ...options };
    this.render(this.htmlId, this.srn, this._options);
  }

  public render(htmlId: string, srn?: string, options?: T) {
    if (typeof document === 'undefined') {
      throw new Error(`${name} widget can only be rendered on the client.`);
    }

    const elem = document.getElementById(htmlId);
    if (!elem) {
      throw new Error(`Failed to find element with id "${htmlId}"`);
    }

    this._htmlId = htmlId;

    if (srn) {
      this._srn = decodeURI(srn);
    }

    if (options) {
      this._options = { ...this._options, ...options };
    }

    console.log(options, this._options, this.options);

    const Component = this._component;

    ReactDOM.render(
      <Provider host={config.host} token={config.token} components={config.components}>
        <Component srn={this.srn} {...this.options} />
      </Provider>,
      elem,
    );
  }

  public remove() {
    if (typeof document === 'undefined') {
      throw new Error(`${name} widget can only be rendered on the client.`);
    }

    const elem = document.getElementById(this.htmlId);
    if (!elem) {
      throw new Error(`Failed to find element with id "${this.htmlId}"`);
    }

    ReactDOM.unmountComponentAtNode(elem);
  }
}

export const elements = {
  hub: new Widget(Hub),
  page: new Widget(Page),
  toc: new Widget<ITableOfContentsOptions>(TableOfContents, (self: Widget<ITableOfContentsOptions>) => ({
    isOpen: false,
    enableDrawer: true,
    onClose: () => (self.options = { isOpen: false }),
  })),
};
