import { SchemaTree } from '@stoplight/json-schema-tree';
import { Choice, useChoices } from '@stoplight/json-schema-viewer';
import { Panel } from '@stoplight/mosaic';
import { IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';

import { FileUploadParameterEditor } from '../Parameters/FileUploadParameterEditors';
import { OneOfMenu } from './FormDataBody';
import { BodyParameterValues } from './request-body-utils';

export interface BinaryBodyProps {
  specification?: IMediaTypeContent;
  values: BodyParameterValues;
  onChangeValues: (newValues: BodyParameterValues) => void;
}

export const BinaryBody: React.FC<BinaryBodyProps> = ({ specification, values, onChangeValues }) => {
  const schema: any = React.useMemo(() => {
    const schema = specification?.schema ?? {};
    const tree = new SchemaTree(schema, { mergeAllOf: true, refResolver: null });
    tree.populate();
    return tree.root.children[0];
  }, [specification]);

  const { selectedChoice, choices, setSelectedChoice } = useChoices(schema);

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
        <FileUploadParameterEditor
          key={'file'}
          parameter={{ name: 'file' }}
          value={values.file instanceof File ? values.file : undefined}
          onChange={newValue => {
            newValue ? onChangeValues({ file: newValue }) : onChangeValues({});
          }}
        />
      </Panel.Content>
    </Panel>
  );
};
