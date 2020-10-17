import './EditMode.scss';

import { IHttpOperation } from '@stoplight/types';
import { Button } from '@stoplight/ui-kit';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import { throttle } from 'lodash';
import * as React from 'react';

import { HttpOperation } from '../../../components/Docs/HttpOperation';
import { EditModeContext } from '../../../containers/EditingProvider';
import { Provider } from '../../../containers/Provider';
import { WithIds } from '../../../types';
import { FormtronII } from './FormtronII';
import { useAwareness } from './hooks/useAwareness';
import { useObserveDeep } from './hooks/useObserveDeep';
import { useYDoc } from './hooks/useYDoc';
import { getIdMap, resetOperation, ydoc } from './shipengineYjs';
import { DeYjsify, resolvePath } from './Y';

export const darkMode = () => boolean('Dark Mode', Boolean(Number(localStorage.darkMode)));

storiesOf('Internal/Edit Mode', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('MVP', () => {
    const dark = darkMode();
    localStorage.darkMode = Number(dark);

    const [selections, setSelections] = React.useState(new Set<string>());
    const [selected, setSelected] = React.useState<string>(window.localStorage.selected);

    const [foreignStateString, setForeignState] = React.useState('{}');
    const foreignState = JSON.parse(foreignStateString);
    const foreignSelected = new Set<string>();
    const foreignSelections = {};
    for (const id in foreignState) {
      if (foreignState[id].selected) {
        foreignSelected.add(foreignState[id].selected);
      }
      if (foreignState[id].selections) {
        for (const sel of foreignState[id].selections) {
          if (!foreignSelections[sel]) {
            foreignSelections[sel] = [];
          }
          foreignSelections[sel].push(id);
        }
      }
    }

    useYDoc(ydoc);
    const httpOperationYjs = ydoc.doc.getMap('root').get('operation-');
    useObserveDeep(ydoc.doc.getMap('root'));

    const IdMapYjs = getIdMap();
    // @ts-ignore
    window.IdMapYjs = IdMapYjs;

    useAwareness(ydoc.wsProvider.awareness, states => {
      const newState = {};
      for (const [client, state] of states) {
        if (client !== ydoc.doc.clientID) {
          const { selected, selections } = state;
          newState[client] = { selected, selections };
        }
      }
      setForeignState(JSON.stringify(newState));
    });

    if (!httpOperationYjs) return null;

    const context = {
      getStyle: (id: string) => {
        const names = foreignSelections[id] || [];
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
        let other = (foreignSelections[id] || []).length > 0;
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

    const transformed = DeYjsify<WithIds<IHttpOperation>>(httpOperationYjs);
    console.log('transformed', transformed);

    const [nodeId, propName] = (selected || '').split('-');

    const o = IdMapYjs.get(nodeId);

    const nodePath = o && resolvePath(o, ydoc.doc.getMap('operation-'));

    const el = (
      <div className={cn('p-10 flex overflow-y-auto ', { 'bp3-dark bg-gray-8': dark })}>
        <Provider host="http://stoplight-local.com:8080" workspace="chris" project="studio-demo">
          <EditModeContext.Provider value={context}>
            <div style={{ marginRight: 400 }}>
              <HttpOperation data={transformed} />
            </div>
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
              <FormtronII
                nodePath={nodePath}
                propName={propName}
                IdMapYjs={IdMapYjs}
                o={o}
                selected={selected}
                selections={selections}
                setSelected={setSelected}
                setSelections={setSelections}
                awareness={ydoc.wsProvider.awareness}
              />
              <div className="bp3-form-group">
                <Button className="w-full" type="submit" intent="danger" large onClick={() => resetOperation()}>
                  Reset Everything
                </Button>
              </div>
            </aside>
          </EditModeContext.Provider>
        </Provider>
      </div>
    );
    return el;
  });
