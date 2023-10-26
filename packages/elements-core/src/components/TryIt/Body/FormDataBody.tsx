import { safeStringify } from '@stoplight/json';
import { Button, Menu, MenuItems, Panel } from '@stoplight/mosaic';
import { IMediaTypeContent } from '@stoplight/types';
import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
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
  const isOneOf: boolean =
    specification.schema?.properties === undefined &&
    specification.schema?.oneOf !== undefined &&
    specification.schema.oneOf.length > 0;
  const [schema, setSchema] = React.useState(initialSchema(specification));
  const parameters: JSONSchema7['properties'] = schema?.properties;
  const required: string[] = schema?.required ?? [];

  console.log({ schema, parameters, required });

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
      <Panel.Titlebar
        rightComponent={isOneOf && <OneOfMenu subSchemas={specification?.schema?.oneOf ?? []} onChange={setSchema} />}
      >
        Body
      </Panel.Titlebar>
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

function initialSchema(content: IMediaTypeContent<false>): JSONSchema7 {
  let wholeSchema = content.schema;
  let parameters: JSONSchema7['properties'] = wholeSchema?.properties;
  const isOneOf: boolean = parameters === undefined && wholeSchema?.oneOf !== undefined && wholeSchema.oneOf.length > 0;
  if (isOneOf) {
    // TODO: Need to eliminate this (spurious) type-check warning.
    const firstOneOfItem: JSONSchema7Definition = wholeSchema?.oneOf?.[0];
    if (typeof firstOneOfItem !== 'boolean') {
      return firstOneOfItem;
    }
  }

  return wholeSchema ?? {};
}

interface OneOfMenuProps {
  subSchemas: JSONSchema7Definition[];
  onChange: (selectedSubSchema: JSONSchema7) => void;
}

function OneOfMenu({ subSchemas, onChange }: OneOfMenuProps) {
  const onSubSchemaSelect = React.useCallback(onChange, [onChange]);

  const menuItems = React.useMemo(
    () =>
      subSchemas.map((subSchema, index) => {
        const label = menuLabel(subSchema, index);
        return {
          id: `request-subschema-${label}`,
          title: label,
          onPress: () => onSubSchemaSelect(typeof subSchema === 'boolean' ? {} : subSchema),
        };
      }),
    [subSchemas, onSubSchemaSelect],
  );

  return (
    <Menu
      aria-label="Examples"
      items={menuItems}
      renderTrigger={({ isOpen }) => (
        <Button appearance="minimal" size="sm" iconRight={['fas', 'sort']} active={isOpen}>
          Variants
        </Button>
      )}
    />
  );
}

function menuLabel(schema: JSONSchema7Definition, index: number): string {
  if (typeof schema === 'boolean') {
    return `${index.toString()} boolean`;
  }

  // TODO: What if `title` and/or `description` are very long strings?
  return (
    schema?.title ??
    schema?.description ??
    `${index.toString()} - ${Object.getOwnPropertyNames(schema.properties).length} properties`
  );
}
