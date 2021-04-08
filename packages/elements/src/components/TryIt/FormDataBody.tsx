import { safeStringify } from '@stoplight/json';
import { Panel } from '@stoplight/mosaic';
import { IMediaTypeContent } from '@stoplight/types';
import { omit } from 'lodash';
import * as React from 'react';

import { FileUploadParameterEditor } from './FileUploadParameterEditors';
import { parameterSupportsFileUpload } from './parameter-utils';
import { ParameterEditor } from './ParameterEditor';
import { BodyParameterValues } from './request-body-utils';

interface FormDataBodyProps {
  specification: IMediaTypeContent;
  values: BodyParameterValues;
  onChangeValues: (newValues: BodyParameterValues) => void;
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
      <Panel.Content className="sl-overflow-y-auto ParameterGrid OperationParametersContent">
        {Object.entries(parameters)
          .map(([name, schema]) => ({ name, schema, examples: schema?.examples }))
          .map(parameter => {
            const supportsFileUpload = parameterSupportsFileUpload(parameter);
            const value = values[parameter.name];

            if (supportsFileUpload) {
              return (
                <FileUploadParameterEditor
                  key={parameter.name}
                  parameter={parameter}
                  value={value instanceof File ? value : undefined}
                  onChange={newValue =>
                    newValue
                      ? onChangeValues({ ...values, [parameter.name]: newValue })
                      : onChangeValues(omit(values, parameter.name))
                  }
                />
              );
            }

            return (
              <ParameterEditor
                key={parameter.name}
                parameter={parameter}
                value={typeof value === 'string' ? value : undefined}
                onChange={value =>
                  onChangeValues({ ...values, [parameter.name]: typeof value === 'number' ? String(value) : value })
                }
              />
            );
          })}
      </Panel.Content>
    </Panel>
  );
};
