import * as React from 'react';

import { FormOperation } from './Operation';
import { FormParameter } from './Parameter';
import { FormRequest } from './Request';
import { FormRequestBody } from './RequestBody';
import { FormResponse } from './Response';
import { FormSecurity } from './Security';
import { IFormProps } from './types';

export const FormtronII = ({
  nodePath,
  propName,
  o,
  awareness,
  IdMapYjs,
  selected = '',
  setSelected,
  selections,
  setSelections,
}: IFormProps) => {
  let Form: React.FunctionComponent<IFormProps> | undefined;

  if (o) {
    const origSet = o.set.bind(o);
    o.set = (key: string, value: any) => {
      // We need to prevent setting to the same value to prevent infinite loops.
      if (o.get(key) !== value) {
        origSet(key, value);
      }
    };

    if (
      nodePath === 'request.cookie[]' ||
      nodePath === 'request.headers[]' ||
      nodePath === 'request.path[]' ||
      nodePath === 'request.query[]'
    ) {
      Form = FormParameter;
    } else if (nodePath === 'security[][]') {
      Form = FormSecurity;
    } else if (nodePath === 'request') {
      Form = FormRequest;
    } else if (nodePath === 'request.body') {
      Form = FormRequestBody;
    } else if (nodePath === 'responses[]') {
      Form = FormResponse;
    } else if (nodePath === '') {
      Form = FormOperation;
    }
  }
  return Form ? (
    <Form
      nodePath={nodePath}
      propName={propName}
      IdMapYjs={IdMapYjs}
      o={o}
      selected={selected}
      selections={selections}
      setSelected={setSelected}
      setSelections={setSelections}
      awareness={awareness}
    />
  ) : null;
};
