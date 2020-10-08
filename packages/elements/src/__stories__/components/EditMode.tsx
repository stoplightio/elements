import { Button, Checkbox, CodeEditor, FormGroup, HTMLSelect, InputGroup } from '@stoplight/ui-kit';
import { boolean, object, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { getIdMap, resetOperation, ydoc } from '../../__fixtures__/operations/shipengineYjs';
import { IAny, IOperation } from '../../AST';
import { leafNodeTypes } from '../../AST/leafs';
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

type IFormite = {
  selected?: string;
  setSelected: (id: string) => void;
};

const Formite = ({ selected, setSelected, focus }: IFormite) => {
  const knobs = [];

  const IdMapYjs = getIdMap();

  const addKnobs = (o: Yify<IAny>) => {
    if (!o) return;
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
        knobs.push(
          <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
            <label className="bp3-label">Name</label>
            <InputGroup
              name="name"
              className="flex-1"
              placeholder="Name"
              autoComplete="off"
              autoFocus={getId(o) === focus}
              value={o.get('value')}
              onChange={e => {
                oset('value', e.currentTarget.value);
              }}
              data-controller-for={getId(o)}
            />
          </div>,
        );
        return;
      }
      case 'description': {
        knobs.push(
          <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
            <label className="bp3-label">Description</label>
            <div className="w-full">
              <CodeEditor
                value={o.get('value')}
                onChange={value => {
                  console.log(value);
                  oset('value', value);
                }}
                placeholder={``}
                autoFocus={getId(o) === focus}
                language="markdown"
                className="border border-gray-2 dark:border-gray-6"
                style={{ minHeight: 140 }}
                data-controller-for={getId(o)}
              />
            </div>
          </div>,
        );
        return;
      }
      case 'path': {
        knobs.push(
          <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
            <label className="bp3-label">Path</label>
            <InputGroup
              name="path"
              className="w-full"
              placeholder="Path"
              autoComplete="off"
              autoFocus={getId(o) === focus}
              value={o.get('value')}
              onChange={e => {
                console.log(e.currentTarget.value);
                oset('value', e.currentTarget.value);
              }}
              data-controller-for={getId(o)}
            />
          </div>,
        );
        return;
      }
      case 'httpMethod': {
        const items = ['get', 'put', 'post', 'delete', 'etc'];
        knobs.push(
          <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
            <label className="bp3-label flex-1">Method</label>
            <HTMLSelect
              name="method"
              defaultValue={'get'}
              value={o.get('value')}
              options={items}
              autoFocus={getId(o) === focus}
              onChange={async e => {
                oset('value', e.currentTarget.value);
              }}
              data-controller-for={getId(o)}
            />
          </div>,
        );
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
        knobs.push(
          <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
            <label className="bp3-label flex-1">Style</label>
            <HTMLSelect
              name="style"
              defaultValue={'get'}
              value={o.get('value')}
              autoFocus={getId(o) === focus}
              options={choices[subtype]}
              onChange={async e => {
                oset('value', e.currentTarget.value);
              }}
              data-controller-for={getId(o)}
            />
          </div>,
        );
        return;
      }
      case 'httpStatus': {
        knobs.push(
          <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
            <label className="bp3-label flex-1">Status Code</label>
            <InputGroup
              name="name"
              placeholder="2xx"
              autoComplete="off"
              autoFocus={getId(o) === focus}
              value={o.get('value')}
              onChange={e => {
                oset('value', e.currentTarget.value);
              }}
              data-controller-for={getId(o)}
            />
          </div>,
        );
        return;
      }
      case 'required': {
        knobs.push(
          <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
            <label className="bp3-label flex-1">Required</label>
            <Checkbox
              name="required"
              defaultValue={'get'}
              checked={o.get('value')}
              label="Required"
              autoFocus={getId(o) === focus}
              onChange={async e => {
                oset('value', e.currentTarget.checked);
              }}
              data-controller-for={getId(o)}
            />
          </div>,
        );
        return;
      }
      case 'deprecated': {
        knobs.push(
          <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
            <label className="bp3-label flex-1">Deprecated</label>
            <Checkbox
              name="deprecated"
              defaultValue={'get'}
              checked={o.get('value')}
              label="Deprecated"
              autoFocus={getId(o) === focus}
              onChange={async e => {
                oset('value', e.currentTarget.checked);
              }}
              data-controller-for={getId(o)}
            />
          </div>,
        );
        return;
      }
      case 'cookieParams':
      case 'headerParams':
      case 'pathParams':
      case 'queryParams': {
        const subtype = {
          cookieParams: 'Cookie',
          headerParams: 'Header',
          pathParams: 'Path',
          queryParams: 'Query',
        }[o.get('type')];
        knobs.push(
          <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
            <Button
              className="w-full"
              type="submit"
              intent="primary"
              large
              onClick={() => {
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
              }}
            >
              Add {subtype} Parameter
            </Button>
          </div>,
        );
        return;
      }
      case 'param': {
        for (const child of o.get('children')) {
          addKnobs(child);
        }

        knobs.push(
          <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
            <Button
              className="w-full"
              type="submit"
              intent="primary"
              large
              onClick={() => {
                setSelected(void 0);
                const i = getParent(o)
                  .get('children')
                  .toArray()
                  .findIndex(j => getId(j) === getId(o));
                getParent(o).get('children').delete(i);
              }}
            >
              Delete Parameter
            </Button>
          </div>,
        );
        return;
      }
      case 'request': {
        for (const child of o.get('children')) {
          addKnobs(child);
        }

        knobs.push(
          <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
            <Button
              className="w-full"
              type="submit"
              intent="primary"
              large
              onClick={() => {
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
              }}
            >
              Add Body
            </Button>
          </div>,
        );
        return;
      }
      case 'response': {
        for (const child of o.get('children')) {
          addKnobs(child);
        }
        return;
      }
      case 'responses': {
        knobs.push(
          <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
            <Button
              className="w-full"
              type="submit"
              intent="primary"
              large
              onClick={() => {
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
                setSelected(id);
              }}
            >
              Add Response
            </Button>
          </div>,
        );
        return;
      }
      case 'operation': {
        for (const child of o.get('children')) {
          addKnobs(child);
        }

        knobs.push(
          <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
            <Button className="w-full" type="submit" intent="danger" large onClick={() => resetOperation()}>
              Reset Operation
            </Button>
          </div>,
        );
        return;
      }
    }
  };

  const o = IdMapYjs.get(selected);
  addKnobs(o);

  return (
    <aside
      style={{
        minHeight: '100vh',
        minWidth: 400,
        maxWidth: 400,
        marginLeft: '2em',
        boxShadow: '-5px 0 5px rgba(0,0,0,.1)',
      }}
      className="p-6 pt-2 border border-gray-2 dark:border-gray-6"
    >
      <h1 className="border-b text-center mb-6 border-gray-2 dark:border-gray-6">Formtron II</h1>
      {knobs}
    </aside>
  );
};

storiesOf('Internal/Stoplight AST', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Editing', () => {
    const dark = darkMode();
    localStorage.darkMode = Number(dark);

    // A quirk of Storybook is that when knob values change the entire component is unmounted and remounted apparently,
    // causing local component state to be lost.
    const [selected, _setSelected] = React.useState<string>(window.localStorage.selected);
    const setSelected = (value?: string) => {
      window.localStorage.selected = value;
      _setSelected(value);
    };

    const [focus, setFocus] = React.useState<string>(selected);

    useYDoc(ydoc);
    const httpOperationYjs = ydoc.doc.getMap('root').get('operation');
    useObserveDeep(ydoc.doc.getMap('root'));

    const IdMapYjs = getIdMap();

    const spy: React.MouseEventHandler = e => {
      let el = e.target as HTMLElement | null;

      if (selections.size && !(e.metaKey || e.ctrlKey)) {
        selections.clear();
      }

      setSelected(void 0);
      while (el) {
        console.log(el);
        if (el.dataset.id) {
          let node = IdMapYjs.get(el.dataset.id);
          let focus = node;
          if (leafNodeTypes.includes(node.get('type'))) {
            node = getParent(node);
          }
          selections.add(getId(node));
          setSelected(getId(node));
          setFocus(getId(focus));
          // Best effort to set focus.
          setTimeout(() => {
            const el = document.querySelector(`[data-controller-for="${getId(focus)}"]`);
            if (el === null) return;

            (el as HTMLElement).focus();
            if (document.activeElement === el) return;

            const input = el.querySelector('textarea,input');
            if (!input) return;

            (input as HTMLElement).focus();
          }, 0);
          return;
        }
        el = el.parentElement;
      }
    };

    if (!httpOperationYjs) return null;

    const transformed = DeYjsify<IOperation>(httpOperationYjs);
    const el = (
      <div className={cn('p-10 flex', { 'bp3-dark bg-gray-8': dark })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <SelectionContext.Provider value={selections}>
            <div onClick={spy}>
              <HttpOperation data={transformed} />
            </div>
            <Formite selected={selected} setSelected={setSelected} focus={focus} />
          </SelectionContext.Provider>
        </Provider>
      </div>
    );
    return el;
  });
