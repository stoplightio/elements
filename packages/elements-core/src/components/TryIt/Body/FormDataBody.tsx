import { safeStringify } from '@stoplight/json';
import { Button, Menu, Panel } from '@stoplight/mosaic';
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
  // TODO: What about allOf, anyOf?
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

  const onSchemaChange = (schema: JSONSchema7) => {
    // Erase existing values; the old and new schemas may have nothing in common.
    onChangeValues({});
    setSchema(schema);
  };

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={<OneOfMenu subSchemas={specification?.schema?.oneOf ?? []} onChange={onSchemaChange} />}
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

          // STARTHERE
          // TODO: When you toggle back and forth between oneOf sub-schemas,
          // this remembers all field values, not just the most recently edited
          // sub-schema's.
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

/**
 * @returns If the top level of the schema is `oneOf`, the first of the
 * sub-schemas; otherwise the entire schema.
 */
function initialSchema(content: IMediaTypeContent<false>): JSONSchema7 {
  const wholeSchema = content.schema;
  const oneOf = wholeSchema?.oneOf;
  if (wholeSchema?.properties === undefined && oneOf !== undefined && oneOf.length > 0) {
    const firstOneOfItem: JSONSchema7Definition = oneOf[0];
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

/**
 * When the top level schema is `oneOf`, a drop-down menu that allows the user
 * to select among the sub-schemas; otherwise `null`.
 */
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

  if (!subSchemas || subSchemas.length == 0) {
    return null;
  }

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

/**
 * Produce a relatively human-friendly label for one of the schemas in a `oneOf`
 * combiner.
 * @param schema one schema among several in a `oneOf` combiner
 * @param index ordinal position of `schema` in the `oneOf` combiner
 * @returns the text label for the drop-down menu item representing `schema`
 */
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
