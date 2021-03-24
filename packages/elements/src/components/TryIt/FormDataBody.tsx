import { safeStringify } from '@stoplight/json';
import { Panel } from '@stoplight/mosaic';
import { IMediaTypeContent } from '@stoplight/types';
import { omit } from 'lodash';
import * as React from 'react';

import { useInlineRefResolver } from '../../context/InlineRefResolver';
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
  const resolveRef = useInlineRefResolver();
  const schema = specification.schema;
  const resolvedSchema =
    schema?.$ref && resolveRef ? resolveRef({ pointer: schema.$ref, source: null }, null, {}) : schema;
  const parameters = resolvedSchema?.properties;

  React.useEffect(() => {
    if (parameters === undefined) {
      console.warn(`Invalid schema in form data spec: ${safeStringify(resolvedSchema)}`);
    }
  }, [parameters, resolvedSchema]);

  if (parameters === undefined) {
    return null;
  }

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar>Body</Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto OperationParametersContent">
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
                onChange={e => onChangeValues({ ...values, [parameter.name]: e.currentTarget.value })}
              />
            );
          })}
      </Panel.Content>
    </Panel>
  );
};
