import { isRegularNode, SchemaNode, SchemaTree } from '@stoplight/json-schema-tree';
import { Choice, useChoices, visibleChildren } from '@stoplight/json-schema-viewer';
import { Button, Menu, Panel } from '@stoplight/mosaic';
import { IMediaTypeContent } from '@stoplight/types';
import { omit } from 'lodash';
import * as React from 'react';

import { FileUploadParameterEditor } from '../Parameters/FileUploadParameterEditors';
import { parameterSupportsFileUpload, toParameterSpec } from '../Parameters/parameter-utils';
import { ParameterEditor } from '../Parameters/ParameterEditor';
import { BodyParameterValues, ParameterOptional } from './request-body-utils';

export interface FormDataBodyProps {
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
  const schema: SchemaNode = React.useMemo(() => {
    const schema = specification.schema ?? {};
    const tree = new SchemaTree(schema, { mergeAllOf: true, refResolver: null });
    tree.populate();
    return tree.root.children[0];
  }, [specification]);

  const { selectedChoice, choices, setSelectedChoice } = useChoices(schema);

  const formFieldRows = visibleChildren(selectedChoice.type);

  const onSchemaChange = (choice: Choice) => {
    // Erase existing values; the old and new schemas may have nothing in common.
    onChangeValues({});
    setSelectedChoice(choice);
  };

  return (
    <Panel defaultIsOpen>
      <Panel.Titlebar
        rightComponent={<OneOfMenu choices={choices} choice={selectedChoice} onChange={onSchemaChange} />}
      >
        Body
      </Panel.Titlebar>
      <Panel.Content className="sl-overflow-y-auto ParameterGrid OperationParametersContent">
        {formFieldRows
          .filter(isRegularNode)
          .map(toParameterSpec)
          .map(parameter => {
            const supportsFileUpload = parameterSupportsFileUpload(parameter);
            const value = values[parameter.name ?? ''];

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

export interface OneOfMenuProps {
  /** all of the available sub-schemas that can be picked */
  choices: Choice[];

  /** the currently selected sub-schema */
  choice: Choice;

  /** called when the selection changes */
  onChange: (choice: Choice) => void;
}

/**
 * When the top level schema is `oneOf`, a drop-down menu that allows the user
 * to select among the sub-schemas; otherwise `null`.
 */
export function OneOfMenu({ choices: subSchemas, choice, onChange }: OneOfMenuProps) {
  const onSubSchemaSelect = React.useCallback(onChange, [onChange]);

  const menuItems = React.useMemo(
    () =>
      subSchemas.map(subSchema => {
        const label = subSchema.title;
        return {
          id: `request-subschema-${label}`,
          title: label,
          onPress: () => onSubSchemaSelect(subSchema),
        };
      }),
    [subSchemas, onSubSchemaSelect],
  );

  if (!subSchemas || subSchemas.length < 2) {
    return null;
  }

  const title = choice?.title ?? 'Variants';

  return (
    <Menu
      aria-label={title}
      items={menuItems}
      renderTrigger={({ isOpen }) => (
        <Button appearance="minimal" size="sm" iconRight={['fas', 'sort']} active={isOpen} data-testid="oneof-menu">
          {title}
        </Button>
      )}
    />
  );
}
