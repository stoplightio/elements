import { object, select, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { httpOperation } from '../../__fixtures__/operations/put-todos';
import model from '../../__fixtures__/schemas/contact.json';
import { httpService } from '../../__fixtures__/services/petstore';
import { Docs } from '../../components/Docs';
import { Provider } from '../../containers/Provider';

const article = require('../../__fixtures__/articles/kitchen-sink.md').default;

export const darkMode = () => boolean('Dark Mode', false);
export const nodeType = () => select('nodeType', ['article', 'http_service', 'http_operation', 'model'], 'article');
export const nodeData = () => object('nodeData', article);

let highlighted: HTMLElement = null;

const highlight = (el: HTMLElement) => {
  if (highlighted) {
    highlighted.classList.remove('highlight');
  }
  highlighted = el;
  highlighted.classList.add('highlight');
};

const spy: React.MouseEventHandler = e => {
  let el = e.target as HTMLElement | null;
  while (el) {
    for (const className of el.className.split(' ')) {
      switch (className) {
        case 'HttpOperation': {
          console.log('HttpOperation', el.dataset.nodeid);
          highlight(el);
          return;
        }
        case 'HttpOperation__Description': {
          console.log('HttpOperation__Description');
          highlight(el);
          return;
        }
        case 'HttpOperation__Path': {
          console.log('HttpOperation__Path');
          highlight(el);
          return;
        }
        case 'HttpOperation__Method': {
          console.log('HttpOperation__Method');
          highlight(el);
          return;
        }
        case 'HttpSecuritySchemes__SecurityScheme': {
          console.log('HttpSecuritySchemes__SecurityScheme', el.dataset.key);
          highlight(el);
          return;
        }
        case 'HttpSecuritySchemes__OAuth2Flow': {
          console.log('HttpSecuritySchemes__OAuth2Flow', el.dataset.flow);
          highlight(el);
          return;
        }
        case 'HttpOperation__Body': {
          console.log('HttpOperation__Body');
          highlight(el);
          return;
        }
        case 'HttpOperation__Parameters': {
          console.log('HttpOperation__Parameters', el.dataset.type);
          highlight(el);
          return;
        }
        case 'HttpOperation__Parameter': {
          console.log('HttpOperation__Parameter', el.dataset.type, el.dataset.name);
          highlight(el);
          return;
        }
        case 'HttpOperation__Responses': {
          console.log('HttpOperation__Responses');
          highlight(el);
          return;
        }
        case 'HttpOperation__Response': {
          console.log('HttpOperation__Response');
          highlight(el);
          return;
        }
        default:
      }
    }
    el = el.parentElement;
  }
};

storiesOf('components/Docs', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Article', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <Docs nodeType="article" nodeData={article} />
        </Provider>
      </div>
    );
  })
  .add('Model', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <Docs nodeType="model" nodeData={model} />
        </Provider>
      </div>
    );
  })
  .add('HTTP Service', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <Docs nodeType="http_service" nodeData={JSON.stringify(httpService)} />
        </Provider>
      </div>
    );
  })
  .add('HTTP Operation', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })} onClick={spy}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <Docs nodeType="http_operation" nodeData={JSON.stringify(httpOperation)} />
        </Provider>
      </div>
    );
  })
  .add('Playground', () => {
    return (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <Docs nodeType={nodeType()} nodeData={nodeData()} />
        </Provider>
      </div>
    );
  });
