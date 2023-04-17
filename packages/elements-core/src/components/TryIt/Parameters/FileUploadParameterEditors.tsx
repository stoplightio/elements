import { Flex, Icon, Input, Text } from '@stoplight/mosaic';
import * as React from 'react';

import { useUniqueId } from '../../../hooks/useUniqueId';
import { ParameterSpec } from './parameter-utils';

interface FileUploadParameterEditorProps {
  parameter: ParameterSpec;
  value?: File;
  onChange: (parameterValue: File | undefined) => void;
}

export const FileUploadParameterEditor: React.FC<FileUploadParameterEditorProps> = ({ parameter, value, onChange }) => {
  const parameterDisplayName = `${parameter.name}${parameter.required ? '*' : ''}`;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file === undefined) return;

    onChange(file);
  };

  const clearFile = () => {
    onChange(undefined);
  };

  const parameterInputId = useUniqueId(`id_${parameter.name}_`);
  const fileUploadInputId = `${parameterInputId}-file-input`;

  return (
    <>
      <label aria-hidden="true" data-testid="param-label" htmlFor={parameterInputId}>
        {parameterDisplayName}
      </label>
      <Text mx={3}>:</Text>
      <Flex flex={1} alignItems="center">
        <Input
          id={parameterInputId}
          style={{ paddingLeft: 15 }}
          aria-label={parameter.name}
          appearance="minimal"
          flex={1}
          placeholder="pick a file"
          type="text"
          required
          value={value?.name ?? ''}
          disabled
          enterKeyHint="done"
        />
        {value && (
          <button className="sl-mr-3 sl-p-2" aria-label="Remove file" onClick={clearFile}>
            <Icon icon="times" />
          </button>
        )}
        <div>
          <label role="button" htmlFor={fileUploadInputId}>
            Upload
          </label>
          <input onChange={handleFileChange} type="file" hidden id={fileUploadInputId} />
        </div>
      </Flex>
    </>
  );
};
