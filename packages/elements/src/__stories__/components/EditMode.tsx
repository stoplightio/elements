import { Button, Checkbox, CodeEditor, FormGroup, HTMLSelect, InputGroup } from '@stoplight/ui-kit';
import { boolean, object, select, withKnobs } from '@storybook/addon-knobs';
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

type IFormite = {
  selected?: string;
  setSelected: (id: string) => void;
};

const Formite = ({ selected, setSelected }: IFormite) => {
  const knobs = [];

  useYDoc(ydoc);
  const httpOperationYjs = ydoc.doc.getMap('root').get('operation');
  useObserveDeep(httpOperationYjs);

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
          <FormGroup label="name">
            <InputGroup
              name="name"
              className="w-full pb-4"
              placeholder="Name"
              autoComplete="off"
              autoFocus
              large
              value={o.get('value')}
              onChange={e => {
                oset('value', e.currentTarget.value);
              }}
            />
          </FormGroup>,
        );
        return;
      }
      case 'description': {
        knobs.push(
          <FormGroup label="Description">
            <div className="w-full pb-4">
              <CodeEditor
                value={o.get('value')}
                onChange={value => {
                  console.log(value);
                  oset('value', value);
                }}
                placeholder={``}
                language="markdown"
                className="border-solid border-2"
                style={{ minHeight: 140 }}
              />
            </div>
          </FormGroup>,
        );
        return;
      }
      case 'path': {
        knobs.push(
          <FormGroup label="Path">
            <InputGroup
              name="path"
              className="w-full pb-4"
              placeholder="Path"
              autoComplete="off"
              autoFocus
              large
              value={o.get('value')}
              onChange={e => {
                console.log(e.currentTarget.value);
                oset('value', e.currentTarget.value);
              }}
            />
          </FormGroup>,
        );
        return;
      }
      case 'httpMethod': {
        const items = ['get', 'put', 'post', 'delete', 'etc'];
        knobs.push(
          <FormGroup label="Method">
            <HTMLSelect
              name="method"
              defaultValue={'get'}
              value={o.get('value')}
              options={items}
              onChange={async e => {
                oset('value', e.currentTarget.value);
              }}
            />
          </FormGroup>,
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
          <FormGroup label="Style">
            <HTMLSelect
              name="style"
              defaultValue={'get'}
              value={o.get('value')}
              options={choices[subtype]}
              onChange={async e => {
                oset('value', e.currentTarget.value);
              }}
            />
          </FormGroup>,
        );
        return;
      }
      case 'required': {
        knobs.push(
          <FormGroup label="Required">
            <Checkbox
              name="required"
              defaultValue={'get'}
              checked={o.get('value')}
              label="Required"
              onChange={async e => {
                oset('value', e.currentTarget.checked);
              }}
            />
          </FormGroup>,
        );
        return;
      }
      case 'deprecated': {
        knobs.push(
          <FormGroup label="Deprecated">
            <Checkbox
              name="deprecated"
              defaultValue={'get'}
              checked={o.get('value')}
              label="Deprecated"
              onChange={async e => {
                oset('value', e.currentTarget.checked);
              }}
            />
          </FormGroup>,
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
          <FormGroup label={`Add ${subtype} Parameter`}>
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
          </FormGroup>,
        );
        return;
      }
      case 'param': {
        for (const child of o.get('children')) {
          addKnobs(child);
        }

        knobs.push(
          <FormGroup label="Delete Parameter">
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
          </FormGroup>,
        );
        return;
      }
      case 'request': {
        for (const child of o.get('children')) {
          addKnobs(child);
        }

        knobs.push(
          <FormGroup label="Add Body">
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
          </FormGroup>,
        );
        return;
      }
      case 'operation': {
        for (const child of o.get('children')) {
          addKnobs(child);
        }

        knobs.push(
          <FormGroup label="Add Response">
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
          </FormGroup>,
          <FormGroup label="Reset">
            <Button className="w-full" type="submit" intent="primary" large onClick={() => resetOperation()}>
              Reset Operation
            </Button>
          </FormGroup>,
        );
        return;
      }
      case 'response': {
        for (const child of o.get('children')) {
          addKnobs(child);
        }
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
        background: 'white',
        borderLeft: '1px solid rgba(0,0,0,.1)',
        boxShadow: '-5px 0 5px rgba(0,0,0,.1)',
        padding: '1.5em',
      }}
    >
      Welcome back Formtron.
      {knobs}
    </aside>
  );
};

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
            <Formite selected={selected} setSelected={setSelected} />
          </SelectionContext.Provider>
        </Provider>
      </div>
    );
    return el;
  });
