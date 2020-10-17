import { HttpParamStyles } from '@stoplight/types';
import { Button } from '@stoplight/ui-kit';
import * as React from 'react';

import { Yjsify } from '../Y';
import { IFormProps } from './types';

export const FormRequest = ({
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
  const makeOnClick = (prop: string, style: HttpParamStyles) => () => {
    const node = Yjsify({
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
  return (
    <>
      <h1 className="border-b text-center mb-6 border-gray-2 dark:border-gray-6">Request</h1>
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
      </div>
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
      </div>
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
      </div>
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
      </div>
    </>
  );
};
