import './styles/widgets.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Page } from './containers/Page';
import { IProvider, Provider } from './containers/Provider';
import { TableOfContents } from './containers/TableOfContents';

export const config: IProvider = {};

export const widgets = {};

createWidget('page', Page);
createWidget('toc', TableOfContents);

function createWidget(name: string, Component: React.FunctionComponent<{ srn: string }>) {
  widgets[name] = {
    htmlId: '',
    srn: '',

    render(htmlId: string, srn: string) {
      if (typeof document === 'undefined') {
        throw new Error(`${name} widget can only be rendered on the client.`);
      }

      const elem = document.getElementById(htmlId);
      if (!elem) {
        throw new Error(`Failed to find element with id "${htmlId}"`);
      }

      widgets[name].htmlId = htmlId;

      if (srn) {
        widgets[name].srn = srn;
      }

      ReactDOM.render(
        <Provider host={config.host} token={config.token} components={config.components}>
          <Component srn={widgets[name].srn} />
        </Provider>,
        elem,
      );
    },

    remove() {
      if (typeof document === 'undefined') {
        throw new Error(`${name} widget can only be rendered on the client.`);
      }

      const elem = document.getElementById(widgets[name].htmlId);
      if (!elem) {
        throw new Error(`Failed to find element with id "${widgets[name].htmlId}"`);
      }

      ReactDOM.unmountComponentAtNode(elem);
    },
  };
}
