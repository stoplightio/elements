import { safeStringify } from '@stoplight/json';
import { Panel } from '@stoplight/mosaic';
import { IMediaTypeContent } from '@stoplight/types';
import { omit } from 'lodash';
import * as React from 'react';

import { FileUploadParamterEditor } from './FileUploadParameterEditors';
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
      <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
        {Object.entries(parameters)
          .map(([name, schema]) => ({ name, schema, examples: schema?.examples }))
          .map(parameter =>
            parameterSupportsFileUpload(parameter) ? (
              <FileUploadParamterEditor
                key={parameter.name}
                parameter={parameter}
                value={values[parameter.name] as File}
                onChange={newValue =>
                  newValue
                    ? onChangeValues({ ...values, [parameter.name]: newValue })
                    : onChangeValues(omit(values, parameter.name))
                }
              />
            ) : (
              <ParameterEditor
                key={parameter.name}
                parameter={parameter}
                value={values[parameter.name] as string}
                onChange={e => onChangeValues({ ...values, [parameter.name]: e.currentTarget.value })}
              />
            ),
          )}
      </Panel.Content>
    </Panel>
  );
};
