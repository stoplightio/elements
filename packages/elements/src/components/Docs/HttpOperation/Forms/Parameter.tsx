import { Button, Checkbox, HTMLSelect, InputGroup } from '@stoplight/ui-kit';
import * as React from 'react';
import type * as Y from 'yjs';

import { IFormProps } from './types';
import { YQuill } from './YQuill';

export const FormParameter = ({ nodePath, propName, o, awareness, IdMapYjs, setSelected }: IFormProps) => {
  const choices =
    nodePath === 'request.cookie[]'
      ? ['form']
      : nodePath === 'request.headers[]'
      ? ['simple']
      : nodePath === 'request.path[]'
      ? ['simple', 'matrix', 'label']
      : nodePath === 'request.query[]'
      ? ['form', 'spaceDelimited', 'pipeDelimited', 'deepObject']
      : [];
  const paramType =
    nodePath === 'request.cookie[]'
      ? 'Cookie'
      : nodePath === 'request.headers[]'
      ? 'Header'
      : nodePath === 'request.path[]'
      ? 'Path'
      : nodePath === 'request.query[]'
      ? 'Query'
      : '';
  return (
    <>
      <h1 className="border-b text-center mb-6 border-gray-2 dark:border-gray-6">{paramType} Parameter</h1>
      <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label">Name</label>
        <InputGroup
          name="name"
          className="flex-1"
          placeholder="Name"
          autoComplete="off"
          autoFocus={propName === 'name'}
          value={o.get('name')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            o.set('name', e.currentTarget.value);
          }}
          data-controller-for={`${o.get('id')}-name`}
        />
      </div>
      <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label">Description</label>
        <div className="w-full" data-controller-for={`${o.get('id')}-description`}>
          <YQuill type={o.get('description')} awareness={awareness} />
        </div>
      </div>
      <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label flex-1">Required</label>
        <Checkbox
          name="required"
          defaultValue={'get'}
          checked={o.get('required')}
          label="Required"
          autoFocus={propName === 'required'}
          onChange={async e => {
            o.set('required', e.currentTarget.checked);
          }}
          data-controller-for={`${o.get('id')}-required`}
        />
      </div>
      <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label flex-1">Deprecated</label>
        <Checkbox
          name="deprecated"
          defaultValue={'get'}
          checked={o.get('deprecated')}
          label="Deprecated"
          autoFocus={propName === 'deprecated'}
          onChange={async e => {
            o.set('deprecated', e.currentTarget.checked);
          }}
          data-controller-for={`${o.get('id')}-deprecated`}
        />
      </div>
      <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label flex-1">Style</label>
        <HTMLSelect
          name="style"
          defaultValue={'get'}
          value={o.get('style')}
          autoFocus={propName === 'style'}
          options={choices}
          onChange={async e => {
            o.set('style', e.currentTarget.value);
          }}
          data-controller-for={`${o.get('id')}-style`}
        />
      </div>
      <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
        <Button
          className="w-full"
          type="submit"
          intent="danger"
          large
          onClick={() => {
            setSelected(void 0);
            const id = o.get('id');
            const Yarr = o._item?.parent as Y.Array<any>;
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
      </div>
    </>
  );
};
