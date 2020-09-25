import { button, object, select, text, withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { httpOperation } from '../../__fixtures__/operations/put-todos';
import { EditHandlesMap, httpOperation as shipengineHttpOperation } from '../../__fixtures__/operations/shipengine';
import model from '../../__fixtures__/schemas/contact.json';
import { httpService } from '../../__fixtures__/services/petstore';
import { Docs, ParsedDocs } from '../../components/Docs';
import { EditHandle } from '../../constants';
import { Provider } from '../../containers/Provider';

const article = require('../../__fixtures__/articles/kitchen-sink.md').default;

export const darkMode = () => boolean('Dark Mode', false);
export const nodeType = () => select('nodeType', ['article', 'http_service', 'http_operation', 'model'], 'article');
export const nodeData = () => object('nodeData', article);

let highlighted: HTMLElement = null;

// const highlight = (el: HTMLElement) => {
//   if (highlighted) {
//     highlighted.classList.remove('highlight');
//   }
//   highlighted = el;
//   highlighted.classList.add('highlight');
// };

// const spy: React.MouseEventHandler = e => {
//   let el = e.target as HTMLElement | null;
//   while (el) {
//     for (const className of el.className.split(' ')) {
//       switch (className) {
//         case 'HttpOperation': {
//           console.log('HttpOperation', el.dataset.nodeid);
//           highlight(el);
//           return;
//         }
//         case 'HttpOperation__Description': {
//           console.log('HttpOperation__Description');
//           highlight(el);
//           return;
//         }
//         case 'HttpOperation__Path': {
//           console.log('HttpOperation__Path');
//           highlight(el);
//           return;
//         }
//         case 'HttpOperation__Method': {
//           console.log('HttpOperation__Method');
//           highlight(el);
//           return;
//         }
//         case 'HttpSecuritySchemes__SecurityScheme': {
//           console.log('HttpSecuritySchemes__SecurityScheme', el.dataset.key);
//           highlight(el);
//           return;
//         }
//         case 'HttpSecuritySchemes__OAuth2Flow': {
//           console.log('HttpSecuritySchemes__OAuth2Flow', el.dataset.flow);
//           highlight(el);
//           return;
//         }
//         case 'HttpOperation__Body': {
//           console.log('HttpOperation__Body');
//           highlight(el);
//           return;
//         }
//         case 'HttpOperation__Parameters': {
//           console.log('HttpOperation__Parameters', el.dataset.type);
//           highlight(el);
//           return;
//         }
//         case 'HttpOperation__Parameter': {
//           console.log('HttpOperation__Parameter', el.dataset.type, el.dataset.name);
//           highlight(el);
//           return;
//         }
//         case 'HttpOperation__Responses': {
//           console.log('HttpOperation__Responses');
//           highlight(el);
//           return;
//         }
//         case 'HttpOperation__Response': {
//           console.log('HttpOperation__Response');
//           highlight(el);
//           return;
//         }
//         default:
//       }
//     }
//     el = el.parentElement;
//   }
// };

let selected: { kind: string; edithandle: string } = {
  kind: null,
  edithandle: null,
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
  })
  .add('Editing', () => {
    const [foo, bar] = React.useState(false);
    const highlight = (el: HTMLElement) => {
      if (highlighted) {
        highlighted.classList.remove('highlight');
      }
      highlighted = el;
      highlighted.classList.add('highlight');

      console.log(selected);
      console.log(EditHandlesMap.get(parseInt(selected.edithandle)));
      // Force re-render in order to get Knobs.
      bar(!foo);
    };

    if (selected.edithandle) {
      switch (selected.kind) {
        case 'HttpOperation': {
          const o = EditHandlesMap.get(parseInt(selected.edithandle));
          o.method = select('method', ['get', 'put', 'post', 'delete', 'etc'], o.method, 'Operation');
          o.path = text('path', o.path, 'Operation');
          o.description = text('description', o.description, 'Operation');
          break;
        }
        case 'HttpSecuritySchemes__SecurityScheme': {
          const o = EditHandlesMap.get(parseInt(selected.edithandle));
          o.key = text('key', o.key, 'SecurityScheme');
          o.description = text('description', o.description, 'SecurityScheme');
          o.type = select('type', ['apiKey', 'http', 'openIdConnect', 'oauth2'], o.type, 'SecurityScheme');
          switch (o.type) {
            case 'apiKey': {
              o.name = text('name', o.name, 'SecurityScheme');
              o.in = select('in', ['query', 'header', 'cookie'], o.in, 'SecurityScheme');
              break;
            }
            case 'http': {
              o.scheme = select('scheme', ['basic', 'digest', 'bearer'], o.scheme, 'SecurityScheme');
              if (o.scheme === 'bearer') {
                o.bearerFormat = text('bearerFormat', o.bearerFormat, 'SecurityScheme');
              }
              break;
            }
            case 'openIdConnect': {
              o.openIdConnectUrl = text('openIdConnectUrl', o.openIdConnectUrl, 'SecurityScheme');
              break;
            }
          }
          break;
        }
        case 'HttpOperation__Body': {
          const o = EditHandlesMap.get(parseInt(selected.edithandle));
          o.description = text('description', o.description, 'Body');
          o.required = boolean('required', o.required, 'Body');
          break;
        }
        case 'HttpOperation__Response': {
          const o = EditHandlesMap.get(parseInt(selected.edithandle));
          o.code = text('code', o.code, 'Response');
          o.description = text('description', o.description, 'Response');
          o.required = boolean('required', o.required, 'Response');
          break;
        }
        case 'HttpOperation__Responses': {
          const o = EditHandlesMap.get(parseInt(selected.edithandle));
          button(
            'Add Response',
            () => {
              const h = Math.floor(Math.random() * 1000000);
              const p = {
                code: '100',
                description: '',
                required: '',
                headers: [],
                content: [],
                [EditHandle]: h,
              };
              EditHandlesMap.set(h, p);
              o.push(p);
            },
            'Responses',
          );
          break;
        }
      }
    }

    const spy: React.MouseEventHandler = e => {
      let el = e.target as HTMLElement | null;
      selected = {
        kind: null,
        edithandle: null,
      };
      while (el) {
        for (const className of el.className.split(' ')) {
          switch (className) {
            case 'HttpOperation': {
              selected.kind = selected.kind ?? 'HttpOperation';
              selected.edithandle = el.dataset.edithandle;
              highlight(el);
              return;
            }
            case 'HttpOperation__Description': {
              selected.kind = selected.kind ?? 'HttpOperation__Description';
              console.log('HttpOperation__Description');
              highlight(el);
              return;
            }
            case 'HttpOperation__Path': {
              selected.kind = selected.kind ?? 'HttpOperation__Path';
              console.log('HttpOperation__Path');
              highlight(el);
              return;
            }
            case 'HttpOperation__Method': {
              selected.kind = selected.kind ?? 'HttpOperation__Method';
              console.log('HttpOperation__Method');
              highlight(el);
              return;
            }
            case 'HttpSecuritySchemes__SecurityScheme': {
              selected.kind = selected.kind ?? 'HttpSecuritySchemes__SecurityScheme';
              selected.edithandle = el.dataset.edithandle;
              highlight(el);
              return;
            }
            case 'HttpSecuritySchemes__OAuth2Flow': {
              selected.kind = selected.kind ?? 'HttpSecuritySchemes__OAuth2Flow';
              console.log('HttpSecuritySchemes__OAuth2Flow', el.dataset.flow);
              selected.flow = el.dataset.flow;
              highlight(el);
              return;
            }
            case 'HttpOperation__Body': {
              selected.kind = selected.kind ?? 'HttpOperation__Body';
              selected.edithandle = el.dataset.edithandle;
              highlight(el);
              return;
            }
            case 'HttpOperation__Parameters': {
              selected.kind = selected.kind ?? 'HttpOperation__Parameters';
              console.log('HttpOperation__Parameters', el.dataset.type);
              selected.type = el.dataset.type;
              highlight(el);
              return;
            }
            case 'HttpOperation__Parameter': {
              selected.kind = selected.kind ?? 'HttpOperation__Parameter';
              console.log('HttpOperation__Parameter', el.dataset.type, el.dataset.name);
              selected.type = el.dataset.type;
              selected.name = el.dataset.name;
              highlight(el);
              return;
            }
            case 'HttpOperation__Responses': {
              selected.kind = selected.kind ?? 'HttpOperation__Responses';
              selected.edithandle = el.dataset.edithandle;
              highlight(el);
              return;
            }
            case 'HttpOperation__Response': {
              selected.kind = selected.kind ?? 'HttpOperation__Response';
              selected.edithandle = el.dataset.edithandle;
              highlight(el);
              return;
            }
            case 'HttpOperation__ResponseExample': {
              selected.kind = selected.kind ?? 'HttpOperation__ResponseExample';
              console.log('HttpOperation__ResponseExample');
              selected.edithandle = el.dataset.edithandle;
              highlight(el);
              return;
            }
            case 'HttpOperation__ResponseExample_Tab': {
              selected.kind = selected.kind ?? 'HttpOperation__ResponseExample_Tab';
              console.log('HttpOperation__ResponseExample_Tab');
              selected.edithandle = el.dataset.edithandle;
              highlight(el);
              return;
            }
            default:
          }
        }
        el = el.parentElement;
      }
    };
    const el = (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })} onClick={spy}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <ParsedDocs nodeType="http_operation" nodeData={shipengineHttpOperation} />
        </Provider>
      </div>
    );
    return el;
  })
  .add('Editing Performance', () => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
      const i = setTimeout(() => setCount(count + 1), 0);
      console.time('edit');
      return () => {
        clearTimeout(i);
        console.timeEnd('edit');
      };
    });

    shipengineHttpOperation.path = originalPath.slice(0, count % originalPath.length);
    shipengineHttpOperation.method = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'][
      Math.floor(count / 10) % 8
    ];
    shipengineHttpOperation.description = originalDescription.slice(0, count % originalDescription.length);
    shipengineHttpOperation.security[0][0].description = originalSecurityDescription.slice(
      0,
      count % originalSecurityDescription.length,
    );
    shipengineHttpOperation.request.body.description = originalRequestBodyDescription.slice(
      0,
      count % originalRequestBodyDescription.length,
    );

    for (let i = 0; i < 3; i++) {
      shipengineHttpOperation.responses[i].description = originalResponseDescriptions[i].slice(
        0,
        count % originalResponseDescriptions[i].length,
      );
    }

    const el = (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })} onClick={spy}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <ParsedDocs nodeType="http_operation" nodeData={shipengineHttpOperation} />
        </Provider>
      </div>
    );
    return el;
  });

const originalPath = shipengineHttpOperation.path;
const originalDescription = shipengineHttpOperation.description;
const originalSecurityDescription = shipengineHttpOperation.security[0][0].description;

const originalRequestBodyDescription = shipengineHttpOperation.request.body.description;

const originalResponseDescriptions = [
  shipengineHttpOperation.responses[0].description,
  shipengineHttpOperation.responses[1].description,
  shipengineHttpOperation.responses[2].description,
];

console.log(EditHandlesMap);
