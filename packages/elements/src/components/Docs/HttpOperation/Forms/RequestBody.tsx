import * as React from 'react';

import { IFormProps } from './types';
import { YQuill } from './YQuill';

export const FormRequestBody = ({ nodePath, propName, o, awareness, IdMapYjs, setSelected }: IFormProps) => {
  return (
    <>
      <h1 className="border-b text-center mb-6 border-gray-2 dark:border-gray-6">Request Body</h1>
      <div className="bp3-form-group pb-4 border-b border-gray-2 dark:border-gray-6">
        <label className="bp3-label">Description</label>
        <div className="w-full" data-controller-for={`${o.get('id')}-description`}>
          <YQuill type={o.get('description')} awareness={awareness} />
        </div>
      </div>
    </>
  );
};
