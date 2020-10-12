import './EditMode.scss';

import { Button, Checkbox, HTMLSelect, InputGroup } from '@stoplight/ui-kit';
import { boolean, object, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import { throttle } from 'lodash';
import * as React from 'react';

import { getIdMap, resetOperation, ydoc } from '../../__fixtures__/operations/shipengineYjs';
import { IAny, IOperation } from '../../AST';
import { leafNodeTypes } from '../../AST/leafs';
import { HttpOperation } from '../../components/Docs/HttpOperation2';
import { EnhancerContext } from '../../components/Docs/HttpOperation2/EnhancerContext';
import { Provider } from '../../containers/Provider';
import { useObserveDeep } from '../../hooks/y/useObserveDeep';
import { useYDoc } from '../../hooks/y/useYDoc';
import { DeYjsify, getId, getParent, Yify, Yjsify } from '../../YAST';
import { YQuill } from './YQuill';

const article = require('../../__fixtures__/articles/kitchen-sink.md').default;

export const darkMode = () => boolean('Dark Mode', Boolean(Number(localStorage.darkMode)));
export const nodeType = () => select('nodeType', ['article', 'http_service', 'http_operation', 'model'], 'article');
export const nodeData = () => object('nodeData', article);

type IFormite = {
  selected?: string;
  setSelected: (id: string) => void;
  selections: Set<string>;
  setSelections: (selections: Set<string>) => void;
  focus?: string;
};

const Formite = ({ selected, setSelected, selections, setSelections, focus }: IFormite) => {
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
            <div className="w-full" data-controller-for={getId(o)}>
              <YQuill type={o.get('value')} awareness={ydoc.wsProvider.awareness} />
              {/* <CodeEditor
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
                
              /> */}
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
                setSelections(selections);
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
      case 'requestBody': {
        for (const child of o.get('children')) {
          addKnobs(child);
        }
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
                setSelections(selections);
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
        height: '100vh',
        width: 400,
        boxShadow: '-5px 0 5px rgba(0,0,0,.1)',
        right: 0,
        top: 0,
      }}
      className="p-6 pt-2 border fixed border-gray-2 dark:border-gray-6 overflow-y-auto"
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

    const [, forceRender] = React.useReducer(s => s + 1, 0);

    const [selections, setSelections] = React.useState(new Set<string>());
    const [foreignSelections, setForeignSelections] = React.useState(new Set<string>());
    const [selected, setSelected] = React.useState<string>(window.localStorage.selected);

    const [focus, setFocus] = React.useState<string>(selected);

    useYDoc(ydoc);
    const httpOperationYjs = ydoc.doc.getMap('root').get('operation');
    useObserveDeep(ydoc.doc.getMap('root'));

    const IdMapYjs = getIdMap();
    // @ts-ignore
    window.IdMapYjs = IdMapYjs;

    const onChange = () => {
      const states = ydoc.wsProvider.awareness.getStates();
      foreignSelections.clear();
      console.log('states', states);
      for (const [client, state] of states) {
        if (client !== ydoc.doc.clientID) {
          console.log('selected', state.selected);
          foreignSelections.add(state.selected);
          setForeignSelections(foreignSelections);
          // force re-render
          forceRender();
        }
      }
    };
    React.useEffect(() => {
      ydoc.wsProvider.awareness.on('change', onChange);
      return () => ydoc.wsProvider.awareness.off('change', onChange);
    });

    if (!httpOperationYjs) return null;

    const enhancer = {
      getClasses: (id: string) => {
        const self = selections.has(id);
        const other = foreignSelections.has(id);
        return {
          selected: self || other,
          'selected-self': self,
          'selected-other': other,
        };
      },
      // Throttling is used instead of e.stopPropagation() to make sure we only react to the first (deepest) DOM node that's clicked,
      // because we don't want to interfere with Element's inner workings which also rely on mouse clicks.
      onClick: throttle(
        (e: React.MouseEvent, id: string) => {
          console.log('clicked', id);

          if (selections.size && !(e.metaKey || e.ctrlKey)) {
            selections.clear();
          }

          setSelected(void 0);
          let node = IdMapYjs.get(id);
          let focus = node;
          if (leafNodeTypes.includes(node.get('type'))) {
            node = getParent(node);
          }
          selections.add(getId(node));
          setSelected(getId(node));
          setFocus(getId(focus));
          ydoc.wsProvider.awareness.setLocalStateField('selected', getId(node));
          ydoc.wsProvider.awareness.setLocalStateField('focus', getId(focus));

          // Best effort to set focus.
          setTimeout(() => {
            const el = document.querySelector(`[data-controller-for="${getId(focus)}"]`);
            if (el === null) {
              console.log('No data-controller-for found');
              return;
            }

            (el as HTMLElement).focus();
            if (document.activeElement === el) {
              console.log('focussed directly');
              return;
            }

            const input = el.querySelector('textarea,input,[contenteditable]');
            if (!input) {
              console.log('Unable to find a child input');
              return;
            }

            (input as HTMLElement).focus();
            if (document.activeElement === el) {
              console.log('focussed child input');
            }
            // 0 works for everything except Quill. So for Quill's sake I'm bumping the delay.
          }, 100);
          return;
        },
        100,
        { leading: true, trailing: false },
      ),
    };

    const transformed = DeYjsify<IOperation>(httpOperationYjs);
    const el = (
      <div className={cn('p-10 flex overflow-y-auto ', { 'bp3-dark bg-gray-8': dark })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <EnhancerContext.Provider value={enhancer}>
            <div style={{ marginRight: 400 }}>
              <HttpOperation data={transformed} />
            </div>
            <Formite
              selected={selected}
              setSelected={setSelected}
              selections={selections}
              setSelections={setSelections}
              focus={focus}
            />
          </EnhancerContext.Provider>
        </Provider>
      </div>
    );
    return el;
  });
