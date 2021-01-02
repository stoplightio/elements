import { safeStringify } from '@stoplight/json';
import { Panel } from '@stoplight/mosaic';
import { Dictionary, IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';

import { Parameter } from './Parameter';

interface FormDataBodyProps {
  specification: IMediaTypeContent;
  values: Dictionary<string, string>;
  onChangeValues: (newValues: Dictionary<string, string>) => void;
}

export const FormDataBody: React.FC<FormDataBodyProps> = ({ specification, values, onChangeValues }) => {
  const schema = specification.schema;
  const parameters = schema?.properties;

  React.useEffect(() => {
    if (parameters === undefined) {
      console.warn(`Invalid schema in form data spec: ${safeStringify(schema)}`);
    }
  }, [parameters, schema]);

  if (parameters === undefined) {
    return null;
  }

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar>Body</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
        {Object.entries(parameters).map(([name, schema]) => (
          <Parameter
            key={name}
            parameter={{ name, schema, examples: schema?.examples }}
            value={values[name]}
            onChange={e => onChangeValues({ ...values, [name]: e.currentTarget.value })}
          />
        ))}
      </Panel.Content>
    </Panel>
  );
};
