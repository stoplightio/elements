import './styles/widgets.scss';

import { NodeType } from '@stoplight/types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Docs } from './components/Docs';
import { TryIt } from './components/TryIt';
import { Hub } from './containers/Hub';
import { IPageContainer, Page } from './containers/Page';
import { IProvider, Provider } from './containers/Provider';
import { TableOfContents } from './containers/TableOfContents';
import { INodeInfo } from './types';

export const createElement = React.createElement;

export const config: IProvider = {
  host: '',
  token: '',
  components: {},
};

export interface ITableOfContentsOptions {
  group?: string;
  isOpen?: boolean;
  onClose?: () => void;
  enableDrawer?: boolean | number;
}

export interface IWidget<T = unknown> {
  srn: string;
  group?: string;
  options: T;
  render(htmlId: string, srn?: string, group?: string, options?: T): void;
  remove(): void;
}

class Widget<T = unknown> implements IWidget<T> {
  private _htmlId: string = '';
  private _srn: string = '';
  private _group: string = '';

  private _component: React.FunctionComponent<T & { srn: string; group?: string }>;
  private _options!: T;

  constructor(Component: React.FunctionComponent<T & { srn: string; group?: string }>, options?: T) {
    this._component = Component;

    if (options) {
      this._options = options;
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

  public get group() {
    return this._group;
  }
  public set group(group: string) {
    this._group = decodeURI(group);

    if (this.htmlId) {
      // Whenever the Group changes, re-render the element
      this.render(this.htmlId);
    }
  }

  public get options() {
    return this._options;
  }
  public set options(options: T) {
    this._options = { ...this._options, ...options };

    if (this.htmlId) {
      // Whenever the options change, re-render the element
      this.render(this.htmlId);
    }
  }

  public render(htmlId: string, srn?: string, group?: string, options?: T) {
    if (typeof document === 'undefined') {
      throw new Error(`${name} widget can only be rendered on the client.`);
    }

    const elem = document.getElementById(htmlId);
    if (!elem) {
      throw new Error(`Failed to find element with id "${htmlId}"`);
    }

    this._htmlId = htmlId;

    if (srn) {
      // Warning: don't set this.srn here or you will get into an infinite rendering loop
      this._srn = decodeURI(srn);
    }

    if (group) {
      this._group = group;
    }

    if (options) {
      // Warning: don't set this.options here or you will get into an infinite rendering loop
      this._options = { ...this._options, ...options };
    }

    const Component = this._component;

    ReactDOM.render(
      <Provider host={config.host} token={config.token} components={config.components} icons={config.icons}>
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

function renderTabs({ node }: { node: INodeInfo }) {
  const tabs = [
    {
      title: 'Docs',
      content: <Docs node={node} />,
    },
  ];

  if (node.type === NodeType.HttpOperation) {
    tabs.push({
      title: 'Try It',
      content: <TryIt value={node.data} />,
    });
  }

  return tabs;
}

export const elements = {
  hub: new Widget<{ tabs: IPageContainer['tabs']; group?: string }>(Hub, {
    tabs: renderTabs,
  }),

  page: new Widget<{ tabs: IPageContainer['tabs']; group?: string }>(Page, {
    tabs: renderTabs,
  }),

  toc: new Widget<ITableOfContentsOptions>(TableOfContents, {
    isOpen: false,
    enableDrawer: true,
  }),
};
elements.toc.options = {
  onClose: () => {
    elements.toc.options = { isOpen: false };
  },
};
