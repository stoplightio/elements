import './EditMode.scss';

import { HttpParamStyles, IHttpOperation } from '@stoplight/types';
import { Button, Checkbox, HTMLSelect, InputGroup } from '@stoplight/ui-kit';
import { boolean, object, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import { throttle } from 'lodash';
import * as React from 'react';

import { getIdMap, resetOperation, ydoc } from '../../__fixtures__/operations/shipengineYjsClassic';
import { HttpOperation } from '../../components/Docs/HttpOperation';
import { EditModeContext } from '../../containers/EditingProvider';
import { Provider } from '../../containers/Provider';
import { useObserveDeep } from '../../hooks/y/useObserveDeep';
import { useYDoc } from '../../hooks/y/useYDoc';
import { TypedYArray, TypedYMap } from '../../YAST';
import { DeYjsifyClassic } from '../../YAST/DeYjsifyClassic';
import { resolvePathClassic } from '../../YAST/resolvePathClassic';
import { WithIds, YjsifyClassic } from '../../YAST/YjsifyClassic';
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
};

const Formite = ({ selected = '', setSelected, selections, setSelections }: IFormite) => {
  const [nodeId, propName] = selected.split('-');

  const knobs = [];

  const IdMapYjs = getIdMap();

  const o = IdMapYjs.get(nodeId);

  if (o) {
    const nodePath = resolvePathClassic(o, ydoc.doc.getMap('operation-classic'));

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

    if (
      nodePath === 'request.cookie[]' ||
      nodePath === 'request.headers[]' ||
      nodePath === 'request.path[]' ||
      nodePath === 'request.query[]'
    ) {
      const choices = nodePath.endsWith('request.cookie[]')
        ? ['form']
        : nodePath.endsWith('request.headers[]')
        ? ['simple']
        : nodePath.endsWith('request.path[]')
        ? ['simple', 'matrix', 'label']
        : nodePath.endsWith('request.query[]')
        ? ['form', 'spaceDelimited', 'pipeDelimited', 'deepObject']
        : [];
      knobs.push(
        <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
          <label className="bp3-label">Name</label>
          <InputGroup
            name="name"
            className="flex-1"
            placeholder="Name"
            autoComplete="off"
            autoFocus={propName === 'name'}
            value={o.get('name')}
            onChange={e => {
              oset('name', e.currentTarget.value);
            }}
            data-controller-for={`${o.get('id')}-name`}
          />
        </div>,
        <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
          <label className="bp3-label">Description</label>
          <div className="w-full" data-controller-for={`${o.get('id')}-description`}>
            <YQuill type={o.get('description')} awareness={ydoc.wsProvider.awareness} />
          </div>
        </div>,
        <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
          <label className="bp3-label flex-1">Required</label>
          <Checkbox
            name="required"
            defaultValue={'get'}
            checked={o.get('required')}
            label="Required"
            autoFocus={propName === 'required'}
            onChange={async e => {
              oset('required', e.currentTarget.checked);
            }}
            data-controller-for={`${o.get('id')}-required`}
          />
        </div>,
        <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
          <label className="bp3-label flex-1">Deprecated</label>
          <Checkbox
            name="deprecated"
            defaultValue={'get'}
            checked={o.get('deprecated')}
            label="Deprecated"
            autoFocus={propName === 'deprecated'}
            onChange={async e => {
              oset('deprecated', e.currentTarget.checked);
            }}
            data-controller-for={`${o.get('id')}-deprecated`}
          />
        </div>,
        <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
          <label className="bp3-label flex-1">Style</label>
          <HTMLSelect
            name="style"
            defaultValue={'get'}
            value={o.get('style')}
            autoFocus={propName === 'style'}
            options={choices}
            onChange={async e => {
              oset('style', e.currentTarget.value);
            }}
            data-controller-for={`${o.get('id')}-style`}
          />
        </div>,
        <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
          <Button
            className="w-full"
            type="submit"
            intent="primary"
            large
            onClick={() => {
              setSelected(void 0);
              const id = o.get('id');
              const Yarr = o._item.parent as TypedYArray<any>;
              let i = 0;
              for (const value of Yarr) {
                if (value.get('id') === id) {
                  break;
                }
                i++;
              }
              if (i < Yarr.length) {
                Yarr.delete(i);
                IdMapYjs.delete(id);
              }
            }}
          >
            Delete Parameter
          </Button>
        </div>,
      );
    } else if (nodePath === 'request') {
      const makeOnClick = (prop: string, style: HttpParamStyles) => () => {
        const node = YjsifyClassic({
          id: String(Math.floor(Math.random() * 10000)),
          name: 'untitled',
          description: '',
          style,
          required: false,
        });
        // @ts-ignore
        o.get(prop).push([node]);

        const id = node.get('id');
        // @ts-ignore
        IdMapYjs.set(id, node);
        selections.clear();
        selections.add(id);
        setSelected(id);
        setSelections(selections);
      };
      knobs.push(
        <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
          <Button
            className="w-full"
            type="submit"
            intent="primary"
            large
            onClick={makeOnClick('path', HttpParamStyles.Simple)}
            data-controller-for={`${o.get('id')}-path`}
          >
            Add Path Parameter
          </Button>
        </div>,
        <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
          <Button
            className="w-full"
            type="submit"
            intent="primary"
            large
            onClick={makeOnClick('query', HttpParamStyles.Form)}
            data-controller-for={`${o.get('id')}-query`}
          >
            Add Query Parameter
          </Button>
        </div>,
        <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
          <Button
            className="w-full"
            type="submit"
            intent="primary"
            large
            onClick={makeOnClick('cookie', HttpParamStyles.Form)}
            data-controller-for={`${o.get('id')}-cookie`}
          >
            Add Cookie Parameter
          </Button>
        </div>,
        <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
          <Button
            className="w-full"
            type="submit"
            intent="primary"
            large
            onClick={makeOnClick('headers', HttpParamStyles.Simple)}
            data-controller-for={`${o.get('id')}-headers`}
          >
            Add Header Parameter
          </Button>
        </div>,
      );
    } else if (nodePath === 'request.body') {
      knobs.push(
        <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
          <label className="bp3-label">Description</label>
          <div className="w-full" data-controller-for={`${o.get('id')}-description`}>
            <YQuill type={o.get('description')} awareness={ydoc.wsProvider.awareness} />
          </div>
        </div>,
      );
    } else if (nodePath === '') {
      const items = ['get', 'put', 'post', 'delete', 'etc'];
      knobs.push(
        <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
          <label className="bp3-label flex-1">Method</label>
          <HTMLSelect
            name="method"
            defaultValue={'get'}
            value={o.get('method')}
            options={items}
            autoFocus={propName === 'method'}
            onChange={async e => {
              oset('method', e.currentTarget.value);
            }}
            data-controller-for={`${o.get('id')}-method`}
          />
        </div>,
        <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
          <label className="bp3-label">Path</label>
          <InputGroup
            name="path"
            className="w-full"
            placeholder="Path"
            autoComplete="off"
            autoFocus={propName === 'path'}
            value={o.get('path')}
            onChange={e => {
              console.log(e.currentTarget.value);
              oset('path', e.currentTarget.value);
            }}
            data-controller-for={`${o.get('id')}-path`}
          />
        </div>,
        <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
          <label className="bp3-label">Description</label>
          <div className="w-full" data-controller-for={`${o.get('id')}-description`}>
            <YQuill type={o.get('description')} awareness={ydoc.wsProvider.awareness} />
          </div>
        </div>,
        <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
          <Button className="w-full" type="submit" intent="danger" large onClick={() => resetOperation()}>
            Reset Operation
          </Button>
        </div>,
      );
    }
  }

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
  .add('Classic', () => {
    const dark = darkMode();
    localStorage.darkMode = Number(dark);

    const [, forceRender] = React.useReducer(s => s + 1, 0);

    const [selections, setSelections] = React.useState(new Set<string>());
    const [selected, setSelected] = React.useState<string>(window.localStorage.selected);

    const [foreignSelections, setForeignSelections] = React.useState(new Map<string, Set<string>>());
    const [foreignSelected, setForeignSelected] = React.useState(new Map<string, string>());

    useYDoc(ydoc);
    const httpOperationYjs = ydoc.doc.getMap('root').get('operation-classic');
    useObserveDeep(ydoc.doc.getMap('root'));

    const IdMapYjs = getIdMap();
    // @ts-ignore
    window.IdMapYjs = IdMapYjs;

    const onChange = () => {
      const states = ydoc.wsProvider.awareness.getStates();
      foreignSelections.clear();
      foreignSelected.clear();
      let needsRender = false;
      for (const [client, state] of states) {
        if (client !== ydoc.doc.clientID) {
          foreignSelected.set(String(client), state.selected);
          foreignSelections.set(String(client), new Set(state.selections));
          needsRender = true;
        }
      }
      if (needsRender) {
        setForeignSelected(foreignSelected);
        setForeignSelections(foreignSelections);
        forceRender();
      }
    };
    React.useEffect(() => {
      ydoc.wsProvider.awareness.on('change', onChange);
      return () => ydoc.wsProvider.awareness.off('change', onChange);
    });

    if (!httpOperationYjs) return null;

    const enhancer = {
      getStyle: (id: string) => {
        const names = [];
        for (const [client, selections] of foreignSelections) {
          if (selections.has(id)) {
            names.push(client);
          }
        }
        if (names.length > 0) {
          return {
            '--username': `'User ${names.join(',')}'`,
          };
        } else {
          return {};
        }
      },
      getClasses: (id: string) => {
        const self = selections.has(id);
        let other = [...foreignSelections.values()].some(set => set.has(id));
        const focussed = selected === id || [...foreignSelected.values()].some(_id => _id === id);
        return {
          selected: self || other,
          'selected-self': self,
          'selected-other': other,
          'selected-focus': focussed,
          'selection-label': other,
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

          const [nodeId, propName] = id.split('-');
          selections.add(nodeId);
          setSelected(id);
          ydoc.wsProvider.awareness.setLocalStateField('selections', [...selections]);
          ydoc.wsProvider.awareness.setLocalStateField('selected', id);

          // Best effort to set focus.
          setTimeout(() => {
            const el = document.querySelector(`[data-controller-for="${id}"]`);
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

    const transformed = DeYjsifyClassic<WithIds<IHttpOperation>>(httpOperationYjs);
    console.log('transformed', transformed);
    const el = (
      <div className={cn('p-10 flex overflow-y-auto ', { 'bp3-dark bg-gray-8': dark })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <EditModeContext.Provider value={enhancer}>
            <div style={{ marginRight: 400 }}>
              <HttpOperation data={transformed} />
            </div>
            <Formite
              selected={selected}
              setSelected={setSelected}
              selections={selections}
              setSelections={setSelections}
            />
          </EditModeContext.Provider>
        </Provider>
      </div>
    );
    return el;
  });
