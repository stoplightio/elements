import { safeStringify } from '@stoplight/json';
import { Panel } from '@stoplight/mosaic';
import { IMediaTypeContent } from '@stoplight/types';
import { omit } from 'lodash';
import * as React from 'react';

import { FileUploadParameterEditor } from '../Parameters/FileUploadParameterEditors';
import { mapSchemaPropertiesToParameters, parameterSupportsFileUpload } from '../Parameters/parameter-utils';
import { ParameterEditor } from '../Parameters/ParameterEditor';
import { BodyParameterValues, ParameterOptional } from './request-body-utils';

interface FormDataBodyProps {
  specification: IMediaTypeContent;
  values: BodyParameterValues;
  onChangeValues: (newValues: BodyParameterValues) => void;
  onChangeParameterAllow: (newValue: ParameterOptional) => void;
  isAllowedEmptyValues: ParameterOptional;
}

export const FormDataBody: React.FC<FormDataBodyProps> = ({
  specification,
  values,
  onChangeValues,
  onChangeParameterAllow,
  isAllowedEmptyValues,
}) => {
  const schema = specification.schema;
  const parameters = schema?.properties;
  const required = schema?.required;

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
        {mapSchemaPropertiesToParameters(parameters, required).map(parameter => {
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
                onChangeValues({
                  ...values,
                  [parameter.name]: typeof value === 'number' ? String(value) : (value as any),
                })
              }
              onChangeOptional={value => onChangeParameterAllow({ ...isAllowedEmptyValues, [parameter.name]: value })}
              canChangeOptional={true}
              isOptional={isAllowedEmptyValues[parameter.name] ?? false}
            />
          );
        })}
      </Panel.Content>
    </Panel>
  );
};
