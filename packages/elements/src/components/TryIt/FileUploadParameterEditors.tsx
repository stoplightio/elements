import { Flex, Icon, Input, Text } from '@stoplight/mosaic';
import * as React from 'react';

import { ParameterSpec } from './parameter-utils';

interface FileUploadParamterEditorProps {
  parameter: ParameterSpec;
  value?: File;
  onChange: (parameterValue: File | undefined) => void;
}

export const FileUploadParamterEditor: React.FC<FileUploadParamterEditorProps> = ({ parameter, value, onChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (file === undefined) return;

    onChange(file);
  };

  const clearFile = () => {
    onChange(undefined);
  };

  return (
    <Flex align="center" key={parameter.name}>
      <Input appearance="minimal" readOnly value={parameter.name} />
      <Text mx={3}>:</Text>
      <Flex flexGrow alignItems="center">
        <Input
          style={{ paddingLeft: 15 }}
          aria-label={parameter.name}
          appearance="minimal"
          flexGrow
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
          <label role="button" htmlFor="file-upload">
            Upload
          </label>
          <input onChange={handleFileChange} type="file" hidden id="file-upload" />
        </div>
      </Flex>
    </Flex>
  );
};
