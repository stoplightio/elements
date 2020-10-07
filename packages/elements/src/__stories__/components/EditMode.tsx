import { boolean, button, object, RESET, select, text, withKnobs } from '@storybook/addon-knobs';
import addons from '@storybook/addons';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { getIdMap, resetOperation, ydoc } from '../../__fixtures__/operations/shipengineYjs';
import { IAny, IOperation } from '../../AST';
import { HttpOperation } from '../../components/Docs/HttpOperation2';
import { SelectionContext } from '../../components/Docs/HttpOperation2/SelectionContext';
import { Provider } from '../../containers/Provider';
import { useObserveDeep } from '../../hooks/y/useObserveDeep';
import { useYDoc } from '../../hooks/y/useYDoc';
import { DeYjsify, getId, getParent, Yify, Yjsify } from '../../YAST/YDoc';

const article = require('../../__fixtures__/articles/kitchen-sink.md').default;

export const darkMode = () => boolean('Dark Mode', Boolean(Number(localStorage.darkMode)));
export const nodeType = () => select('nodeType', ['article', 'http_service', 'http_operation', 'model'], 'article');
export const nodeData = () => object('nodeData', article);

const selections = new Set<string>();

storiesOf('Internal/Stoplight AST', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Editing', () => {
    const channel = addons.getChannel();
    const dark = darkMode();
    localStorage.darkMode = Number(dark);

    // A quirk of Storybook is that when knob values change the entire component is unmounted and remounted apparently,
    // causing local component state to be lost.
    const [selected, _setSelected] = React.useState<string>(window.localStorage.selected);
    const setSelected = (value?: string) => {
      window.localStorage.selected = value;
      _setSelected(value);
    };

    useYDoc(ydoc);
    const httpOperationYjs = ydoc.doc.getMap('root').get('operation');
    useObserveDeep(httpOperationYjs);

    const IdMapYjs = getIdMap();

    const addKnobs = (o: Yify<IAny>) => {
      // We need to prevent setting the value to its current value so as not to trigger infinite update loops.
      const oset = (prop, value) => {
        // @ts-ignore
        if (o.get(prop) !== value) {
          ydoc.doc.transact(() => {
            // @ts-ignore
            o.set(prop, value);
          }, ydoc.doc.clientID);
        }
      };
      // @ts-ignore
      switch (o.get('type')) {
        case 'name': {
          oset('value', text('name', o.get('value')));
          return;
        }
        case 'description': {
          oset('value', text('description', o.get('value')));
          return;
        }
        case 'path': {
          oset('value', text('path', o.get('value')));
          return;
        }
        case 'httpMethod': {
          oset('value', select('method', ['get', 'put', 'post', 'delete', 'etc'], o.get('value')));
          return;
        }
        case 'cookieParams':
        case 'headerParams':
        case 'pathParams':
        case 'queryParams': {
          button('Add Parameter', () => {
            const node = Yjsify({
              type: 'param',
              children: [
                {
                  type: 'name',
                  value: 'untitled',
                },
                {
                  type: 'description',
                  value: '',
                },
                {
                  type: 'style',
                  value: 'simple',
                },
                {
                  type: 'required',
                  value: false,
                },
              ],
            });
            // @ts-ignore
            o.get('children').push([node]);

            const id = getId(node);
            // @ts-ignore
            IdMapYjs.set(id, node);
            for (const child of node.get('children')) {
              // @ts-ignore
              IdMapYjs.set(getId(child), child);
            }
            selections.clear();
            selections.add(id);
            setSelected(id);
            channel.emit(RESET);
          });
          return;
        }
        case 'style': {
          const subtype = getParent(getParent(o)).get('type');
          console.log('style.parent.parent.type', subtype);
          const choices = {
            cookieParams: ['form'],
            headerParams: ['simple'],
            pathParams: ['simple', 'matrix', 'label'],
            queryParams: ['form', 'spaceDelimited', 'pipeDelimited', 'deepObject'],
          };
          oset('value', select('style', choices[subtype], o.get('value')));
          return;
        }
        case 'required': {
          oset('value', boolean('required', o.get('value')));
          return;
        }
        case 'deprecated': {
          oset('value', boolean('deprecated', o.get('value')));
          return;
        }
        case 'param': {
          for (const child of o.get('children')) {
            addKnobs(child);
          }

          button('Delete', () => {
            setSelected(void 0);
            const i = getParent(o)
              .get('children')
              .toArray()
              .findIndex(j => getId(j) === getId(o));
            getParent(o).get('children').delete(i);
            // Force re-render in order to get Knobs.
            channel.emit(RESET);
          });
          return;
        }
        case 'request': {
          for (const child of o.get('children')) {
            addKnobs(child);
          }
          button('Add Body', () => {
            const node = Yjsify({
              type: 'requestBody',
              children: [
                {
                  type: 'required',
                  value: false,
                },
                {
                  type: 'description',
                  value: '',
                },
                {
                  type: 'schema',
                  value: {},
                  children: [],
                },
              ],
            });
            // @ts-ignore
            o.get('children').push([node]);

            // @ts-ignore
            IdMapYjs.set(getId(node), node);
            for (const child of node.get('children')) {
              // @ts-ignore
              IdMapYjs.set(getId(child), child);
            }
            setSelected(getId(node));
          });
          return;
        }
        case 'operation': {
          for (const child of o.get('children')) {
            addKnobs(child);
          }
          button('Add Response', () => {
            const node = Yjsify({
              type: 'response',
              children: [
                {
                  type: 'httpStatus',
                  value: '1xx',
                },
                {
                  type: 'description',
                  value: '',
                },
              ],
            });
            // @ts-ignore
            o.get('children').push([node]);

            const id = getId(node);
            // @ts-ignore
            IdMapYjs.set(id, node);
            for (const child of node.get('children')) {
              // @ts-ignore
              IdMapYjs.set(getId(child), child);
            }
            selections.clear();
            selections.add(id);
            channel.emit(RESET);
            setSelected(id);
          });

          return;
        }
        case 'response': {
          for (const child of o.get('children')) {
            addKnobs(child);
          }
        }
      }
    };

    // To improve the experience if two people have the same thing selected
    // (regardless of whether they are editing it)
    // We need to render the knobs conditionally only when the selected item changes.
    React.useEffect(() => {
      if (selected) {
        const o = IdMapYjs.get(selected);
        if (o) {
          console.log('adding knobs');
          addKnobs(o);
        }
      } else {
        button('Reset', () => {
          resetOperation();
          setSelected(void 0);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    const spy: React.MouseEventHandler = e => {
      let el = e.target as HTMLElement | null;

      if (selections.size && !(e.metaKey || e.ctrlKey)) {
        selections.clear();
      }

      setSelected(void 0);
      while (el) {
        console.log(el);
        if (el.dataset.id) {
          selections.add(el.dataset.id);
          setSelected(el.dataset.id);
          // Clear knobs.
          channel.emit(RESET);
          return;
        }
        el = el.parentElement;
      }

      // Clear knobs.
      // channel.emit(RESET);
    };

    if (!httpOperationYjs) return null;

    // const transformed = httpOperationYjs.toJSON();
    const transformed = DeYjsify<IOperation>(httpOperationYjs);
    const el = (
      <div className={cn('p-10', { 'bp3-dark bg-gray-8': dark })} onClick={spy}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <SelectionContext.Provider value={selections}>
            <HttpOperation data={transformed} />
          </SelectionContext.Provider>
        </Provider>
      </div>
    );
    return el;
  });
