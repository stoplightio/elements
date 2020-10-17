import { Button, InputGroup } from '@stoplight/ui-kit';
import * as React from 'react';
import type * as Y from 'yjs';

import { IFormProps } from './types';
import { YQuill } from './YQuill';

export const FormResponse = ({ nodePath, propName, o, awareness, IdMapYjs, setSelected }: IFormProps) => {
  return (
    <>
      <h1 className="border-b text-center mb-6 border-gray-2 dark:border-gray-6">Response</h1>
      <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label flex-1">Status Code</label>
        <InputGroup
          name="name"
          placeholder="2xx"
          autoComplete="off"
          value={o.get('code')}
          autoFocus={propName === 'code'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            o.set('code', e.currentTarget.value);
          }}
          data-controller-for={`${o.get('id')}-code`}
        />
      </div>
      <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label">Description</label>
        <div className="w-full" data-controller-for={`${o.get('id')}-description`}>
          <YQuill type={o.get('description')} awareness={awareness} />
        </div>
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
          Delete Response
        </Button>
      </div>
    </>
  );
};
