import { Button, Flex, Input, Select, Text } from '@stoplight/mosaic';
import * as React from 'react';

import {
  exampleOptions,
  getPlaceholderForParameter,
  parameterOptions,
  parameterSupportsFileUpload,
  ParameterSpec,
  selectExampleOption,
} from './parameter-utils';

interface ParameterProps {
  parameter: ParameterSpec;
  value: string;
  onChange: (e: React.FormEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export const ParameterEditor: React.FC<ParameterProps> = ({ parameter, value, onChange }) => {
  const parameterValueOptions = parameterOptions(parameter);
  const examples = exampleOptions(parameter);
  const selectedExample = examples?.find(e => e.value === value) ?? selectExampleOption;

  const supportsFileUpload = parameterSupportsFileUpload(parameter);
  const [files, setFiles] = React.useState<File[] | null>(null);

  return (
    <Flex align="center" key={parameter.name}>
      <Input appearance="minimal" readOnly value={parameter.name} />
      <Text mx={3}>:</Text>
      {parameterValueOptions ? (
        <Select
          flexGrow
          aria-label={parameter.name}
          options={parameterValueOptions}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Flex flexGrow>
          <Input
            style={{ paddingLeft: 15 }}
            aria-label={parameter.name}
            appearance="minimal"
            flexGrow
            placeholder={getPlaceholderForParameter(parameter)}
            type={parameter.schema?.type === 'number' ? 'number' : 'text'}
            required
            value={files ? files.map(file => file.name).join(', ') : value ?? ''}
            onChange={onChange}
            disabled={supportsFileUpload}
          />
          {examples && (
            <Select
              aria-label={`${parameter.name}-select`}
              flexGrow
              value={selectedExample.value}
              options={examples}
              onChange={onChange}
            />
          )}
          {supportsFileUpload && (
            <div>
              <label role="button" htmlFor="file-upload">Upload</label>
              <input onChange={e => setFiles(Array.from(e.currentTarget.files ?? []))} type="file" hidden id="file-upload" />
            </div>
          )}
        </Flex>
      )}
    </Flex>
  );
};
