import { IHttpOperationResponse } from '@stoplight/types';
import { Button, HTMLSelect, InputGroup } from '@stoplight/ui-kit';
import * as React from 'react';

import { WithIds } from '../../../../types';
import { Yjsify } from '../Y';
import { IFormProps } from './types';
import { YQuill } from './YQuill';

export const FormOperation = ({
  nodePath,
  propName,
  o,
  awareness,
  IdMapYjs,
  selected,
  selections,
  setSelected,
  setSelections,
}: IFormProps) => {
  const items = ['get', 'put', 'post', 'delete', 'etc'];
  return (
    <>
      <h1 className="border-b text-center mb-6 border-gray-2 dark:border-gray-6">Operation</h1>
      <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label flex-1">Method</label>
        <HTMLSelect
          name="method"
          defaultValue={'get'}
          value={o.get('method')}
          options={items}
          autoFocus={propName === 'method'}
          onChange={async e => {
            o.set('method', e.currentTarget.value);
          }}
          data-controller-for={`${o.get('id')}-method`}
        />
      </div>
      <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label">Path</label>
        <InputGroup
          name="path"
          className="w-full"
          placeholder="Path"
          autoComplete="off"
          autoFocus={propName === 'path'}
          value={o.get('path')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.currentTarget.value);
            o.set('path', e.currentTarget.value);
          }}
          data-controller-for={`${o.get('id')}-path`}
        />
      </div>
      <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label">Description</label>
        <div className="w-full" data-controller-for={`${o.get('id')}-description`}>
          <YQuill type={o.get('description')} awareness={awareness} />
        </div>
      </div>
      <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
        <Button
          className="w-full"
          type="submit"
          intent="primary"
          large
          onClick={() => {
            const node = Yjsify<WithIds<IHttpOperationResponse>>({
              id: String(Math.floor(Math.random() * 10000)),
              code: '100',
              description: '',
            });
            // @ts-ignore
            o.get('responses').push([node]);

            const id = node.get('id')!;
            // @ts-ignore
            IdMapYjs.set(id, node);
            selections.clear();
            selections.add(id);
            setSelected(`${id}-code`);
            setSelections(selections);
          }}
          data-controller-for={`${o.get('id')}-responses`}
        >
          Add Response
        </Button>
      </div>
    </>
  );
};
