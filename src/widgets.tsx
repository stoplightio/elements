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

export interface IWidget {
  srn: string;
  render(htmlId: string, srn: string): void;
  remove(): void;
}

class Widget implements IWidget {
  private _htmlId: string = '';
  private _srn: string = '';
  private _component: React.FunctionComponent<{ srn: string }>;

  constructor(Component: React.FunctionComponent<{ srn: string }>) {
    this._component = Component;
  }

  public get htmlId() {
    return this._htmlId;
  }

  public get srn() {
    return this._srn;
  }
  public set srn(srn: string) {
    this._srn = srn;

    if (this.htmlId) {
      // Whenever the SRN changes, re-render the element
      this.render(this.htmlId);
    }
  }

  public render(htmlId: string, srn?: string) {
    if (typeof document === 'undefined') {
      throw new Error(`${name} widget can only be rendered on the client.`);
    }

    const elem = document.getElementById(htmlId);
    if (!elem) {
      throw new Error(`Failed to find element with id "${htmlId}"`);
    }

    this._htmlId = htmlId;

    if (srn) {
      this._srn = srn;
    }

    const Component = this._component;

    ReactDOM.render(
      <Provider host={config.host} token={config.token} components={config.components}>
        <Component srn={this.srn} />
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
  toc: new Widget(TableOfContents),
};
