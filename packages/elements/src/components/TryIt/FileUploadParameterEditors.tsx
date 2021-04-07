import { Flex, Icon, Input, Text } from '@stoplight/mosaic';
import { nanoid } from 'nanoid';
import * as React from 'react';

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

  const fileUploadInputId = React.useRef(`file-upload-${nanoid()}`);

  return (
    <>
      <div>{parameterDisplayName}</div>
      <Text mx={3}>:</Text>
      <Flex flex={1} alignItems="center">
        <Input
          style={{ paddingLeft: 15 }}
          aria-label={parameter.name}
          appearance="minimal"
          flex={1}
          placeholder="pick a file"
          type="text"
          required
          value={value?.name ?? ''}
          disabled
        />
        {value && (
          <button className="mr-3 p-2" aria-label="Remove file" onClick={clearFile}>
            <Icon icon="times" />
          </button>
        )}
        <div>
          <label role="button" htmlFor={fileUploadInputId.current}>
            Upload
          </label>
          <input onChange={handleFileChange} type="file" hidden id={fileUploadInputId.current} />
        </div>
      </Flex>
    </>
  );
};
