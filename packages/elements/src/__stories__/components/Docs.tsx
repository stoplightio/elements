import { HttpParamStyles } from '@stoplight/types';
import { boolean, button, object, RESET, select, text, withKnobs } from '@storybook/addon-knobs';
import addons from '@storybook/addons';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { httpOperation } from '../../__fixtures__/operations/put-todos';
import { EditHandlesMap, httpOperation as shipengineHttpOperation } from '../../__fixtures__/operations/shipengine';
import { httpOperation as shipengineHttpOperation2, IdMap } from '../../__fixtures__/operations/shipengine2';
import model from '../../__fixtures__/schemas/contact.json';
import { httpService } from '../../__fixtures__/services/petstore';
import { IAny } from '../../AST';
import { IMagicNode } from '../../AST/basics';
import { IRequestBody } from '../../AST/RequestBody';
import { Docs, ParsedDocs } from '../../components/Docs';
import { HttpOperation } from '../../components/Docs/HttpOperation2';
import { SelectionContext } from '../../components/Docs/HttpOperation2/SelectionContext';
import { EditHandle, EditMetadata } from '../../constants';
import { Provider } from '../../containers/Provider';

const article = require('../../__fixtures__/articles/kitchen-sink.md').default;

export const darkMode = () => boolean('Dark Mode', false);
export const nodeType = () => select('nodeType', ['article', 'http_service', 'http_operation', 'model'], 'article');
export const nodeData = () => object('nodeData', article);

let selected: { kind: string; edithandle: EditMetadata } = {
  kind: null,
  edithandle: null,
};

const selections: string[] = [];

let selected2: string | undefined;
const selections2 = new Set<string>();

storiesOf('Internal/Docs', module)
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
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
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
    const channel = addons.getChannel();

    const highlight = () => {
      console.log('selected', selected);
      if (selected.kind && selected.edithandle) {
        selections.push(selected.edithandle.id);
        console.log('selections', selections);
        const o = EditHandlesMap.get(selected.edithandle.id);
        console.log('current', o);
        o[EditHandle].selected = selected.edithandle.selected;
        // Force re-render in order to get Knobs.
        channel.emit(RESET);
      }
    };

    if (selected.edithandle) {
      switch (selected.kind) {
        case 'HttpOperation': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          o.method = select('method', ['get', 'put', 'post', 'delete', 'etc'], o.method, 'In Situdio');
          o.path = text('path', o.path, 'In Situdio');
          o.description = text('description', o.description, 'In Situdio');
          break;
        }
        case 'HttpOperation__Method': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          o.method = select('method', ['get', 'put', 'post', 'delete', 'etc'], o.method, 'In Situdio');
          break;
        }
        case 'HttpOperation__Path': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          o.path = text('path', o.path, 'In Situdio');
          break;
        }
        case 'HttpOperation__Description': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          o.description = text('description', o.description, 'In Situdio');
          break;
        }
        case 'HttpSecuritySchemes__SecurityScheme': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          o.key = text('key', o.key, 'In Situdio');
          o.description = text('description', o.description, 'In Situdio');
          o.type = select('type', ['apiKey', 'http', 'openIdConnect', 'oauth2'], o.type, 'In Situdio');
          switch (o.type) {
            case 'apiKey': {
              o.name = text('name', o.name, 'In Situdio');
              o.in = select('in', ['query', 'header', 'cookie'], o.in, 'In Situdio');
              break;
            }
            case 'http': {
              o.scheme = select('scheme', ['basic', 'digest', 'bearer'], o.scheme, 'In Situdio');
              if (o.scheme === 'bearer') {
                o.bearerFormat = text('bearerFormat', o.bearerFormat, 'In Situdio');
              }
              break;
            }
            case 'openIdConnect': {
              o.openIdConnectUrl = text('openIdConnectUrl', o.openIdConnectUrl, 'In Situdio');
              break;
            }
          }
          break;
        }
        case 'HttpOperation__Parameters': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          button(
            'Add Parameter',
            () => {
              selected.edithandle = {
                id: String(Math.floor(Math.random() * 1000000)),
                selected: true,
              };
              const p = {
                schema: {
                  type: 'string',
                },
                name: '',
                style: HttpParamStyles.Simple,
                required: true,
                [EditHandle]: selected.edithandle,
              };
              EditHandlesMap.set(selected.edithandle.id, p);
              o.push(p);
            },
            'In Situdio',
          );
          break;
        }
        case 'HttpOperation__Parameter': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          o.name = text('name', o.name, 'In Situdio');
          o.style = select('style', Object.values(HttpParamStyles), o.style, 'In Situdio');
          o.description = text('description', o.description, 'In Situdio');
          o.required = boolean('required', o.required, 'In Situdio');
          o.deprecated = boolean('deprecated', o.deprecated, 'In Situdio');
          button(
            'Delete',
            () => {
              alert('Actually... that is kinda hard to implement using this data model. Who IS my parent?');
            },
            'In Situdio',
          );
          break;
        }
        case 'HttpOperation__Body': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          o.description = text('description', o.description, 'In Situdio');
          o.required = boolean('required', o.required, 'In Situdio');
          break;
        }
        case 'HttpOperation__Responses': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          button(
            'Add Response',
            () => {
              selected.edithandle = {
                id: String(Math.floor(Math.random() * 1000000)),
                selected: true,
              };
              const p = {
                code: '100',
                description: '',
                required: '',
                headers: [],
                content: [],
                [EditHandle]: selected.edithandle,
              };
              EditHandlesMap.set(selected.edithandle.id, p);
              o.push(p);
            },
            'In Situdio',
          );
          break;
        }
        case 'HttpOperation__Response': {
          const o = EditHandlesMap.get(selected.edithandle.id);
          o.code = text('code', o.code, 'In Situdio');
          o.description = text('description', o.description, 'In Situdio');
          break;
        }
      }
    }

    const spy: React.MouseEventHandler = e => {
      let el = e.target as HTMLElement | null;

      if (selections.length && !(e.metaKey || e.ctrlKey)) {
        for (const id of selections) {
          const o = EditHandlesMap.get(id);
          if (o) delete o[EditHandle].selected;
        }
        selections.length = 0;
      }

      selected = {
        kind: null,
        edithandle: null,
      };
      while (el) {
        for (const className of el.className.split(' ')) {
          switch (className) {
            case 'HttpOperation': {
              selected.kind = selected.kind ?? 'HttpOperation';
              selected.edithandle = { id: el.dataset.edithandle, selected: true };
              highlight();
              return;
            }
            case 'HttpOperation__Description': {
              selected.kind = selected.kind ?? 'HttpOperation__Description';
              selected.edithandle = { id: el.dataset.edithandle, selected: 'description' };
              highlight();
              return;
            }
            case 'HttpOperation__Path': {
              selected.kind = selected.kind ?? 'HttpOperation__Path';
              selected.edithandle = { id: el.dataset.edithandle, selected: 'path' };
              highlight();
              return;
            }
            case 'HttpOperation__Method': {
              selected.kind = selected.kind ?? 'HttpOperation__Method';
              selected.edithandle = { id: el.dataset.edithandle, selected: 'method' };
              highlight();
              return;
            }
            case 'HttpSecuritySchemes__SecurityScheme': {
              selected.kind = selected.kind ?? 'HttpSecuritySchemes__SecurityScheme';
              selected.edithandle = { id: el.dataset.edithandle, selected: true };
              highlight();
              return;
            }
            case 'HttpOperation__Body': {
              selected.kind = selected.kind ?? 'HttpOperation__Body';
              selected.edithandle = { id: el.dataset.edithandle, selected: true };
              highlight();
              return;
            }
            case 'HttpOperation__Parameters': {
              selected.kind = selected.kind ?? 'HttpOperation__Parameters';
              selected.edithandle = { id: el.dataset.edithandle, selected: true };
              highlight();
              return;
            }
            case 'HttpOperation__Parameter': {
              selected.kind = selected.kind ?? 'HttpOperation__Parameter';
              selected.edithandle = { id: el.dataset.edithandle, selected: true };
              highlight();
              return;
            }
            case 'HttpOperation__Responses': {
              selected.kind = selected.kind ?? 'HttpOperation__Responses';
              selected.edithandle = { id: el.dataset.edithandle, selected: true };
              highlight();
              return;
            }
            case 'HttpOperation__Response': {
              selected.kind = selected.kind ?? 'HttpOperation__Response';
              selected.edithandle = { id: el.dataset.edithandle, selected: true };
              highlight();
              return;
            }
            case 'HttpOperation__ResponseExample': {
              selected.kind = selected.kind ?? 'HttpOperation__ResponseExample';
              console.log('HttpOperation__ResponseExample');
              selected.edithandle = { id: el.dataset.edithandle, selected: true };
              highlight();
              return;
            }
            case 'HttpOperation__ResponseExample_Tab': {
              selected.kind = selected.kind ?? 'HttpOperation__ResponseExample_Tab';
              console.log('HttpOperation__ResponseExample_Tab');
              selected.edithandle = { id: el.dataset.edithandle, selected: true };
              highlight();
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
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': darkMode() })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <ParsedDocs nodeType="http_operation" nodeData={shipengineHttpOperation} />
        </Provider>
      </div>
    );
    return el;
  })
  .add('Editing Stoplight AST', () => {
    const channel = addons.getChannel();
    const dark = darkMode();

    const addKnobs = (o: IAny) => {
      switch (o.type) {
        case 'propertyName': {
          o.value = text('name', o.value);
          return;
        }
        case 'propertyDescription': {
          o.value = text('description', o.value);
          return;
        }
        case 'propertyPath': {
          o.value = text('path', o.value);
          return;
        }
        case 'propertyMethod': {
          o.value = select('method', ['get', 'put', 'post', 'delete', 'etc'], o.value);
          return;
        }
        case 'cookieParams':
        case 'headerParams':
        case 'pathParams':
        case 'queryParams': {
          button('Add Parameter', () => {
            selected2 = String(Math.floor(Math.random() * 1000000));
            const node = {
              parent: o,
              id: selected2,
              type: o.type.slice(0, o.type.slice.length - 2) as
                | 'cookieParam'
                | 'headerParam'
                | 'pathParam'
                | 'queryParam',
              children: [],
            };
            node.children.push(
              {
                parent: node,
                id: String(Math.floor(Math.random() * 1000000)),
                type: 'propertyName',
                value: 'untitled',
              },
              {
                parent: node,
                id: String(Math.floor(Math.random() * 1000000)),
                type: 'propertyDescription',
                value: '',
              },
              {
                parent: node,
                id: String(Math.floor(Math.random() * 1000000)),
                type: 'propertyStyle',
                value: 'HttpParamStyles.Simple',
              },
              {
                parent: node,
                id: String(Math.floor(Math.random() * 1000000)),
                type: 'propertyRequired',
                value: false,
              },
            );
            // @ts-ignore
            IdMap.set(node.id, node);
            for (const child of node.children) {
              IdMap.set(child.id, child);
            }
            // @ts-ignore
            o.children.push(node);
          });
          return;
        }
        case 'propertyStyleCookieParam': {
          o.value = select('style', ['form'], o.value);
          return;
        }
        case 'propertyStyleHeaderParam': {
          o.value = select('style', ['simple'], o.value);
          return;
        }
        case 'propertyStylePathParam': {
          o.value = select('style', ['simple', 'matrix', 'label'], o.value);
          return;
        }
        case 'propertyStyleQueryParam': {
          o.value = select('style', ['form', 'spaceDelimited', 'pipeDelimited', 'deepObject'], o.value);
          return;
        }
        case 'propertyRequired': {
          o.value = boolean('required', o.value);
          return;
        }
        case 'propertyDeprecated': {
          o.value = boolean('deprecated', o.value);
          return;
        }
        case 'cookieParam':
        case 'headerParam':
        case 'pathParam':
        case 'queryParam': {
          for (const child of o.children) {
            addKnobs(child);
          }

          button('Delete', () => {
            selected2 = void 0;
            const i = o.parent.children.indexOf(o);
            o.parent.children.splice(i, 1);
            // Force re-render in order to get Knobs.
            channel.emit(RESET);
          });
          return;
        }
        case 'request': {
          button('Add Body', () => {
            selected2 = String(Math.floor(Math.random() * 1000000));
            const node = {
              parent: o,
              id: selected2,
              type: 'requestBody' as const,
              children: [],
            };
            node.children.push(
              {
                parent: node,
                id: String(Math.floor(Math.random() * 1000000)),
                type: 'propertyRequired',
                value: false,
              },
              {
                parent: node,
                id: String(Math.floor(Math.random() * 1000000)),
                type: 'propertyDescription',
                value: '',
              },
              {
                parent: node,
                id: String(Math.floor(Math.random() * 1000000)),
                type: 'schema',
                value: {},
                children: [],
              },
            );
            IdMap.set(node.id, node);
            for (const child of node.children) {
              IdMap.set(child.id, child);
            }
            o.children.push(node);
          });
          return;
        }
      }
    };

    if (selected2) {
      const o = IdMap.get(selected2);
      addKnobs(o);
    }

    const spy: React.MouseEventHandler = e => {
      let el = e.target as HTMLElement | null;

      if (selections2.size && !(e.metaKey || e.ctrlKey)) {
        for (const id of selections) {
          const o = IdMap.get(id);
          if (o) delete o[EditHandle].selected;
        }
        selections2.clear();
      }

      selected2 = void 0;
      while (el) {
        console.log(el);
        if (el.dataset.id) {
          selected2 = el.dataset.id;
          selections2.add(el.dataset.id);
          // Force re-render in order to get Knobs.
          channel.emit(RESET);
          return;
        }
        el = el.parentElement;
      }
    };
    const el = (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': dark })} onClick={spy}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <SelectionContext.Provider value={selections2}>
            <HttpOperation data={shipengineHttpOperation2} />
          </SelectionContext.Provider>
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

console.log(IdMap);
