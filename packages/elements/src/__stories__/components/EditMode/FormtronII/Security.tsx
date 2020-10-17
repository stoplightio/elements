import { HTMLSelect, InputGroup } from '@stoplight/ui-kit';
import * as React from 'react';

import { IFormProps } from './types';
import { YQuill } from './YQuill';

export const FormSecurity = ({ nodePath, propName, o, awareness, IdMapYjs, setSelected }: IFormProps) => {
  return (
    <>
      <h1 className="border-b text-center mb-6 border-gray-2 dark:border-gray-6">Security</h1>
      <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label">Key</label>
        <InputGroup
          name="key"
          className="flex-1"
          placeholder="Key"
          autoComplete="off"
          autoFocus={propName === 'key'}
          value={o.get('key')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            o.set('key', e.currentTarget.value);
          }}
          data-controller-for={`${o.get('id')}-key`}
        />
      </div>
      <div className="bp3-form-group bp3-inline flex pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label flex-1">Type</label>
        <HTMLSelect
          name="type"
          defaultValue={'get'}
          value={o.get('type')}
          autoFocus={propName === 'type'}
          options={['apiKey', 'http', 'oauth2', 'openIdConnect']}
          onChange={async e => {
            o.set('type', e.currentTarget.value);
          }}
          data-controller-for={`${o.get('id')}-type`}
        />
      </div>
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
        <label className="bp3-label pl-3">in</label>
        <HTMLSelect
          name="in"
          defaultValue={'get'}
          value={o.get('in')}
          autoFocus={propName === 'in'}
          options={['header', 'query', 'cookie']}
          onChange={async e => {
            o.set('in', e.currentTarget.value);
          }}
          data-controller-for={`${o.get('id')}-in`}
        />
      </div>
      <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label">Description</label>
        <div className="w-full" data-controller-for={`${o.get('id')}-description`}>
          <YQuill type={o.get('description')} awareness={awareness} />
        </div>
      </div>
    </>
  );
};
